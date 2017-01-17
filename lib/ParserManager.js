'use strict';

const fs = require('fs');
const path = require('path');
const BbPromise = require('bluebird');
const fse = BbPromise.promisifyAll(require('fs-extra'));

class ParserManager {
	constructor(options) {
		this.options = this.setOptions(options);

		this.parsers = {};

        this.loadCoreParsers();
	}

    setOptions(options) {
		this.options = (typeof options === 'object') ? options : undefined;
        if (this.options && this.options.type) {
            //if (typeof this.parsers[this.parsers.type].setOptions === 'function') {
           this.parsers[this.options.type].setOptions(this.options);
        }
    }

	addParser(Parser) {
        try {
    	    const parserInstance = new Parser();

        	let parserType = parserInstance.type ? parserInstance.type : null;

            if (!parserType) {
                return;
            }

            this.parsers[parserType] = parserInstance;

            return true;
        } catch(err) {
            err.message = "Adding parser threw exception (" + err.message + ")" 
            throw err;
        }
    }

	readFileSync(filePath) {
	    let fileData;

	    fileData = fse.readFileSync(filePath);

	    if (filePath.endsWith('.json')) {
    		fileData = JSON.parse(fileData);
    	} else {
        	fileData = fileData.toString().trim();
    	}

    	return fileData;
  	}

	loadParsers(parsers) {
        parsers.forEach((parser) => {
            const Parser = require(parser); // eslint-disable-line global-require
            this.addParser(Parser);
        });
    }

    loadCoreParsers() {
    	const parsersDirPath = path.join(__dirname, './parsers');

	    const coreParsers = this
            .readFileSync(path.join(parsersDirPath, 'Parsers.json')).parsers
            .map((coreParsersPath) => path.join(parsersDirPath, coreParsersPath));

        this.loadParsers(coreParsers);
    }

    getParsers() {
        return this.parsers;
    }

    parse(data) {
    	if (this.parsers[this.options.type] &&
	        typeof this.parsers[this.options.type].parse === 'function') {

            return this.parsers[this.options.type].parse(data)
	    } else {
            if (this.parsers.default &&
                typeof this.parsers[this.parsers.default].parse === 'function') {

                return this.parsers.default.parse(data)
            } else {
                return data;
            }
	    }
    }
}

module.exports = ParserManager;
