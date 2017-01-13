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
      assert.equal(parsed.command, 'add');
      assert.deepEqual(parsed.args, ['title', 'author']);
    });

    it('should parse read', () => {
      var parsed = ConsoleApp.parse('read "title"');
      assert.equal(parsed.command, 'read');
      assert.deepEqual(parsed.args, ['title']);
    });

    it('should parse show all', () => {
      var parsed = ConsoleApp.parse('show all');
      assert.equal(parsed.command, 'show all');
      assert.deepEqual(parsed.args, []);
    });

    it('should parse show unread', () => {
      var parsed = ConsoleApp.parse('show unread');
      assert.equal(parsed.command, 'show unread');
      assert.deepEqual(parsed.args, []);
    });

    it('should parse show all by', () => {
      var parsed = ConsoleApp.parse('show all by "author"');
      assert.equal(parsed.command, 'show all by');
      assert.deepEqual(parsed.args, ['author']);
    });

    it('should parse show unread by', () => {
      var parsed = ConsoleApp.parse('show unread by "author"');
      assert.equal(parsed.command, 'show unread by');
      assert.deepEqual(parsed.args, ['author']);
    });

    it('should parse undo', () => {
      var parsed = ConsoleApp.parse('undo');
      assert.equal(parsed.command, 'undo');
      assert.deepEqual(parsed.args, []);
    });

    it('should parse quit', () => {
      var parsed = ConsoleApp.parse('quit');
      assert.equal(parsed.command, 'quit');
      assert.deepEqual(parsed.args, []);
    });

    it('should not parse a random command', () => {
      assert.throws(() => {
        ConsoleApp.parse('random command');
      });
    });
  });
});