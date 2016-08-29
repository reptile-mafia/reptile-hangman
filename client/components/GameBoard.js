import React from 'react';
import ServerAPI from '../models/ServerAPI'
import Alphabets from './Alphabets.js';
import Gallows from './Gallows.js';
import Outcome from './Outcome.js'
import GuessedLetters from './GuessedLetters.js';
import RemainingGuess from './RemainingGuess.js';
import Word from './Word.js';
import ServerAPI from '../models/ServerAPI';

export default class GameBoard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			word: [],
			guessedLetters: [],
			remainingGuess: 0
		};
		
		this.api = new ServerAPI(4000);
		this.api.connect();
		this.api.onStartGame(function (res) {
			console.log(res)
		});

	}

	render() {
		var guessedLettersUpper = this.state.guessedLetters.map((letter)=>{return letter.toUpperCase()});
		return(
			<div>
				<Gallows remainingGuess={this.state.remainingGuess} />
				<RemainingGuess remainingGuess={this.state.remainingGuess} />
				<Outcome />
				<Word word={this.state.word} />
				<GuessedLetters guessedLetters={guessedLettersUpper} />
				<Alphabets guessedLetters={guessedLettersUpper} mode = {this.model}/>
			</div>
		)
	}

}
