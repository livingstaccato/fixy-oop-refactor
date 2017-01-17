'use strict';

class BaseParser {
	constructor(options) {
		this.options = this.setOptions(options);
		this.type = this.setType(undefined);
	}

    setOptions(options) {
		this.options = (typeof options === 'object') ? options : undefined;
    }

    setType(type) {
    	this.type = type;
    }

	parse(data) {
		return data;
	}
}

module.exports = BaseParser