import React from 'react';
import ServerAPI from '../models/ServerAPI'
import Alphabets from './Alphabets.js';
import Gallows from './Gallows.js';
import GuessedLetters from './GuessedLetters.js';
import RemainingGuess from './RemainingGuess.js';
import Word from './Word.js';

export default class GameBoard extends React.Component {

	constructor(props) {
		super(props);
		// this.state = {
		// 	word: [],
		// 	guessedLetters: [],
		// 	remainingGuesses: 6,
		// 	gameState: false
		// };
	}

	render() {
		var guessedLettersUpper = this.props.guessedLetters.map((letter)=>{return letter.toUpperCase()});
		return(
			<div className ='gameBoard'>	
				<Gallows remainingGuesses={this.props.remainingGuesses} />
				<RemainingGuess remainingGuesses={this.props.remainingGuesses} />
				<Word word={this.props.word} />
				<GuessedLetters guessedLetters={guessedLettersUpper} />
				<Alphabets guessedLetters={guessedLettersUpper} models = {this.props.models}/>	
			</div>
		)
	}

}
