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
            $.createPlugin('dummyPlugin', {
                init: function(element, options) {
                    this.$el = $(element),
                    this.opt = options;
                    return this;
                },
                doSomething: function() {
                    this.$el.text('Did something');
                    return true;
                }
            });

            this.$elems = $('#qunit-fixture').children().dummyPlugin();
        }
    });

    test('an instance should be saved in jquery data of each element', function() {
        expect(3);

        this.$elems.each(function(i, el) {
            var instance = $(el).data('dummyPlugin');
            if (instance && typeof instance.doSomething === 'function') {
                ok(true, 'element has plugin instance');
            }

        });
    });

    test('The method "doSomething" should be callable and return true', function() {
        expect(1);
        var result = this.$elems.dummyPlugin('doSomething');
        strictEqual(result, true, 'doSomething returns true');
    });

    test('The method "doSomething" should set text on the first element to "Did something"', function() {
        expect(1);
        var correct = false;

        this.$elems.dummyPlugin('doSomething');

        this.$elems.each(function(i, el) {
            var t = $(el).text();

            if (i === 0 && t === 'Did something') {
                correct = true;
            }
            if (i > 0 && t === 'Did something') {
                correct = false;
            }
        });

        strictEqual(correct, true, 'Text is set on first element');
    });





}(jQuery));
