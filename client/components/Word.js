import React from 'react';

export default class Word extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			length: this.props.word.length
		}
		
	}

	render() {
		return(
			<div>
				<h1 id="theWord">H A N G M A N</h1>
			</div>
		)
	}

}

