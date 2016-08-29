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
			remainingGuess: 6
		};

		this.models = new ServerAPI(4000);
		this.models.connect();
		this.models.onStartGame( (res) => {
			console.log("Start game", res);
			this.setState({
				word: res.word
			})
			this.models.makeGuess('o');
		});

		this.models.onIncorrectGuess((res)=>{
			console.log("Start game", res);
			this.setState({
				remainingGuess: res.remainingGuess,
				guessedLetters: res.guessedLetters
			})
		})

		this.models.onCorrectGuess((res)=>{
			console.log("Correct Guess", res);
			this.setState({
				word: res.word,
				guessedLetters: res.guessedLetters
			})
		})
	}



	render() {
		var guessedLettersUpper = this.state.guessedLetters.map((letter)=>{return letter.toUpperCase()});
		return(
			<div>
				<Gallows remainingGuess={this.state.remainingGuess} />
				<RemainingGuess RemainingGuess={this.state.remainingGuess} />
				<Outcome />
				<Word word={this.state.word} />
				<GuessedLetters guessedLetters={guessedLettersUpper} />
				<Alphabets guessedLetters={guessedLettersUpper} models = {this.models}/>
			</div>
		)
	}

}
