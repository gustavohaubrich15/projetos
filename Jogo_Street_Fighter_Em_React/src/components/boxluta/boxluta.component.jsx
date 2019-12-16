import React, { PureComponent, Fragment } from 'react';
import './style.css';



export class BoxLuta extends PureComponent {

    constructor(props) {
        super(props)

        this.primeiroTurno = true
        this.state = {
            personagem: props.personagem,
            seuTurno: false,
            corDaImagem: 'grayscale(100%)',
            resetar: false,
            turnoAtaque: props.skills
        }

    }

    componentDidMount() {
        if (this.props.turno) {
            this.setState({ seuTurno: true, corDaImagem: 'grayscale(0%)' })
        }

    }

    componentDidUpdate = (props, state) => {
        if (this.props.turno) {
            this.setState({ seuTurno: true, corDaImagem: 'grayscale(0%)' })
        } else {
            this.setState({ seuTurno: false, corDaImagem: 'grayscale(100%)' })
        }

        if (this.props.resetar) {
            this.setState({ turnoAtaque: this.props.skills })
        }

        if (this.props.reset) {
            this.setState({ turnoAtaque: this.props.skills })
        }

    }


    atacou = (event) => {
        const nomeAtaque = event.currentTarget.value
        this.setState({ seuTurno: false })
        let danoAtaque
        let lista = [...this.state.turnoAtaque]
        for (let i = 0; i < this.state.personagem.skills.length; i++) {

            if (nomeAtaque === this.state.personagem.skills[i].name.toString()) {
                lista[i] = 0
                danoAtaque = this.state.personagem.skills[i].damage
            } else {
                lista[i] += 1
            }
        }
        this.setState({ turnoAtaque: lista })

        this.props.atacar(danoAtaque, this.props.id)
    }

    ataquesDisponiveis = () => {

        if (!this.primeiroTurno) {

        } else {
            this.primeiroTurno = false;
        }

        return this.state.personagem.skills.map((skills, key) => {



            if (this.state.turnoAtaque[key] >= skills.turnsToUse) {
                return <button onClick={this.atacou} key={key} className="ataques" style={{
                    alignItems: `${this.props.ladoPoderes}`,
                    background: `${this.props.gradienteBotao}`
                }} value={`${skills.name.toString()}`}>

                    <div>{skills.name}

                    </div>

                    <div className="danoETurno">
                        {skills.damage} DANO | {skills.turnsToUse} TURNOS

                        </div>

                </button>


            } else {
                return null
            }
        })

    }

    render() {

        return (
            <Fragment>
                <div className="boxLuta" >

                    <div className="barraENome">
                        <div className="barraDeVida">
                            <div className="vidaAtual" style={{ width: `${this.props.vida}%` }}>{this.props.vida > 0 && this.props.vida}</div>
                        </div>
                        <div className="nomeJogador" style={{ flexDirection: `${this.props.lado}` }}>{this.state.personagem.name}</div>
                    </div>
                    <div className="separacaoPersonagemEPoder" style={{ flexDirection: `${this.props.lado}` }}>

                        {this.state.seuTurno && <div className="personagemEPoderes" style={{ flexDirection: `${this.props.lado}` }}>
                            <div className="poderes" style={{ alignItems: `${this.props.ladoPoderes}` }}>
                                <div className="texto" >Poderes</div>

                                {this.ataquesDisponiveis()}
                            </div>
                        </div>}

                        <img src={this.state.personagem.largeImg} alt="" style={{
                            transform: `${this.props.ladoPersonagem}`,
                            filter: `${this.state.corDaImagem}`
                        }}></img>

                    </div>

                </div>

            </Fragment>

        )


    }


}