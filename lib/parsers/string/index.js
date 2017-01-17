'use strict';

const type = 'string';

const BaseParser = require('../../BaseParser');

class StringParser extends BaseParser {
    constructor(options) {
        super(options);
        this.setType(type);
    }

    parse(data) {
        return data;
    }
}

module.exports = StringParser