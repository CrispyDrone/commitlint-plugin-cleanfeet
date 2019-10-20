module.exports = {
    rules: {
	"footer-format": function(parsed, when, value) {
	    const footers = parsed.footer;
	    if (!footers)
	    {
		return [true];
	    }

	    const new_line = /\n|\r\n|\r/;
	    const negated = when === 'never';
	    const report = [true, []];
	    const arr_footer = footers.split(new_line);
	    const arr_regexes = value.map(v => RegExp(v));
	    const number_of_regexes = arr_regexes.length;

	    arr_footer.forEach(function(footer, index) {
	        let has_match = false;
	        for (let i = 0; i < number_of_regexes; i++)
	        {
	            if (arr_regexes[i].test(footer))
		    {
	        	has_match = true;
	        	break;
		    }
	        }

		if (report[0])
		    report[0] = negated ? !has_match : has_match;

		if (has_match === negated)
		    report[1].push(`footer "${footer}" ${negated ? 'matches' : 'does not match'} any of the configured regexes:\r\n${arr_regexes.map(regex => `    ${regex}`).join('\r\n')}\r\n`);
	    });

	    return report;
	},
	"footer-max-occurrence-breaking-change": function(parsed, when, value) {
	    return [true];
	}
    }
};
