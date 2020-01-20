import React, { Fragment,PureComponent } from 'react'
import './style.css'
import api from '../../service/services'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export  class Form extends PureComponent{

    constructor(props){
        super(props)
        this.state={
            latitude:0,
            longitude:0,
            github_username:'',
            techs:''
        }
    }



    componentDidMount=()=>{
        this.atualizarPosicao()
    }

    componentDidUpdate=()=>{
        this.atualizarPosicao()
    }

    atualizarPosicao=()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            const {latitude,longitude} =position.coords
            this.setState({latitude:latitude,longitude:longitude})
            })
    }

    handleChange=(event) =>{
        this.setState({ [event.target.name]:event.target.value})
    }

    handleSubmit=async(event)=>{
        event.preventDefault()
        const {github_username,techs,latitude,longitude}=this.state
        try{
        await api.post('/devs',{
            github_username,
            techs,
            latitude,
            longitude
        })
        this.setState({github_username:'',techs:''})
        toast.success('Usuário salvo com sucesso!!!')
        this.props.atualizar()
    }catch{
        toast.error('Erro ao cadastrar usuário')
       
    }
    
        
    }

    render(){
        return(
            <Fragment>
            
            <div className='formDev'>
                <aside>
                    <strong>Cadastrar</strong>
                    <form onSubmit={this.handleSubmit}>
                    <div className="label-block">    
                    <label htmlFor='github_username'>Usuário do Github </label>
                    <input name='github_username' id='github_username' value={this.state.github_username} onChange={this.handleChange} required></input>
                    </div>    

                    <div className='label-block'>
                    <label htmlFor='techs'>Tecnologias </label>
                    <input name='techs' id='techs' value={this.state.techs} onChange={this.handleChange} required></input>
                    </div>

                    <div className="input-group">
                        <div className='label-block'>
                            <label htmlFor='latiude'>Latitude </label>
                            <input name='latitude' id='latitude' value={this.state.latitude} onChange={this.handleChange} required></input>
                        </div>

                        <div className='label-block'>
                            <label htmlFor='longitude'>Longitude </label>
        <input name='longitude' id='longitude' value={this.state.longitude} required onChange={this.handleChange}></input>
                        </div>
                    </div>

                    <button type='submit'>Salvar</button>
                
                    </form>

                </aside>
            </div>    
            </Fragment>
        )
    }
}
