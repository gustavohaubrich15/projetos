import React, { Fragment,Component } from 'react'
import './style.css'
import {Form, List} from '../components/index'
import api from '../service/services'

export default class Home extends Component{

    constructor(props){
        super(props)
        this.state={
            listaDevs:['']
        }
    }


    componentDidMount=async()=>{
        this.atualizarListaDevs()
    }

    atualizar=()=>{
        this.atualizarListaDevs()
    }

    atualizarListaDevs=async()=>{
        const response = await api.get('/devs');
        this.setState({listaDevs:response.data})
    }

    render(){
        return(
            <Fragment>
            <div className='background-home'>
            <Form atualizar={this.atualizar}/>
            <List listaDevs={this.state.listaDevs}/>
            </div>
            </Fragment>
        )
    }
}
