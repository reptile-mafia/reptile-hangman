import React from 'react';

export default class Outcome extends React.Component {

	constructor(props) {
		super(props);
	}

	onPlayAgain(){
		this.props.models.playAgain();
	}

	render() {
		return ( 
			< div className="outcome-outline modal">
				<div className="outcome">
					{this.props.outcome.win?"WIN":"LOSE"}
					<br/>
					{this.props.outcome.player.slice(10)}
					<div onClick = {this.onPlayAgain.bind(this)}>Play Again?</div>
				</div>
			< /div>

		)
	}
}
