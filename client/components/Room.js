import React from 'react';
import ServerAPI from '../models/ServerAPI';
import GameBoard from './GameBoard';
import Players from './Players';


export default class Room extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			word: [],
			guessedLetters: [],
			remainingGuesses: 6,
			timeUntilNextGame: -1,
			isDone: true
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

	render() {
		var guessedLettersUpper = this.state.guessedLetters.map((letter)=>{return letter.toUpperCase()});
		return(
			<div>
				<GameBoard />
				XXXXX
				<Players />
			</div>
		)
	}

}
