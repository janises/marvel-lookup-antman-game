import React, {Component} from 'react';
import axios from 'axios';
import md5 from 'md5';
import getCharacterInfo from "../../services/Marvel/getCharacterInfo";
import './CharacterInfo.css';
import HulkSad from "../../images/Hulk-sad.jpg"

export default class CharacterInfo extends Component {
    constructor() {
        super();
        this.state= {
            charactersURL: 'https://gateway.marvel.com/v1/public/characters?name=',

            errorMessage: ""
        };
        this.getCharacter = this.getCharacter.bind(this);
    }

   handleInput(e) {
        this.setState({
            character: e.target.value
        })
    }

    getCharacter(e, character){
        let ts = Date.now();
        let hash = md5(ts+this.state.privateKey+this.state.publicKey);
        e.preventDefault();

        axios.get(`${this.state.charactersURL}${character}&apikey=${this.state.publicKey}&hash=${hash}&ts=${ts}`)
            .then(response => {
                console.log(response.data)
                this.setState({
                    characterName: response.data.data.results[0].name,
                    characterPic: response.data.data.results[0].thumbnail.path + "/standard_xlarge." + response.data.data.results[0].thumbnail.extension,
                    characterDescription: response.data.data.results[0].description,
                    characterWiki: response.data.data.results[0].urls[1].url,
                    characterPortrait: response.data.data.results[0].thumbnail.path + "/portrait_uncanny." + response.data.data.results[0].thumbnail.extension,
                    errorMessage: "",
                    character: ""
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    errorMessage: error,
                    character: ""
                })
            })
              
    }


    render() {
        return (
            <div className="marvel">
                <h1> Look up a character </h1>
                <div className="search">
                    <input ref="input" value={this.state.character} placeholder="Hero or Villain?" onChange={(e)=> this.handleInput(e)}/>
                <button onClick={(e)=> this.getCharacter(e, this.state.character)}> Search </button>
                </div>
                
                {this.state.errorMessage ? (
                    <div className="error-message">
                        <h3>Sorry, we couldn't find them.</h3>
                        <img className="hulk-sad" src={HulkSad} alt="Sad Hulk"/>
                
                    </div> ) 
                    
                    : (this.state.characterName ? ( 
                        
                        <div className="card-flip-container">
                        <div className="character-card">
                            <div className='card-back'>
                                <h2>{this.state.characterName}</h2>
                                <img src={this.state.characterPic} alt="character picture"/>
                                
                                {!this.state.characterDescription ? (
                                    <p>We're too busy fangirling to describe them accurately, so check out their <a href= {this.state.characterWiki}>Wiki page</a>!</p>
                                ) : 
                                    <p>{this.state.characterDescription}</p>
                                }
                    
                            </div> 
                            <div className='card-front'>
                                <img src={this.state.characterPortrait} alt="character portrait"/>
                            </div>
                            
                        </div> 

                    </div> //card-flip-container end) 
                    )

                    :  null
                )} 

            </div>
        )
    }
}