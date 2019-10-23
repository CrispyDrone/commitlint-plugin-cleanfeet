module.exports = {
    rules: {
	"footer-format": function(parsed, when, value) {
	    const footers = parsed.footer;
	    if (!footers)
	    {
		return [true];
	    }

	    const new_line = /\n|\r\n|\r(?!\n)/;
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
	    const footers = parsed.footer;
	    if (!footers) 
		return [true];

	    if (!Array.isArray(value))
	    {
		value = [value, /^BREAKING CHANGE: .*$/];
		console.log(value);
	    }

	    const new_line = /\n|\r\n|\r(?!\n)/;
	    const report = [true, []];
	    const max_breaking_change_occurrence_count = value[0];
	    const breaking_change_string = value[1];

	    if (typeof max_breaking_change_occurrence_count !== "number")
	    {
		report[0] = false;
		report[1].push(`footer-max-occurrence-breaking-change''s value is not a number: ${max_breaking_change_occurrence_count}\r\n`);
	    }

	    let breaking_change_regex = "";
	    try
	    {
		breaking_change_regex = RegExp(breaking_change_string);
	    }
	    catch
	    {
		report[0] = false;
		report[1].push(`footer-max-occurrence-breaking-change''s breaking change regex is not valid: ${breaking_change_string}\r\n`);
	    }

	    if (!report[0])
		return report;

	    let breaking_change_match_count = 0;

	    const arr_footer = footers.split(new_line);
	    arr_footer.forEach(function(footer, index) {
		if (breaking_change_regex.test(footer))
		{
		    breaking_change_match_count += 1;
		    if (breaking_change_match_count > max_breaking_change_occurrence_count)
		    {
			report[0] = false;
			report[1].push(`footer "${footer}" is a breaking change, causing the max configured value for breaking changes ${max_breaking_change_occurrence_count} to be exceeded\r\n`);
		    }
		}

	    });

	    if (!report[0])
	    {
		report[1].push(`the total number of breaking changes is ${breaking_change_match_count}, which exceeds the configured amount of ${max_breaking_change_occurrence_count}`);
	    }

	    return report;
	}
    }
};
