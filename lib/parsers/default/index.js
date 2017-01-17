'use strict';

const type = 'default';

const StringParser = require('../string/index.js');

class DefaultParser extends StringParser {
	constructor(options) {
		super(options);
		this.setType(type);
	}
}

module.exports = DefaultParser