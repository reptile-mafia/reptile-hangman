import React from 'react';
import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import GameBoard from '../../client/components/GameBoard';
import Alphabet from '../../client/components/Alphabets.js';
import Gallows from '../../client/components/Gallows.js';
import Outcome from '../../client/components/Outcome.js'
import GuessedLetters from '../../client/components/GuessedLetters.js';
import RemainingGuess from '../../client/components/RemainingGuess.js';
import Word from '../../client/components/Word.js';

describe('Alphabets', function() {
	let app = shallow(<Alphabet guessedLetters={[]} />);
	var alphabetsArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split();
	var alphabetsToTestArray = app.find('.alphabet');

	it('Should have all alphabets in upper case', ()=>{		
		expect(app.find('.alphabet').length).to.equal(26);	
		alphabetsArray.forEach((alphabet, index) => {
			expect(alphabetsToTestArray.at(index).text().trim()).to.equal(alphabet);
		})
	})

	it('Should call model if alphabet is clicked', ()=>{

	})

	it('Should grey out', ()=>{
		app.setProps({guessedLetters:["a"]});		
		expect(app.find('.guessedLetter').length).to.equal(1);	
		expect(app.find('.guessedLetter').at(0).text().trim()).to.equal("A");	
	})

});

describe('Guessed Letters', function() {
	let app = shallow(<GuessedLetters guessedLetters={[]} />);

	it('Should not have any letters at init', ()=>{		
		expect(app.find('.guessedLetter').length).to.equal(0);	
	})

	it('Should display letters passed from props', ()=>{
		app.setProps({guessedLetters:["a"]});		
		expect(app.find('.guessedLetter').length).to.equal(1);	
		expect(app.find('.guessedLetter').at(0).text().trim()).to.equal("A");	
	})

	it('Should display letters passed from props', ()=>{
		var input = ["a", "b", "c"];
		app.setProps({guessedLetters:input});		
		expect(app.find('.guessedLetter').length).to.equal(input.length);	
		input.forEach((letter, index)=>{
			expect(app.find('.guessedLetter').at(index).text().trim()).to.equal(letter.toUpperCase());	
		})
	})
});