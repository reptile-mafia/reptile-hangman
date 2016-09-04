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
	}

	render() {
		var guessedLettersUpper = this.props.guessedLetters.map((letter)=>{return letter.toUpperCase()});
		return(
		// 	<div className ='gameBoard'>	
		// 		<Gallows remainingGuesses={this.props.remainingGuesses} />
		// 		<RemainingGuess remainingGuesses={this.props.remainingGuesses} />
		// 		<Word word={this.props.word} />
		// 		<GuessedLetters guessedLetters={guessedLettersUpper} />
		// 		<Alphabets guessedLetters={guessedLettersUpper} models = {this.props.models}/>	
		// 	</div>
		// )
		// var guessedLettersUpper = this.props.guessedLetters.map((letter)=>{return letter.toUpperCase()});
			<div className="container">
				<div className ='gameBoard'>
					<div className="row">
						<div className="col-xs-12" id="guessed">
							<RemainingGuess remainingGuesses={this.props.remainingGuesses} />
							<GuessedLetters guessedLetters={guessedLettersUpper} />
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12" id="theword">
							<Word word={this.props.word} />
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12" id="alphabet">
							<Alphabets guessedLetters={guessedLettersUpper} models={this.props.models} />
						</div>
					</div>
				</div>
			</div>
		)
	}

}
