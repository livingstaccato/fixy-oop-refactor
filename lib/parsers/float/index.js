'use strict';

const type = 'float';

const defaultPrecision = 2;

const BaseParser = require('../../BaseParser');

const _ = require('lodash');

class FloatParser extends BaseParser {
    constructor(options) {
        super(options);
        this.setType(type);
    }

    parse(data) {
        let output = null;

        if (this.options.percision) {
            this.options.precision = this.options.percision;
            delete this.options.percision;
        }

        let precision = (parseInt(this.options.precision) >= 0) ?
                            this.options.precision :
                            defaultPrecision;

        let symbol = (this.options.symbol && this.options.format === "csv") ?
                         this.options.symbol : "";

        if (_.includes(data, '.')) {
                output = symbol + parseFloat(data).toFixed(precision);
            } else {
                output = symbol + parseFloat(data
                                          .splice(this.options.width -
                                                  precision, 0, '.'))
                                      .toFixed(precision);
        }

        return output;
    }
}

module.exports = FloatParser