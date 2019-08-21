var through = require("through2");
var PluginError = require("plugin-error");
var Transpiler = require("sactory/transpiler");

module.exports = function(options){

	return through.obj((file, enc, cb) => {
		if(!file.isNull()) {
			if(file.isBuffer()) {
				try {
					file.contents = Buffer.from(new Transpiler(options).transpile(file.contents.toString()).source.all);
				} catch(e) {
					throw new PluginError("gulp-sactory", e);
				}
			} else if(file.isStream()) {
				throw new PluginError("gulp-sactory", "Streams are not supported.");
			}
		}
		cb(null, file);
	});

};
