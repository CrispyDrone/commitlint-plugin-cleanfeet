var footer_format = require('./src/footer-format.js');
var footer_max_occurrence_breaking_change = require('./src/footer-max-occurrence-breaking-change.js');

module.exports = {
    rules: {
	"footer-format": footer_format,
	"footer-max-occurrence-breaking-change": footer_max_occurrence_breaking_change
    }
};
