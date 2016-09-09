import React from 'react';
import firebase from 'firebase';
// import { Modal, Button } from 'react-bootstrap';
import Outcome from './Outcome.js';
import Players from './Players';
import Player1 from './Player1';
import Player2 from './Player2';


export default class Room extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      word: [], // keep state immutable
      displayWord: [],
      guessedLetters: [],
      remainingGuesses: 6,
      isDone: false,
      player2: null,
      coolDown: 0,
      timeToContinue: 0,
      roomName: '',
      show: false,
      player: '',
      totalPlayers: null,
    };
    this.outcome = {
      win: false,
      player: '',
    };

    this.fbGame = firebase.database().ref(`/games/${this.props.roomId}`);
  }

  componentWillMount() {
    console.log('props: ', this.props);
    var _this = this;
    this.fbGame.on('value', (gameData) => {
      const currentUserId = firebase.auth().currentUser.uid;
      const done = gameData.child('isDone').val();
      console.log('game data:', gameData.val());

      const players = Object.keys(gameData.child('players').val());
      const player1 = players.splice(players.indexOf(currentUserId), 1);

      _this.setState({
        word: gameData.child(`/players/${currentUserId}/word`).val(),
        displayWord: gameData.child(`/players/${currentUserId}/displayWord`).val(),
        roomName: gameData.child('name').val(),
        totalPlayers: gameData.child('totalPlayers').val(),
        guessedLetters: gameData.child(`/players/${currentUserId}/guessedLetters`).val() || [],
        remainingGuesses: gameData.child(`/players/${currentUserId}/remainingGuesses`).val(),
        isDone: done,
        timeToContinue: done ? 10 : 0,
        show: done || false,
        player2: players.length ? players[0] : null,
      });
    });
  }

  componentDidUpdate() {
    if (this.state.word.join('') === this.state.displayWord.join('')) {
      this.outcome.win = true;
      console.log('WIN');
      this.fbGame.update({
        isDone: firebase.auth().currentUser.uid,
        displayWord: ['_'],
      });
      return;
    }
    if (this.state.remainingGuesses === 0) {
      this.outcome.win = false;
      console.log('LOSS');
      if (this.state.totalPlayers === 1) {
        this.fbGame.update({
          isDone: true,
          remainingGuesses: null,
        });
      } else {
        this.fbGame.update({
          isDone: this.state.player2,
          remainingGuesses: null,
        });
      }
      return;
    }
  }

  playAgain() {
    const currentUserId = firebase.auth().currentUser.uid;
    this.props.serverAPI.playAgain(currentUserId, this.props.roomId)
    .then((data) => {
      console.log('After playAgain: ', data);
      this.close();
    });
  }

  endGame() {
    console.log("ROOM ID: ", this.props.roomId);
    this.props.serverAPI.endGame(this.props.roomId)
    .then(() => {
      console.log('Game Removed!');
      this.props.returnToLobby();
    });
  }

  makeGuess(letter) {
    let correct = false;
    if (this.state.remainingGuesses > 0) {
      correct = this.props.serverAPI.makeGuess(letter, this.state.word, this.state.displayWord, this.props.roomId);
    }
  }

  close() {
    this.setState({
      show: false,
    });
  }

  recordWin() {
    var winCountRef = firebase.database().ref('users/cH74Wy1ASje2tx7TKrnUFvJNrxe2/winCount');
    winCountRef.transaction((currentRank) => {
      // If users/ada/rank has never been set, currentRank will be `null`.
      return currentRank + 1;
    });
  }

  selectGameMode() {
    const guessedLettersUpper = this.state.guessedLetters !== null ? this.state.guessedLetters.map(letter => letter.toUpperCase()) : [];

    console.log('total players', this.state.totalPlayers);
    if (this.state.totalPlayers === 1) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <Player1
                word={this.state.displayWord}
                guessedLetters={guessedLettersUpper}
                remainingGuesses={this.state.remainingGuesses}
                serverAPI={this.props.serverAPI}
                coolDown={this.state.coolDown}
                username={this.props.username}
                makeGuess={e => this.makeGuess(e)}
                roomName={this.state.roomName}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container-fluid">
          <div className="row">

            <div className="col-sm-6">
              <Player1
                word={this.state.displayWord}
                guessedLetters={guessedLettersUpper}
                remainingGuesses={this.state.remainingGuesses}
                serverAPI={this.props.serverAPI}
                username={this.props.username}
                makeGuess={e => this.makeGuess(e)}
                roomName={this.state.roomName}
              />
            </div>

            <div className="col-sm-6">
              { this.state.player2
                ? <Player2
                  roomId={this.props.roomId}
                  playerId={this.state.player2}
                />
                : <section id="player2" className="row">
                  <div className="col-sm-8">
                    <div className="panel panel-default board-col">
                      <h1>Waiting for Player 2</h1>
                    </div>
                  </div>
                </section>
              }
            </div>
          </div>
        </div>
      );
    }
  }
        // <div className="outcome">
        //   <Modal show={this.state.isDone} onHide={this.close}>
        //     <Modal.Header closeButton>
        //       <Modal.Title>
        //         {this.outcome.win ? 'YOU\'RE A WINNER!!' : 'NOPE, TRY AGAIN'}
        //       </Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
        //       {`${this.outcome.win ? 'WINNER IS ' : 'LOSER IS '} ${this.state.player}`}
        //     </Modal.Body>
        //     <Modal.Footer>
        //       <Button onClick={e => this.playAgain(e)}>Play Again</Button>
        //     </Modal.Footer>
        //   </Modal>
        // </div>
        // <button id="play-again" onClick={e => this.playAgain(e)}>Play Again</button>

  render() {
    console.log('RENDER ROOM', this.state);
    return (
      <div className="room">
        { this.state.isDone
          ? <Outcome
            show={this.state.isDone}
            outcome={this.outcome}
            timeToContinue={this.state.timeToContinue}
            playAgain={e => this.playAgain(e)}
            endGame={e => this.endGame(e)}
            singlePlayer={this.state.totalPlayers === 1}
            solution={this.state.word.join('')}
          />
          : null
        }
        <div className="container-fluid">
          { this.selectGameMode() }
        </div>
      </div>
    );
  }

}
