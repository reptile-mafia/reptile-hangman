import React from 'react';
//import * as Models from '../models/'
import Alphabet from './Alphabet.js';
import Gallows from './Gallows.js';
import GuessedLetters from './GuessedLetters.js';
import RemainingGuess from './RemainingGuess.js';
import Word from './Word.js';

export default class GameBoard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			word: [],
			guessedLetters: [],
			remainingGuess: 0
		};
	}

	render() {
		return(
			<div>
				<Gallows remainingGuess={this.state.remainingGuess} />
				<RemainingGuess remainingGuess={this.state.remainingGuess} />
				<Word word={this.state.word} />
				<GuessedLetters guessedLetters={this.state.guessedLetters} />
				<Alphabet guessedLetters={this.state.guessedLetters} />
			</div>
		)
	}

}

