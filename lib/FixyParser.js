'use strict';

class FixyParser {
	constructor(options) {
		this.options = this.setOptions(options);

		this.parsers = {};
	}

    setOptions(options) {
		this.options = (typeof options === 'object') ? options : null;
    }

	addParser(Parser) {
    	const parserInstance = new Parser();

    	let parserType = parserInstance.type ? parserInstance.type : null;

    	if (!parserType) {
			return;
    	}

    	this.parsers[parserType] = parserInstance.parse;
    }


    loadCoreParsers() {
    	const pluginsDirectoryPath = path.join(__dirname, './parsers');

	    const corePlugins = this.serverless.utils
            .readFileSync(path.join(pluginsDirectoryPath, 'Plugins.json')).plugins
            .map((corePluginPath) => path.join(pluginsDirectoryPath, corePluginPath));

        this.loadPlugins(corePlugins);
    }

    parse(data) {
    	console.log(this.options);
    	if (this.parsers[this.options.type] &&
	        typeof this.parsers[this.options.type] === 'function') {

			console.log('function');
	    } else if (this.parsers.default) {
	    } else {
    		return data;
	    }
    }
}

module.exports = FixyParser;
