define([
    'intern!object',
    'intern/chai!assert',
    'dist/jqFilter'
], function(registerSuite, assert, jqFilter) {
    registerSuite({
        name: 'jqFilter',

        findAndModify: function() {
            assert.strictEqual(jqFilter.findAndModify(), 0,
                'jqFilter.findAndModify should return 0 when invoked without any params');
        }
    });
});
