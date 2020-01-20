import React, { Fragment,Component } from 'react'
import './style.css'


export  class Card extends Component{

    render(){
        return(
            <Fragment>
                <div className='card'>
                    <div className='card-item'>
                        <div className='perfil'>
                            <img className='foto' alt='foto' src={this.props.avatar_url}>
                                
                            </img>
                            <div className='nome'>
                                <strong>{this.props.name}</strong>
                                <div className='tecnologias'>
                                {this.props.techs}
                                </div>
                            </div>
                        </div>
                        <div className='informacoes-adicionais'>
                            <p>
                            {this.props.bio}
                            </p>
                            <a href={`https://github.com/${this.props.github_username}`}>Acessar link do github</a>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}
