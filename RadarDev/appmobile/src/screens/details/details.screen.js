import React,{Component} from 'react'
import {View} from 'react-native'
import { WebView } from 'react-native-webview';



export class  DetailsScreen extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <WebView style={{flex:1}} source={{uri:`https://github.com/${this.props.navigation.state.params.github_username}`}}/>
        )
    }

}

