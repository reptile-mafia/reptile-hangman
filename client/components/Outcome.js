 
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
					<Modal.Title>{this.props.outcome.win?"WIN :D":"LOSE :("}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{this.props.outcome.win?"WINNER IS ":"LOSER IS"}
					{this.props.outcome.player.slice(10)}
					<br/>

					<span> NEXT GAME IN:  </span>
					{
						//<p>The word was <strong>#######</strong></p> 
					}
					<span> 
					{
					((this.props.timeUntilNextGame - (new Date()).getTime())/1000).toPrecision(2)
					}
					</span>
					<span> SECS</span>

				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.close}>Close</Button>
				</Modal.Footer>
	    	</Modal>
	  </div>
	)
	}
}

