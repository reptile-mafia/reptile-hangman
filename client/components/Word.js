import React from 'react';

export default class Word extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wordLetters">
        {
          this.props.word.map(elem => {
            let result = '_';
            if (elem !== null) {
              result = elem.toUpperCase();
            }
            return (<span className="wordLetter"> {result} </span>);
          })
        }
      </div>
    );
  }
}

