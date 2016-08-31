import React from 'react';

export default class Outcome extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return ( 
			< div className="outcome-outline modal">
				<div className="outcome">
					{this.props.gameState}
				</div>
			< /div>
		)
	}
}
