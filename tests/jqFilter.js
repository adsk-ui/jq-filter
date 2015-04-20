define([
    'intern!object',
    'intern/chai!assert',
    'dist/jqFilter'
], function(registerSuite, assert, jqFilter) {
    registerSuite({
        name: 'jqFilter',

        findAndModify: function() {
            assert.strictEqual(hello.greet('Murray'), 'Hello, Murray!',
                'hello.greet should return a greeting for the person named in the first argument');
            assert.strictEqual(hello.greet(), 'Hello, world!',
                'hello.greet with no arguments should return a greeting to "world"');
        }
    });
});
