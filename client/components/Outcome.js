 
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class Outcome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {    
      showModal: false
    };
  }

	onPlayAgain(){
		this.props.models.playAgain();
	}

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return ( 
      <div>
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.gameState}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The word was <strong>#######</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
  }
}

