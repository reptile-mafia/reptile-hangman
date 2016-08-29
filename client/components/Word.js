import React from 'react';

export default class Word extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				{	
					this.props.word.map((elem)=>{
						var result = "_";
						if(elem!==null){
							result = elem;
						} 
						return (<span className = "wordLetter"> {result} </span>)
					})
				}
			</div>
		)
	}

}

