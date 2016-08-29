import React from 'react';
import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import GameBoard from '../../client/components/GameBoard';
import Alphabets from '../../client/components/Alphabets.js';
import Gallows from '../../client/components/Gallows.js';
import Outcome from '../../client/components/Outcome.js'
import GuessedLetters from '../../client/components/GuessedLetters.js';
import RemainingGuess from '../../client/components/RemainingGuess.js';
import Word from '../../client/components/Word.js';

describe('Alphabets', function() {
	let app = mount(<Alphabets guessedLetters={[]} />);
	var alphabetsArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
	var alphabetsToTestArray = app.find('.alphabet');

	it('Should have all alphabets in upper case', ()=>{		
		expect(app.find('.alphabet').length).to.equal(26);	
		alphabetsArray.forEach((alphabet, index) => {
			expect(alphabetsToTestArray.at(index).text().trim()).to.equal(alphabet);
		})	
	})

	it('Should not call model if a guessed alphabet is clicked', ()=>{

	})

	it('Should call model if an unguessed alphabet is clicked', ()=>{

	})

	it('Should grey out guessed letters', ()=>{
		var input = ["F", "Z", "H"];
		app.setProps({guessedLetters:input});	
		expect(app.find('.alphabet-guessed').length).to.equal(input.length);	
		input.forEach((letter)=>{
			var index = alphabetsArray.indexOf(letter);
			console.log(letter, index)
			expect(app.find('.alphabet').at(index).hasClass('alphabet-guessed')).to.be.true;	
		})
	})

});

describe('Guessed Letters', function() {
	let app = shallow(<GuessedLetters guessedLetters={[]} />);

	it('Should not have any letters at init', ()=>{		
		expect(app.find('.guessedLetter').length).to.equal(0);	
	})

	it('Should display letters passed from props', ()=>{
		var input = ["F", "Z", "H"]; // all inputs should be upper case
		app.setProps({guessedLetters:input});		
		expect(app.find('.guessedLetter').length).to.equal(input.length);	
		input.forEach((letter, index)=>{
			expect(app.find('.guessedLetter').at(index).text().trim()).to.equal(letter.toUpperCase());	
		})
	})

	it('Should display letters passed from props', ()=>{
		var input = ["A", "F", "C"]; // all inputs should be upper case
		app.setProps({guessedLetters:input});		
		expect(app.find('.guessedLetter').length).to.equal(input.length);	
		input.forEach((letter, index)=>{
			expect(app.find('.guessedLetter').at(index).text().trim()).to.equal(letter.toUpperCase());	
		})
	})
});