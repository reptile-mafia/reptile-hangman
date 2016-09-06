import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class Outcome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      timeLeft: (this.props.timeUntilNextGame - (new Date()).getTime()) / 1000,
    };
  }

  onPlayAgain() {
    this.props.models.playAgain();
  }

  // componentWillReceiveProps(){
  //  console.log("OUTCOME RECEIVEPROPS", this.props);
  //  this.setState({
  //    show: this.props.show
  //  })
  // }
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

  handleClose() {
    this.hideModal();
  }

  close() {
    this.setState({
      show: false,
    });
  }

  render() {
    // if(this.state.show){
    //  var now = new Date();
    //  var remaining = (this.props.timeUntilNextGame-now)/1000;
    //  setTimeout(this.updateState.bind(this, remaining), 100)
    // }
    console.log('In Outcome', this.state.timeLeft);
    // this.countdown();
    // const timeLeft = (this.props.timeUntilNextGame - (new Date()).getTime()) / 1000;
    this.state.show = this.props.show && (this.state.timeLeft > 0);
    return (
      <div className="outcome">
        <Modal show={this.state.show} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.outcome.win ? 'WIN :D' : 'LOSE :('}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.outcome.win ? 'WINNER IS ' : 'LOSER IS '}
            {this.props.outcome.player.slice(10)}
            <br />
            <span> NEXT GAME IN:</span>
            {
              // <p>The word was <strong>#######</strong></p>
            }
            <span>
            {
            this.state.timeLeft.toPrecision(2)
            }
            </span>
            <span> SECS</span>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Play Again</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

