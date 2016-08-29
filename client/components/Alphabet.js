import React from 'react';
import Models from '../models/ServerAPI'

export default class Alphabet extends React.Component {

	constructor(props) {
		super(props);
	}

	isActive:function(value){
		return 'alphabet '+((value===this.state.guessed) ?'alphabet-guessed':'alphabet-active');
	}

	onAlphabetClick(e){
		console.log(this.props.guessed, this.props.alphabet);
		if(!this.props.guessed){
			//Models.guesses(this.props.alphabet);
		}
	}

	render() {
		return ( 
			< div className = "alphabet" onClick = {(e)=>{this.onAlphabetClick(e)}}> 
				{ this.props.alphabet} 
			< /div>
		)
	}
}