import React, { Fragment, PureComponent } from 'react';
import './style.css';



export class Personagem extends PureComponent {

    constructor() {
        super()
        this.state = {
            id: ''
        }
    }

    personagem = () => {

        this.props.personagemEscolhido(this.props.nome, this.props.imagemGrande)
        if (this.props.personagemAtual !== this.props.nome) {
            this.setState({ id: 'personagemColorido' })
        }
    }

    render() {

        return (
            <Fragment>
                <link href="https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap" rel="stylesheet" />

                <label className="personagem" style={{ backgroundImage: `url(${this.props.imagem})` }}
                    id={this.state.id}>

                    <input name="radio" type="radio" onChange={this.personagem} ></input>

                    <div className="nomePersonagem">{this.props.nome}</div>

                </label>

            </Fragment>
        )

    }
}
