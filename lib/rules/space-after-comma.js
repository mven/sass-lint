'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'space-after-comma',
  'defaults': {
    'include': true
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('operator', function (operator, i, parent) {
      var next;

      if (operator.content === ',') {
        next = parent.content[i + 1];
        if (next.is('space')) {
          if (!parser.options.include) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': next.start.line,
              'column': next.start.column,
              'message': 'Commas should not be followed by a space',
              'severity': parser.severity
            });
          }
        }
        else {
          if (parser.options.include) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': operator.start.line,
              'column': operator.start.column,
              'message': 'Commas should be followed by a space',
              'severity': parser.severity
            });
          }
        }
      }
    });

    return result;
  }
};
