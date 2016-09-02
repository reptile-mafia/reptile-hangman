import React from 'react';

export default class RemainingGuess extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		console.log("rendering remain guess: ", this.props.remainingGuesses)
		return(
			<div className="remainingGuess">
				<span className="remainText">Guesses Left: </span>
				<span className="remainNumber">{this.props.remainingGuesses}</span>
			</div>
		)
	}

}

