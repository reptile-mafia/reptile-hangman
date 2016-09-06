import React from 'react';

export default class Alphabet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      remaining: 0,
    };
    this.active = false;
  }

  componentWillReceiveProps() {
    this.active = true;
  }

  updateState(remaining) {
    this.setState({
      remaining: remaining,
    });
  }

  render() {
    if (this.active) {
      const now = new Date();
      let remaining = (this.props.coolDown - now) / 1000;
      if (remaining < 0) {
        this.active = false;
        remaining = 0;
      }
      setTimeout(this.updateState.bind(this, remaining), 100);
    }

    const style = {
      backgroundColor: this.props.color || (this.state.remaining > 0) ? '#888888' : '#EEEEEE',
      width: `${((this.state.remaining > 0) ? (this.state.remaining / 3) * 100 : 100)}%`,
      transition: 'width 1 0ms',
      height: this.props.height || `${2}em`,
    };

    return (
      <div className="coolDown">
        <div className="progressbar-container">
          <div className="progressbar-progress" style={style}>
            {
              (this.state.remaining > 0)
              ? ((this.state.remaining).toPrecision(3))
              : 'Guess Again!'
            }
          </div>
        </div>
      </div>
    );
  }
}
