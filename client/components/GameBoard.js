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

		this.models = new ServerAPI(4000);
		this.models.connect();
		this.models.onStartGame( (res) => {
			console.log("Start game", res);
			this.setState({
				word: res.word,
				gameState: 'play'
			})
		});

		this.models.onIncorrectGuess((res)=>{
			console.log("Start game", res);
			this.setState({
				remainingGuesses: res.remainingGuesses,
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

		this.models.onWin((res)=>{
			console.log("win!")
			this.setState({
				gameState: 'win'
			})
		})

		this.models.onLose((res)=>{
			console.log("lose!")
			this.setState({
				gameState: 'lose'
			})
		})
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
				<Gallows remainingGuesses={this.state.remainingGuesses} />
				<RemainingGuess remainingGuesses={this.state.remainingGuesses} />
				<Word word={this.state.word} />
				<GuessedLetters guessedLetters={guessedLettersUpper} />
				<Alphabets guessedLetters={guessedLettersUpper} models = {this.models}/>	
			</div>
		)
	}

}
