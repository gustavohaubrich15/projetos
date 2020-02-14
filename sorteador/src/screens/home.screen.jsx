import React, { Component, Fragment } from 'react'
import SeparacaoTimes from '../logic/separacaotime/separacaotime'
import './style.css'
import Estrela from '../img/estrela1.svg'
import { ReactSVG } from 'react-svg'
import {CardJogador} from '../component/index'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Redirect } from 'react-router-dom'


 export class HomeScreen extends Component{

    constructor(props){

        super(props)

        this.state={
            nome:'',
            goleiro:false,
            estrela:[
            'desabilitado',
            'desabilitado',
            'desabilitado',
            'desabilitado',
            'desabilitado'
            ],
            jogadores:[],
            timeA:[],
            timeB:[],
            sorteado:false
        }
    }

    componentDidMount=()=>{
      this.setState({sorteado:false})
    }


    handleChange=(event) =>{
      this.setState({ [event.target.name]:event.target.value})
  }
    toggleChange = () => {
    this.setState({
      goleiro: !this.state.goleiro,
    })
  }


    mudarEstrela =(numero)=>{
        let mudanca
        this.state.estrela[numero-1]==='ativo'?mudanca='desabilitado':mudanca='ativo'
        if(this.state.estrela.indexOf('ativo',numero)<0){
          let copy =[...this.state.estrela]
          copy.forEach((elem,index)=>{
              if(index<numero){
                  copy.splice(index,1,mudanca)
              }
          })
          this.setState({estrela:copy})
        }
    }

    adicionar=()=>{
      if(this.state.jogadores.length<14){
      let nivel=this.state.estrela.filter((elem)=>{
        return elem==='ativo'
      }).length
      const {jogadores}= this.state
      jogadores.push({nome:this.state.nome,nivel:nivel,goleiro:this.state.goleiro})
      this.setState({jogadores:jogadores})
      toast.success(`${this.state.nome} foi adicionado`,{className:'notifi'})
    }else{
      toast.error('Já foram adicionados 14 jogadores!!',{className:'notifi'})
    }
    }
    
    mostrarJogadores=()=>{
      return this.state.jogadores.map((jogador, key) => {

        return <CardJogador key={key} nome={jogador.nome} nivel={jogador.nivel} goleiro={jogador.goleiro}/>
    })
    }

    sortearTimes=()=>{
      let times=SeparacaoTimes(this.state.jogadores)
      let json= JSON.stringify(times)
      localStorage.setItem('times',json)
      this.setState({sorteado:true})
    }

  render(){

    if(this.state.sorteado){
      const endereco = '/escalacao'
      return <Redirect to={endereco}/>
    }

    return(
      <Fragment>
        <div className='home'>
          <ToastContainer autoClose={2000} position={toast.POSITION.TOP_CENTER}/>
            <div className='titulo'>Adicione Um Jogador</div>
            <div className='jogador'>
              <input className='novoNome' placeholder='  Digite um nome....' type='text' name='nome' onChange={this.handleChange}></input>
              <div className='goleiro'>
                  <input className='goleiroCheck' type='checkbox' name='nome' defaultChecked={this.state.goleiro}  onChange={this.toggleChange}></input>
                  <div>É Goleiro?</div>
              </div>
            </div>
            <div className='titulo'>Seu nível</div>
            <div className='estrelas'>
                <ReactSVG src={Estrela} className={this.state.estrela[0]} onClick={this.mudarEstrela.bind(this,1)} />
                <ReactSVG src={Estrela} className={this.state.estrela[1]} onClick={this.mudarEstrela.bind(this,2)}/>
                <ReactSVG src={Estrela} className={this.state.estrela[2]} onClick={this.mudarEstrela.bind(this,3)}/>
                <ReactSVG src={Estrela} className={this.state.estrela[3]} onClick={this.mudarEstrela.bind(this,4)}/>
                <ReactSVG src={Estrela} className={this.state.estrela[4]} onClick={this.mudarEstrela.bind(this,5)}/>
            </div>
            
            <div className='botao'>
                <button className='adicionar' onClick={this.adicionar}>Adicionar</button>
            </div>

            <div className='listaJogadores'>
              {this.mostrarJogadores()}
            </div>

            <div className='botao'>
                <button className='adicionar' onClick={this.sortearTimes}>Sortear</button>
            </div>
        </div>
      </Fragment>
    )
  }
}
