import React, { Component, Fragment } from 'react';
import { CaixaSelecaoPersonagens } from '../../components';
import './style.css';
import { Redirect } from 'react-router-dom';


export class SelecaoJogador extends Component {

    constructor() {

        super()
        this.state = {
            nomePersonagem1: null,
            nomePersonagem2: null,

        }
    }

    adicionaPersonagem1 = (nome) => {
        this.setState({ nomePersonagem1: nome })
    }

    adicionaPersonagem2 = (nome) => {
        this.setState({ nomePersonagem2: nome })
    }

    jogar = () => {
        this.setState({ ativouJogar: true })

    }

    render() {

        if (this.state.ativouJogar) {
            const endereco = '/campoBatalha/' + this.state.nomePersonagem1 + '/' + this.state.nomePersonagem2
            return (

                <Redirect to={endereco} />

            )
        }

        return (
           
            <Fragment>
                <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap%27" rel="stylesheet" />
                <div className="textoFixos">
                    <div className="separacaoSelecao">

                        <CaixaSelecaoPersonagens nomePersonagem={this.adicionaPersonagem1} ladoPersonagem="rotateY(180deg)"
                            corDeFundo='linear-gradient(180deg, #A52626 0%, #000000 100%)'></CaixaSelecaoPersonagens>

                        <CaixaSelecaoPersonagens nomePersonagem={this.adicionaPersonagem2}
                            ladoPersonagem="rotateY(0deg)" corDeFundo='linear-gradient(180deg, #13499B 0%, #000000 100%)'></CaixaSelecaoPersonagens>

                    </div>

                    <button className="botaoJogar" onClick={this.jogar} disabled={!this.state.nomePersonagem1 ||
                        !this.state.nomePersonagem2}>Jogar</button>
                    <div className="versus">VS</div>
                    <div className="barraPreta"></div>

                </div>
            </Fragment>
        )

    }

}