import React from 'react';
import firebase from 'firebase';
import { Modal, Button } from 'react-bootstrap';

export default class Outcome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      timeToContinue: 10,
      runOnce: false,
      playerName: '',
      solution: '',
    };
    this.timerId = null;
  }

  componentWillMount() {
    this.setState({
      show: this.props.show,
      timeToContinue: this.props.timeToContinue,
      solution: this.props.solution,
    });
  }

  componentDidMount() {
    if (this.state.timeToContinue > 0) {
      this.startCountdown();
    }
  }

  componentDidUpdate() {
    // if (this.state.timeToContinue < 1) {
    //   this.endCountdown();
    // }
  }

  onQuit() {
    this.props.endGame();
    this.close();
  }

  onPlayAgain() {
    this.props.playAgain();
    this.close();
  }

  close() {
    this.endCountdown();
    this.setState({
      show: false,
    });
  }

  startCountdown() {
    this.timerId = setInterval(() => {
      if (this.state.timeToContinue > 0) {
        this.setState({
          timeToContinue: Math.floor(this.state.timeToContinue - 1),
          show: this.props.show,
        });
      } else {
        this.onQuit();
      }
    }, 1000);
  }

  endCountdown() {
    clearInterval(this.timerId);
  }

  recordWin(uid) {
    var winCountRef = firebase.database().ref('users/' + uid + '/winCount');
    winCountRef.transaction((currentRank) => {
      // If users/ada/rank has never been set, currentRank will be `null`.
      return currentRank + 1;
    });
    this.setState({ runOnce: true });
  }

  render() {
    console.log('user: ', firebase.auth().currentUser.uid);

    if (this.props.outcome.win && !this.state.runOnce) {
      let user = firebase.auth().currentUser.uid;
      this.recordWin(user);
    }
    console.log('In Outcome', this.state.timeToContinue);
    return (
      <div className="outcome">
        <Modal show={this.state.show} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.show === firebase.auth().currentUser.uid ? 'YOU\'RE A WINNER!!' : 'NOPE, TRY AGAIN'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.singlePlayer ? '' : `WINNER IS ${this.state.show}`}
            <br />
            {`The word was: ${this.state.solution}`}
            <br />
            <span>{`Next game in: ${this.state.timeToContinue} ${this.state.timeToContinue > 1 ? 'seconds' : 'second'}`}</span>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={e => this.onQuit(e)}>Quit</Button>
            {this.props.singlePlayer ? <Button onClick={e => this.onPlayAgain(e)}>Play Again</Button> : null}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

