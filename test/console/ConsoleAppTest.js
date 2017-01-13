var assert = require('assert');
import ConsoleApp from '../../src/console/ConsoleApp';

describe('ConsoleApp', function() {
  describe('#getPrompt()', function() {
    it('should return > ', function() {
      assert.equal('> ', ConsoleApp.getPrompt());
    });
  });

  describe('#getHelpText()', function() {
    it('should print some helpful stuff', function() {
      assert.ok(ConsoleApp.getHelpText());
    });
  })
});