import React, { Component, Fragment } from 'react';
import './style.css'
import Estrela from '../../img/estrela1.svg'
import Luva from  '../../img/luva.svg'
import Perna from '../../img/perna.svg'
import { ReactSVG } from 'react-svg'

 export class CardJogador extends Component{


  render(){
    return(
      <Fragment>
          <div className='card'>
            <div className='foto'>{this.props.goleiro===true? <ReactSVG src={Luva}/>:<ReactSVG src={Perna} className='jogadorLinha'/>}</div>
            <div className='info'>
            <div className='nome'>{this.props.nome}</div>
            <div className='nivel'>
                {this.props.nivel>0 &&<ReactSVG src={Estrela} className='estrelasnivel'/>}
                {this.props.nivel>1 &&<ReactSVG src={Estrela} className='estrelasnivel'/>}
                {this.props.nivel>2 &&<ReactSVG src={Estrela} className='estrelasnivel'/>}
                {this.props.nivel>3 &&<ReactSVG src={Estrela} className='estrelasnivel'/>}
                {this.props.nivel>4 &&<ReactSVG src={Estrela} className='estrelasnivel'/>}
            </div>
            </div>
          </div>
        
      </Fragment>
    )
  }
}
