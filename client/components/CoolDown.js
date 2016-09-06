import React from 'react';

export default class Alphabet extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			remaining: 0
		}
		this.active = false;
	}

	updateState(remaining){
		this.setState({
			remaining: remaining
		})
	}

	componentWillReceiveProps(){
		this.active = true;
	}

	render() {
		if(this.active){
			var now = new Date();
			var remaining = (this.props.coolDown-now)/1000;
			if(remaining < 0){
				this.active = false;
				remaining = 0;	
			}
			setTimeout(this.updateState.bind(this, remaining), 100)			
		}

		var style = {
			backgroundColor: this.props.color || (this.state.remaining>0)?'#888888':'#EEEEEE',
			width: ((this.state.remaining>0)?this.state.remaining/3*100:100) + '%',
			transition: "width 10ms",
			height: this.props.height || 2+'em'
	    };

		return ( 
			< div className = 'coolDown'> 
			<div className="progressbar-container">
				<div className="progressbar-progress" style={style}>
					{
						(this.state.remaining>0)?
						((this.state.remaining).toPrecision(3)):
						"Guess Again!"
					}
				</div>
			</div>
			</div>
		)
	}
}