import React, { Component, Fragment } from 'react';
import './style.css';
import listaPersonagens from '../../listaPersonagens'
import { Personagem } from '../personagem/personagem.component';


export class CaixaSelecaoPersonagens extends Component {

    constructor() {

        super()

        this.state = {
            nomePersonagem: '',
            imagemPersonagem: '',
            textoAtivo: true,
            imagemPersonagemAtivo: false,
            personagemColorido: ''
        }
    }


    personagemSelecionado = (personagem, imagem) => {
        this.setState({
            nomePersonagem: personagem, imagemPersonagem: imagem, textoAtivo: false, imagemPersonagemAtivo: true
        })
        this.props.nomePersonagem(personagem)
  
    }

    apresentarPersonagens = () => {

        return listaPersonagens.map((personagens, key) => {

            return <Personagem personagemEscolhido={this.personagemSelecionado} key={key} nome={personagens.name.toUpperCase()}
                imagem={personagens.smallImg} imagemGrande={personagens.largeImg} personagemAtual={this.state.nomePersonagem}
            />
        })

    }

    render() {

        return (
            <Fragment>

                <div className="selecaoPersonagens" style={{ background: `${this.props.corDeFundo}` }}>

                    {this.state.textoAtivo && <div className="textoSelecionar">SELECIONE UM PERSONAGEM</div>}

                    {this.state.imagemPersonagemAtivo && <img src={this.state.imagemPersonagem} alt=""
                        style={{ transform: `${this.props.ladoPersonagem}` }} ></img>}

                    {this.state.imagemPersonagemAtivo && <div className="nomeDoPersonagem">{this.state.nomePersonagem}</div>}

                    <div className="caixaPersonagens">
                        {this.apresentarPersonagens()}

                    </div>
                </div>

            </Fragment>
        )

    }
}
