import React, { Fragment, Component } from 'react';
import Home from './screen/home.screen'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component{
  
  

  render(){
    return(
      <Fragment>
      <ToastContainer/>
      <Home/>
      </Fragment>
    )
  }
}

export default App;
