import React from 'react';
import ServerAPI from '../models/ServerAPI';
import GameBoard from './GameBoard';
import Gallows from './Gallows.js';
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
			player: "",
		}

		// player = {
		// 	playerId: null,
		// 	guessedLetters: [],
		// 	correctLetters: 0,
		// 	incorrectLetters:0
		// }

		// setup socket
		this.serverAPI = new ServerAPI(4000);
		this.serverAPI.connect();	
		// enter room
		this.serverAPI.onEnterRoom((res)=>{
			console.log("Enter Room", res);
			var playerList = res.players.slice();
			console.log("XXXXX", res.players.getId)
			playerList.push(res.playerId);

			console.log("PLAYERLIST: ", res.players.playerId, playerList)
			this.setState({
				'players' : playerList,
				'playerId' : res.playerId,
		        'word':  res.gameState.word, // keep state immutable
	    		'guessedLetters': res.gameState.guessedLetters,
	    		'remainingGuesses': res.gameState.remainingGuesses,
	    		'isDone': res.gameState.isDone
			});
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
			console.log("Incorrect Guess", res);
			this.setGameState(res.gameState);
		})

		this.serverAPI.onCorrectGuess((res)=>{
			console.log("Correct Guess", res);
			this.setGameState(res.gameState);
		})

		this.serverAPI.onWin((res)=>{
			console.log("win!", res)
			this.outcome.win = true;
			this.outcome.player = res.playerId;
			this.setGameState(res.gameState);
		})

		this.serverAPI.onLose((res)=>{
			console.log("lose!", res)
			this.outcome.win = false;
			this.outcome.player = res.playerId;
			this.setGameState(res.gameState);
		})
	}

	setGameState(gameState){
		console.log("setting game state: ", gameState)
		this.setState({
	        'word':  gameState.word, // keep state immutable
    		'guessedLetters': gameState.guessedLetters,
    		'remainingGuesses': gameState.remainingGuesses,
    		'isDone': gameState.isDone
		});
	}


	render() {
		console.log("render", this.state)
		var guessedLettersUpper = this.state.guessedLetters.map((letter)=>{return letter.toUpperCase()});
		return(
			<div className="room">
				{ (this.state.isDone)?<Outcome gameState={this.state.gameState} />: null }
				<nav className="navbar navbar-default navbar-static-top">
				  <div className="container navcon">
				    <h1 className="game-title">HANGMAN</h1>
				  </div>
				</nav>
				<div className="container">
					<div className="row">
						<div className="col-xs-2" id="player-col">
							<Players players={this.state.players}/>
						</div>	
						<div className="col-xs-8" id="board-col">
							<GameBoard 
								word={this.state.word} 
								guessedLetters={guessedLettersUpper} 
								remainingGuesses={this.state.remainingGuesses} 
								serverAPI = {this.serverAPI}/>
						</div>
						<div className="col-xs-2" id="gallows-col">
							<Gallows remainingGuesses={this.state.remainingGuesses} />
						</div>
					</div>
				</div>
			</div>
		)
	}

}
