(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#createPlugin', {
    // This will run before each test in this module.
    setup: function() {
      $.createPlugin('dummyPlugin',{
        init: function(element, options){
          this.$el = $(element),
          this.opt = options;
          return this;
        },
        doSomething: function(){
           this.$el.text('Did something');
           return true;
        }
      });

      this.$elems = $('#qunit-fixture').children().dummyPlugin();
    }
  });

  test('doSomething should return true', function() {
    expect(1);
    strictEqual(this.$elems.dummyPlugin('doSomething'), true, 'doSomething should return true');
  });

}(jQuery));
