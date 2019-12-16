import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { SelecaoJogador, CampoBatalha } from './screens';

export class App extends Component {


  render() {

    return (
      <Fragment>
        <Switch>
         
          <Route path='/' component={SelecaoJogador} exact />
          <Route path='/campoBatalha/:nome1/:nome2' component={CampoBatalha} />
       
        </Switch>
      </Fragment>
    )

  }

}

export default App;
