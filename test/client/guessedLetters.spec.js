import React from 'react';
import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import GameBoard from '../../client/components/GameBoard';
import GuessedLetters from '../../client/components/GuessedLetters.js';


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