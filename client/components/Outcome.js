import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class Outcome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentWillMount() {
    this.setState({
      show: this.props.show,
    });
  }

  // componentWillReceiveProps({ show }) {
  //   this.setState({
  //     show: true,
  //   });
  // }

  onPlayAgain() {
    this.props.playAgain();
    this.close();
  }

  close() {
    this.setState({
      show: false,
      timeLeft: 0,
    });
  }

  countdown() {
    setInterval(() => {
      if (this.state.timeLeft > 0) {
        this.setState({
          timeLeft: Math.floor(this.state.timeLeft - 1),
          show: true,
        });
      } else {
        this.setState({
          show: false,
        });
      }
    }, 1000);
  }
            // <br />
            // <br />
            // <span>{`Next game in: ${this.state.timeLeft} ${this.state.timeLeft > 1 ? 'seconds' : 'second'}`}</span>

  render() {
    // console.log('In Outcome', this.state.timeLeft);
    // this.state.show = this.props.show && (this.state.timeLeft > 0);
    return (
      <div className="outcome">
        <Modal show={this.state.show} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.outcome.win ? 'YOU\'RE A WINNER!!' : 'NOPE, TRY AGAIN'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {`${this.props.outcome.win ? 'WINNER IS ' : 'LOSER IS '} ${this.props.outcome.player}`}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={e => this.onPlayAgain(e)}>Play Again</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

