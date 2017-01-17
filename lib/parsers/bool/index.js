'use strict';

const type = 'bool';

const BaseParser = require('../../BaseParser');

class BoolParser extends BaseParser {
    constructor(options) {
        super(options);
        this.setType(type);
    }

    parse(data) {
    	if (this.options.tVal) {
    		this.options.truechar = this.options.tVal;
    		delete this.options.tVal;
    	}

    	if (this.options.fVal) {
    		this.options.falsechar = this.options.fVal;
    		delete this.options.fVal;
    	}

        return (data === this.options.truechar) ? true : false;
    }
}

module.exports = BoolParser