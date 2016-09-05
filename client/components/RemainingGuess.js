import React from 'react';

export default class RemainingGuess extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="remainingGuess">
				<span className="remainText">Guesses Remaining: </span>
				<span className="remainNumber">{this.props.remainingGuesses}</span>
			</div>
		)
	}

}

