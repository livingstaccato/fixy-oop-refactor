'use strict';

const type = "string";

const moment = require("moment");

class Parser {
	constructor(options) {
		this.options = (typeof options === 'Object') ? options : null;
	    this.type = type;	
	}

	parse(data) {
		return data;
	}
}

module.exports = Parser