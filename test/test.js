var assert = require('assert');
import ConsoleApp from '../src/console/ConsoleApp';

describe('ConsoleApp', function() {
  describe('#getPrompt()', function() {
    it('should return > ', function() {
      assert.equal('> ', ConsoleApp.getPrompt());
    });
  });
});