'use strict';

const type = 'date';

const BaseParser = require('../../BaseParser');

const moment = require('moment');

class DateParser extends BaseParser {
    constructor(options) {
        super(options);
        this.setType(type);
    }

    parse(data) {
        let output = null;

        if (this.options.inputformat) {
            if (moment(data, this.options.inputformat).isValid()) {
                output = moment(data, this.options.inputformat)
                            .format(this.options.outputformat);	
            }
        } else if (moment(data).isValid()) {
            output = moment(data).format(this.options.outputformat);
        }

        return output;
    }
}

module.exports = DateParser