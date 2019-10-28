module.exports = function(parsed, when, value) {
  const footers = parsed.footer;
  if (!footers) 
    return [true];

  if (typeof value !== 'object' || value === null)
    return [false, 'value has to be an object and can not be null']

  if (typeof value.max === 'undefined')
  {
    value.max = 1;
  }

  if (typeof value.regex === 'undefined')
  {
    value.regex = '^BREAKING CHANGE: .+$';
  }

  const new_line = /\n|\r\n|\r(?!\n)/;
  const report = [true, []];

  const max_breaking_change_occurrence_count = value.max;
  const breaking_change_string = value.regex;

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
  catch (e)
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
