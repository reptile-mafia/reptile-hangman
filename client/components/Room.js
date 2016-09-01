import React from 'react';
import ServerAPI from '../models/ServerAPI';
import GameBoard from './GameBoard';
import Outcome from './Outcome.js';
import Players from './Players';


export default class Room extends React.Component {

	constructor(props) {
		super(props);
		this.state = {		
			word: [],
			guessedLetters: [],
			remainingGuesses: 6,
			players:[1,2,3,4],
			timeUntilNextGame: -1,
			isDone: true
		};

		this.outcome = {
			win: true,
			winner: "CC",
		}

		this.models = new ServerAPI(4000);
		this.models.connect();	

		//this.models.enterRomm()

		this.models.onStartGame( (res) => {
			console.log("Start game", res);
			this.setState({
				word: res.word,
				isDone: false
			})
		});

		this.models.onIncorrectGuess((res)=>{
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
				word: res.word,
				isDone: true
			})
		})

		this.models.onLose((res)=>{
			console.log("lose!")
			this.outcome = {

			}

			this.setState({
				remainingGuesses: 0,
				isDone: true
			})
		})
	}

	render() {
		var guessedLettersUpper = this.state.guessedLetters.map((letter)=>{return letter.toUpperCase()});
		return(
			<div className="room">
				{
					(this.state.isDone)?<Outcome gameState={this.state.gameState} />: null
				}	
				<GameBoard 
					word={this.state.word} 
					guessedLetters={guessedLettersUpper} 
					remainingGuesses={this.state.remainingGuesses} 
					models = {this.models}/>
				<Players players={this.state.players}/>

			</div>
		)
	}

}
