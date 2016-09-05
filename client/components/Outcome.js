 
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class Outcome extends React.Component {

	constructor(props) {
		super(props);
	}

	onPlayAgain(){
		this.props.models.playAgain();
	}

	render() {
	return ( 
	  <div className = "outcome">
	      <Modal show={this.props.show} onHide={this.close}>
	        <Modal.Header closeButton>
	          <Modal.Title>{this.props.outcome.win?"WIN":"LOSE"}</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	       	 {this.props.outcome.win?"WIN":"LOSE"}
	       	 {this.props.outcome.player.slice(10)}
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

