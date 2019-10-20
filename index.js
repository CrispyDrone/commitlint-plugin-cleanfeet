module.exports = {
    rules: {
        "footer-format": function(parsed, when, value) {
          // rule implementation ...
	  console.log('footer-format:', parsed, when, value);
        },
	"footer-max-occurrence-breaking-change": function(parsed, when, value) {
          // rule implementation ...
	  console.log('footer-max-occurrence-breaking-change', parsed, when, value);
	}
    }
};
