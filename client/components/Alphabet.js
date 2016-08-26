import React from 'react';

export default class Alphabet extends React.Component {

	constructor(props) {
		super(props);
		this.alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	}

	render() {
		return ( 
			< div > 
				{
					this.alphabets.map(function(alphabet) {
						return ( < span > { alphabet } < /span> )
					})
				} 
			< /div>
		)
	}
}
