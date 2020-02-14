import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import {CardJogador} from '../../component/index'
import { ReactSVG } from 'react-svg'
import Colete from '../../img/colete.svg'
import Camisa from '../../img/camisa.svg'
import './style.css'

 export class EscalacaoScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            times:[''],
            mostrarTimes:false
        }
    }

    componentDidMount=()=>{
        let json= localStorage.getItem('times')
        let times=JSON.parse(json)
        times.timeA.shift()
        times.timeB.shift()
        this.setState({times,mostrarTimes:true})
       
    }

    mostrarTimeA=()=>{
        return this.state.times.timeA.map((jogador, key) => {

            return <CardJogador key={key} nome={jogador.nome} nivel={jogador.nivel} goleiro={jogador.goleiro}/>
        })
    }

    mostrarTimeB=()=>{
        return this.state.times.timeB.map((jogador, key) => {

            return <CardJogador key={key} nome={jogador.nome} nivel={jogador.nivel} goleiro={jogador.goleiro}/>
        })
    }



  render(){
    return(
      <Fragment>
        <div className='escalacao'>
            <div className='logo'>
            <div className='nomeTime'>    
                <ReactSVG src={Colete} className='colete'/> 
                <div className='descricao'>Time com Colete</div>
            </div> 
                <div className='time'>{this.state.mostrarTimes && this.mostrarTimeA()}</div>
            </div>
            <div className='versus'>X</div>

            <div className='logo'>
                <div className='nomeTime'>    
                    <ReactSVG src={Camisa} className='camisa'/> 
                    <div className='descricao'>Time sem Colete</div>
                </div> 
                <div className='time'>{this.state.mostrarTimes && this.mostrarTimeB()}</div>
            </div>

           
                
            <div className='voltar'>
                <Link to ='/'>
                <button className='bot'>Voltar</button>
                </Link>
            </div>
           
        </div>
      </Fragment>
    )
  }
}
