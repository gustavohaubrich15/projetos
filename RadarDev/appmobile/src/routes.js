import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {HomeScreen,DetailsScreen} from './screens/index'

const Routes = createAppContainer(
    createStackNavigator(
        {
            HomeScreen:{ screen:HomeScreen,
            navigationOptions:{
                title:'RadarDev'
            }

        },
            DetailsScreen:{screen:DetailsScreen,
                navigationOptions:{
                    title:'Perfil'
                }

            }
        },{
            defaultNavigationOptions:
            {   headerTintColor:'white'
                ,headerStyle:{
                    backgroundColor:'#7D40E7'

                }
            }
        }
    )
);

export default Routes;