var fs = require('fs');
var path = require('path');
var configPath = path.resolve(__dirname,'config.json');
var parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));
exports.storageConfig = parsed;
