import React from 'react';

export default class Gallows extends React.Component {

	constructor(props) {
		super(props);
		
	}

	render() {
		return(
			<div>
				<svg width="500" height="500" >
					<g id="gallowStructure">
						<line x1="50" y1="450" x2="450" y2="450" />
						<line x1="100" y1="450" x2="100" y2="50" />
						<line x1="90" y1="60" x2="300" y2="60" />
						<line x1="100" y1="110" x2="150" y2="60" />
					</g>
					<g id="gallowRope">
						<line x1="275" y1="55" x2="275" y2="170" />
						<circle cx="275" cy="180" r="10" />
					</g>
					<g id="gallowMan">
						<circle id="noggin" 
							className={this.props.remainingGuess < 6 ? "op-on" : "op-off"}
							cx="275" cy="158" r="30" />
						<line id="torso" 
							className={this.props.remainingGuess < 5 ? "op-on" : "op-off"}
							x1="275" y1="190" x2="275" y2="290" />
						<line id="arm-left" 
							className={this.props.remainingGuess < 4 ? "op-on" : "op-off"}
							x1="275" y1="220" x2="220" y2="250" />
						<line id="arm-right" 
							className={this.props.remainingGuess < 3 ? "op-on" : "op-off"}
							x1="275" y1="220" x2="330" y2="250" />
						<line id="leg-left" 
							className={this.props.remainingGuess < 2 ? "op-on" : "op-off"}
							x1="275" y1="285" x2="230" y2="350" />
						<line id="leg-right" 
							className={this.props.remainingGuess < 1 ? "op-on" : "op-off"}
							x1="275" y1="285" x2="320" y2="350" />
					</g>
				</svg>
			</div>
		)
	}

}

