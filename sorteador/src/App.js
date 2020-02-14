import React, { Component, Fragment } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import {HomeScreen} from './screens/home.screen'
import {EscalacaoScreen} from './screens/escalacao/escalacao.screen'

 class App extends Component{

  render(){
    return(
      <Fragment>
        <Switch>

          <Route path='/' component={HomeScreen} exact/>
          <Route path='/escalacao' component={EscalacaoScreen}/>

        </Switch>
      </Fragment>
    )


  }
}

export default App