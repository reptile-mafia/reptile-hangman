import React from 'react';
//import * as Models from '../models/'
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

		var api = new ServerAPI(4000);
		api.connect();
		api.onStartGame(function (res) {
			console.log('onStartGame: ', res)
			api.makeGuess('o');
		});

		api.onCorrectGuess(function (res) {
			console.log('onCorrectGuess', res);
		});

		api.onIncorrectGuess(function (res) {
			console.log('onIncorrectGuess', res)
		});

		this.api = api;

	}

	render() {
		return(
			<div>
				<Gallows remainingGuess={this.state.remainingGuess} />
				<RemainingGuess remainingGuess={this.state.remainingGuess} />
				<Outcome />
				<Word word={this.state.word} />
				<GuessedLetters guessedLetters={this.state.guessedLetters} />
				<Alphabets guessedLetters={this.state.guessedLetters} />
			</div>
		)
	}

}
