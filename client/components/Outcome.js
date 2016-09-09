import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class Outcome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      timeToContinue: 10,
      playerName: '',
    };
    this.timerId = null;
  }

  componentWillMount() {
    this.setState({
      show: this.props.show,
      timeToContinue: this.props.timeToContinue,
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
          show: true,
        });
      } else {
        this.onQuit();
      }
    }, 1000);
  }

  endCountdown() {
    clearInterval(this.timerId);
  }

  render() {
    console.log('In Outcome', this.state.timeToContinue);
    return (
      <div className="outcome">
        <Modal show={this.state.show} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.outcome.win ? 'YOU\'RE A WINNER!!' : 'NOPE, TRY AGAIN'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {`WINNER IS ${this.state.show}`}
            <br />
            <br />
            <span>{`Next game in: ${this.state.timeToContinue} ${this.state.timeToContinue > 1 ? 'seconds' : 'second'}`}</span>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={e => this.onQuit(e)}>Quit</Button>
            <Button onClick={e => this.onPlayAgain(e)}>Play Again</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

