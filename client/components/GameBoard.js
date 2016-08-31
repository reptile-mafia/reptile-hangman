import React from 'react';
import ServerAPI from '../models/ServerAPI'
import Alphabets from './Alphabets.js';
import Gallows from './Gallows.js';
import Outcome from './Outcome.js'
import GuessedLetters from './GuessedLetters.js';
import RemainingGuess from './RemainingGuess.js';
import Word from './Word.js';

export default class GameBoard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			word: [],
			guessedLetters: [],
			remainingGuesses: 6,
			gameState: false
		};
	}

	renderOutcome(){
		if(this.state.gameState !== 'play'){
			return (<Outcome gameState={this.state.gameState}/>)
		}
	}

	render() {
		var guessedLettersUpper = this.state.guessedLetters.map((letter)=>{return letter.toUpperCase()});
		return(
			<div>
				{
					this.renderOutcome()			
				}	
				//<Gallows remainingGuesses={this.state.remainingGuesses} />
				<RemainingGuess remainingGuesses={this.state.remainingGuesses} />
				<Word word={this.state.word} />
				<GuessedLetters guessedLetters={guessedLettersUpper} />
				<Alphabets guessedLetters={guessedLettersUpper} models = {this.models}/>	
			</div>
		)
	}

}
