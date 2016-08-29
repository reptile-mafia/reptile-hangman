import React from 'react';

export default class Alphabets extends React.Component {

	constructor(props) {
		super(props);
		this.alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	}

	onAlphabetClick(e, target){
		target
	}

	render() {
		return ( 
			< div className = "alphabets"> 
				{
					this.alphabets.map(function(alphabet) {
						return ( 
							< span className = "alphabet" key = {alphabet} onClick = {(e)=>{onAlphabetClick(e, this)}}> 
								{ alphabet } 
							< /span> )
					})
				} 
			< /div>
		)
	}
}
