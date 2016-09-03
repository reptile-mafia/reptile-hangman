import React from 'react';
import ServerAPI from '../models/ServerAPI';
import GameBoard from './GameBoard';
import Outcome from './Outcome.js';
import Players from './Players';


export default class Room extends React.Component {

	constructor(props) {
		super(props);
		this.state = {	
	        word: [], // keep state immutable
    		guessedLetters: [],
    		remainingGuesses: 6,
    		isDone: false,
			players:[]
		};

		this.outcome = {
			win: true,
			winner: "CC",
		}

		// player = {
		// 	playerId: null,
		// 	guessedLetters: [],
		// 	correctLetters: 0,
		// 	incorrectLetters:0
		// }

		// init room
		this.serverAPI = new ServerAPI(4000);
		this.serverAPI.connect();	
		this.serverAPI.onEnterRoom((res)=>{
			console.log("Enter Room");
			this.state.players = res.players;
			this.state.playerId = res.playerId;
			this.setGameState(res.gameState);
		})

		this.serverAPI.onPlayerEnterRoom((res)=>{
			console.log("Player enter room", res);
			var playerList = this.state.players;
			playerList.push(res.playerId);
			this.setState({
				players: playerList
			})
		});

		this.serverAPI.onPlayerLeaveRoom((res)=>{
			console.log("Player Leave room", res);
			var playerList = this.state.players;
			playerList.splice(playerList.indexOf(res.playerId), 1);
			this.setState({
				players: playerList
			})
		});

		this.serverAPI.onStartGame( (res) => {
			console.log("Start game", res);
			this.setGameState(res);
		});

		this.serverAPI.onIncorrectGuess((res)=>{
			this.setState({
				remainingGuesses: res.remainingGuesses,
				guessedLetters: res.guessedLetters
			})
			this.setGameState(res.gameState);
		})

		this.serverAPI.onCorrectGuess((res)=>{
			console.log("Correct Guess", res);
			this.setState({
				word: res.word,
				guessedLetters: res.guessedLetters
			})
		})

		this.serverAPI.onWin((res)=>{
			console.log("win!")
			this.setState({
				word: res.word,
				isDone: true
			})
		})

		this.serverAPI.onLose((res)=>{
			console.log("lose!")
			this.outcome = {

			}

			this.setState({
				remainingGuesses: 0,
				isDone: true
			})
		})
	}

	setGameState(gameState){
		this.setState({
	        word:  gameState.word, // keep state immutable
    		guessedLetters: gameState.guessedLetters,
    		remainingGuesses: gameState.remainingGuesses,
    		isDone: gameState.isDone
		})
	}

	render() {
		console.log("render", this.state)
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
					models = {this.serverAPI}/>
				<Players players={this.state.players}/>

			</div>
		)
	}

}
