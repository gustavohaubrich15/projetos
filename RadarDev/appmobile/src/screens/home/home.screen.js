import React, { Component, Fragment } from 'react'
import {StyleSheet,Image,View,Text,TouchableOpacity} from 'react-native'
import MapView, { Marker,Callout } from 'react-native-maps'
import {getCurrentPositionAsync,requestPermissionsAsync} from 'expo-location'
import {MaterialIcons} from '@expo/vector-icons'
import {api} from '../../services/api'



export class  HomeScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            latitude:0,
            longitude:0,
            latitudeDelta:0,
            longitudeDelta:0,
            mostrarMapa:false,
            listaDevs:[''],
            techs:''
        }
    }

    componentDidMount=async()=>{
        this.centralizarMapa()
    }

    centralizarMapa=async()=>{
        
        const {granted} = await requestPermissionsAsync();

        if(granted){
            const {coords} = await getCurrentPositionAsync({
                enableHighAccuracy:true
            });
            
            const {latitude,longitude}=coords
            this.setState({ latitude:latitude,longitude:longitude,latitudeDelta:0.02,longitudeDelta:0.02 },
                ()=>{
                    this.mostrarDevs()
                });
        }
    }

    mostrarDevs= async()=>{
        const response= await api.get('/devs')
        const lista = response.data
        this.setState({listaDevs:lista,mostrarMapa:true})
    }

    handleRegion=(region)=>{
        
        
        this.setState({ latitude:region.latitude,longitude:region.longitude,latitudeDelta:region.latitudeDelta,longitudeDelta:region.longitudeDelta },
            ()=>{
                this.mostrarDevs()
            });
    }

    
    render(){
        const {navigate} = this.props.navigation;
        return(
            <Fragment>
            {this.state.mostrarMapa &&<MapView onRegionChangeComplete={this.handleRegion} 
                initialRegion={{latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.longitudeDelta,}} style={styles.map}>
                   
                    
                    { this.state.listaDevs.map(dev =>(<Marker key={dev._id} coordinate={
                        
                        {latitude:dev.location.coordinates[1]
                        , longitude:dev.location.coordinates[0]}}>
                        <Image style={styles.avatar} source={{
                            uri:dev.avatar_url
                        }}></Image>

                        <Callout onPress={()=>{
                            navigate('DetailsScreen', {github_username: dev.github_username})
                        }}>
                            <View style={styles.callout}>
                            <Text style={styles.name}>{dev.name}</Text>
                    <Text style={styles.bio}>{dev.bio}</Text>
                    <Text style={styles.techs}>{dev.techs.join(', ')}</Text>

                            </View>
                        </Callout>
                    </Marker>))}
                </MapView>}
                <View style={styles.search}>
                    <TouchableOpacity onPress={()=>{this.centralizarMapa}} style={styles.button}>
                        <MaterialIcons name='my-location' size={20} color='white' />
                        </TouchableOpacity>
                </View>
                </Fragment>
        )
    }
}


const styles= StyleSheet.create({
    map:{
        flex:1
    },
    avatar:{
        width:55,
        height:50,
        borderRadius:4,
        borderWidth:4,
        borderColor:'#FFF'
    },
    callout:{
        width:260

    },
    name:{
        fontWeight:'bold',
        fontSize:15
    },
    bio:{
        color:'#666',
        marginTop:5

    },
    techs:{
        marginTop:5
    },
    search:{
        position:'absolute',
        bottom:20,
        left:50,
        right:20,
        zIndex:5,
        flexDirection:'row',
        justifyContent:'flex-end'

    },
    searchInput:{
        flex:1,
        height:50,
        backgroundColor:'white',
        color:'#333',
        borderRadius:25,
        paddingHorizontal:20,
        fontSize:16
    },
    button:{
        height:50,
        width:50,
        backgroundColor:'#8E4DFF',
        borderRadius:25,
        justifyContent:"center",
        alignItems:'center',
        marginLeft:15
    }
})

