var assert = require('assert');
import ConsoleApp from '../../src/console/ConsoleApp';

describe('ConsoleApp', () => {
  describe('#getPrompt()', () => {
    it('should return > ', () => {
      assert.equal('> ', ConsoleApp.getPrompt());
    });
  });

  describe('#getHelpText()', () => {
    it('should print some helpful stuff', () => {
      assert.ok(ConsoleApp.getHelpText());
    });
  });

  describe('#parse()', () => {
    it('should parse add', () => {
      var parsed = ConsoleApp.parse('add "title" "author"');
      assert.equal('add', parsed.command);
      assert.deepEqual(['"title"', '"author"'], parsed.args);
    });

    it('should parse read', () => {
      var parsed = ConsoleApp.parse('read "title"');
      assert.equal('read', parsed.command);
      assert.deepEqual(['"title"'], parsed.args);
    });

    it('should parse show all', () => {
      var parsed = ConsoleApp.parse('show all');
      assert.equal('show all', parsed.command);
      assert.deepEqual([], parsed.args);
    });

    it('should parse show unread', () => {
      var parsed = ConsoleApp.parse('show unread');
      assert.equal('show unread', parsed.command);
      assert.deepEqual([], parsed.args);
    });

    it('should parse show all by', () => {
      var parsed = ConsoleApp.parse('show all by "author"');
      assert.equal('show all by', parsed.command);
      assert.deepEqual(['"author"'], parsed.args);
    });

    it('should parse show unread by', () => {
      var parsed = ConsoleApp.parse('show unread by "author"');
      assert.equal('show unread by', parsed.command);
      assert.deepEqual(['"author"'], parsed.args);
    });

    it('should parse undo', () => {
      var parsed = ConsoleApp.parse('undo');
      assert.equal('undo', parsed.command);
      assert.deepEqual([], parsed.args);
    });

    it('should parse quit', () => {
      var parsed = ConsoleApp.parse('quit');
      assert.equal('quit', parsed.command);
      assert.deepEqual([], parsed.args);
    });

    it('should not parse a random command', () => {
      assert.throws(() => {
        ConsoleApp.parse('random command');
      });
    });
  });
});