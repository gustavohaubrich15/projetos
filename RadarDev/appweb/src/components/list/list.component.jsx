import React, { Fragment,PureComponent } from 'react'
import './style.css'
import {Card} from '../card/card.component'



export  class List extends PureComponent{

    constructor(props){
        super(props)
        this.state={
            carregar:false
        }
    }

    componentDidMount=()=>{
        this.setState({carregar:true})
    }
   

    mostrarDevs=()=>{

        return this.props.listaDevs.map((dev, key) => {

            return <Card avatar_url={dev.avatar_url} key={key} name={dev.name}
            techs={dev.techs} bio={dev.bio} github_username={dev.github_username}
            />
        })

    }


    render(){
        return(
            <Fragment>
            {this.state.carregar &&<div className='list'>
            {this.mostrarDevs()}
            </div>}
            </Fragment>
        )
    }
}
