import React from 'react';

export default class RemainingGuess extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<span className="remainText">Guesses Left: </span>
				<span className="remainNumber">{this.props.RemainingGuess}</span>
			</div>
		)
	}

}

