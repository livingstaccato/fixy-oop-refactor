'use strict';

const type = 'int';

const BaseParser = require('../../BaseParser');

class IntParser extends BaseParser {
    constructor(options) {
        super(options);
        this.setType(type);
    }

    parse(data) {
        return parseInt(data);
    }
}

module.exports = IntParser