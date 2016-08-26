import React from 'react';
import {
	expect
} from 'chai';
import {shallow, mount, render} from 'enzyme';
import GameBoard from '../components/GameBoard';

describe('Guessed Letters', function() {

	it('Should show correct letters', function(){
		let app = render(<GameBoard />);
		expect(app.find('.guessedLetters').children.length.to.equal(0);
	});

	it('Should reset to empty at game initialization', function() {

	})
});