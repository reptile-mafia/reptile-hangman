import React from 'react';
import Models from '../models/ServerAPI'

export default class Alphabet extends React.Component {

	constructor(props) {
		super(props);
	}

	onAlphabetClick(e){
		//target
		console.log(e.target);
		//Models.guesses(e.target.text())
	}

	render() {
		return ( 
			< div className = "alphabet" onClick = {(e)=>{this.onAlphabetClick(e)}}> 
				{ this.props.alphabet} 
			< /div>
		)
	}
}