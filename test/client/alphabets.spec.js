import React from 'react';
import Sinon from 'sinon';
import Model from '../../client/models/ServerAPI';
import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import GameBoard from '../../client/components/GameBoard';
import Alphabets from '../../client/components/Alphabets.js';

describe('Alphabets', function() {
	let app = mount(<Alphabets guessedLetters={[]} />);
	var alphabetsArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
	var alphabetsToTestArray = app.find('.alphabet');
	const spy = Sinon.spy(Model.prototype, 'guess');

	it('Should have all alphabets in upper case', ()=>{		
		expect(app.find('.alphabet').length).to.equal(26);	
		alphabetsArray.forEach((alphabet, index) => {
			expect(alphabetsToTestArray.at(index).text().trim()).to.equal(alphabet);
		})	
	})

	it('Should grey out guessed letters', ()=>{
		var input = ["F", "Z", "H"];
		app.setProps({guessedLetters:input});	
		expect(app.find('.alphabet-guessed').length).to.equal(input.length);	
		input.forEach((letter)=>{
			var index = alphabetsArray.indexOf(letter);
			expect(app.find('.alphabet').at(index).hasClass('alphabet-guessed')).to.be.true;	
		})
	})

	it('Should not call model if a guessed alphabet is clicked', ()=>{

	})

	it('Should call model if an unguessed alphabet is clicked', ()=>{

	})

});