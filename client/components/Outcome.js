import React from 'react';

export default class Outcome extends React.Component {

	constructor(props) {
		super(props);
	}

	onPlayGain(){
		this.props.model.
	}

	render() {
		return ( 
			< div className="outcome-outline modal">
				<div className="outcome">
					{this.props.outcome.win?"WIN":"LOSE"}
					<br/>
					{this.props.outcome.player}
					<div>Play Again?</div>
				</div>
			< /div>
		)
	}
}
