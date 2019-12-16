import React, { PureComponent, Fragment } from 'react';
import './style.css';
import { BoxLuta } from '../../components/boxluta/boxluta.component';
import listaPersonagens from '../../listaPersonagens'
import { Redirect } from 'react-router-dom'



export class CampoBatalha extends PureComponent {

    constructor() {
        super()
        this.personagem1 = {}
        this.personagem2 = {}
        this.state = {
            realizouBuscaDePersonagens: false,
            turnoPersonagem1: true,
            turnoPersonagem2: false,
            vidaPersonagem1: 100,
            vidaPersonagem2: 100,
            irParaMenuInicial: false,
            menuFinal: false,
            vencedor: '',
            tempo: 30,
            danoCritico: false,
            falha: false,
            resetarTurno: false,
            skillsPersonagem1: [],
            skillsPersonagem2: []

        }
    }

    componentDidUpdate = async (props, state) => {
        if (this.state.vidaPersonagem1 <= 0) {
            this.setState({ vidaPersonagem1: 0, menuFinal: true, vencedor: this.personagem2.name })

        } else if (this.state.vidaPersonagem2 <= 0) {
            this.setState({ vidaPersonagem2: 0, menuFinal: true, vencedor: this.personagem1.name })

        }

        if (this.state.tempo < 1) {
            if (this.state.turnoPersonagem1) {
                this.setState({ turnoPersonagem1: false, turnoPersonagem2: true, tempo: 30 })
            } else if (this.state.turnoPersonagem2) {
                this.setState({ turnoPersonagem1: true, turnoPersonagem2: false, tempo: 30 })
            }
        }

        if (state.turnoPersonagem1 !== this.state.turnoPersonagem2 && state.turnoPersonagem2 !== this.state.turnoPersonagem1) {
            await setInterval(this.setState({ danoCritico: false, falha: false }), 10000)
        }


    }


    cronometro = () => {
        if (this.state.vidaPersonagem1 > 0 && this.state.vidaPersonagem2 > 0) {
            const tempoAtual = this.state.tempo - 1
            this.setState({ tempo: tempoAtual })
        }
    }

    componentDidMount = async () => {

        this.iniciarJogo()
        await setInterval(this.cronometro, 1000)
    }

    iniciarJogo = () => {
        const { nome1 } = this.props.match.params
        const { nome2 } = this.props.match.params

        for (let i = 0; i < listaPersonagens.length; i++) {
            let nome = nome1.toString().toLowerCase()
            if (nome === listaPersonagens[i].name.toString().toLowerCase()) {

                this.personagem1 = listaPersonagens[i]
            }
        }

        for (let i = 0; i < listaPersonagens.length; i++) {
            let nome = nome2.toString().toLowerCase()
            if (nome === listaPersonagens[i].name.toString().toLowerCase()) {

                this.personagem2 = listaPersonagens[i]
            }
        }

        const turnoPersonagem = Math.floor(Math.random() * 2)

        if (turnoPersonagem !== 0) {
            this.setState({ turnoPersonagem1: false, turnoPersonagem2: true })
        } else {
            this.setState({ turnoPersonagem1: true, turnoPersonagem2: false })

        }
        let skillsPersonagem1 = []
        let skillsPersonagem2 = []
        for (let i = 0; i < this.personagem1.skills.length; i++) {

            skillsPersonagem1[i] = this.personagem1.skills[i].turnsToUse

        }
        this.setState({ skillsPersonagem1: skillsPersonagem1 })

        for (let i = 0; i < this.personagem2.skills.length; i++) {

            skillsPersonagem2[i] = this.personagem2.skills[i].turnsToUse

        }
        this.setState({ skillsPersonagem2: skillsPersonagem1 })


        this.setState({ realizouBuscaDePersonagens: true })
    }



    atacou = (danoAtaque, idPersonagem) => {
        let dano = danoAtaque

        let danoFalha = Math.random() * 100

        if (danoFalha <= 3) {
            dano = 0
            this.setState({ falha: true })

        } else {
            let danoCritico = Math.random() * 100

            if (danoCritico <= 20) {
                dano = dano * 2

                this.setState({ danoCritico: true })

            }
        }

        if (idPersonagem === 1) {

            this.setState({
                vidaPersonagem2: this.state.vidaPersonagem2 - dano,
                turnoPersonagem1: false, turnoPersonagem2: true
            })


        } else {

            this.setState({
                vidaPersonagem1: this.state.vidaPersonagem1 - dano,
                turnoPersonagem1: true, turnoPersonagem2: false
            })

        }

        this.setState({ tempo: 30 })
    }


    menuInicial = () => {
        this.setState({ irParaMenuInicial: true })
    }
    jogarNovamente = async () => {


        this.setState({
            realizouBuscaDePersonagens: true, turnoPersonagem1: true, turnoPersonagem2: false,
            vidaPersonagem1: 100, vidaPersonagem2: 100, irParaMenuInicial: false, menuFinal: false,
            vencedor: '', resetarTurno: true
        })

        await setInterval(this.resetar, 100)
    }

    resetar = () => {
        this.setState({ resetarTurno: false })
    }


    render() {

        if (this.state.irParaMenuInicial) {
            this.setState({ irParaMenuInicial: false, menuFinal: false })
            return <Redirect to="/" />
        }


        if (!this.state.realizouBuscaDePersonagens) {
            return null
        }

        return (
            <Fragment>
                <link href="https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap%27" rel="stylesheet" />
                <div className="telaBatalhar">

                    <BoxLuta id={1} reset={this.state.resetarTurno} vida={this.state.vidaPersonagem1} atacar={this.atacou} turno={this.state.turnoPersonagem1}
                        personagem={this.personagem1} skills={this.state.skillsPersonagem2} ladoPersonagem='rotateY(180deg)' />

                    <BoxLuta id={2} reset={this.state.resetarTurno} vida={this.state.vidaPersonagem2} atacar={this.atacou} turno={this.state.turnoPersonagem2}
                        personagem={this.personagem2} skills={this.state.skillsPersonagem2} lado='row-reverse' ladoPoderes="flex-end"
                        gradienteBotao='linear-gradient(270deg, rgba(21, 130, 165, 0.8) 73.89%, rgba(20, 103, 129, 0) 100%)' />


                    {this.state.menuFinal && <div className="telaVencedor">

                        <div className="vencedor">{this.state.vencedor} wins!</div>

                        <div className="botoes">
                            <button className="estiloBotoes" onClick={this.jogarNovamente}>Jogar Novamente</button>
                            <button className="estiloBotoes" onClick={this.menuInicial}>Trocar Personagens</button>
                        </div>

                    </div>}

                    <div className="cronometro">Turno : {this.state.tempo} </div>
                    <div className="versusBatalha">VS</div>
                    {this.state.danoCritico && <div className="danoCritico">Dano critico!!</div>}
                    {this.state.falha && <div className="danoCritico">Ataque Falhou!!</div>}
                </div>
            </Fragment>
        )

    }

}