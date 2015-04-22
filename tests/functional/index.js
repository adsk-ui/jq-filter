define([
    'intern!object',
    'intern/chai!assert',
    'require',
    'dist/jqFilter'
], function(registerSuite, assert, require, jqFilter) {

    registerSuite({
        name: 'index',

        'one': function() {
            return this.remote
                .get(require.toUrl('./index.html'))
                .setFindTimeout(5000)
                .findById('list')
                .findAllByTagName('div')
                .then(function(elems) {
                    assert.strictEqual(elems.length, 10);
                })
                .end();
        },

        'two': function() {
            return this.remote
                .get(require.toUrl('./index.html'))
                .findById('searchBox')
                .click()
                .type('test')
                .end()
                .findById('list')
                .findAllByTagName('div')
                .isDisplayed()
                .then(function(elems) {
                    var count = 0,
                        i = 0;
                    for (; i < elems.length; i++) {
                        if (elems[i] === true) {
                            count++;
                        }
                    }
                    assert.strictEqual(count, 0);
                })
                .end()
        },

        'three': function() {
            return this.remote
                .get(require.toUrl('./index.html'))
                .findById('searchBox')
                .click()
                .type('0')
                .end()
                .findById('list')
                .findAllByTagName('div')
                .isDisplayed()
                .then(function(elems) {
                    var count = 0,
                        i = 0;
                    for (; i < elems.length; i++) {
                        if (elems[i] === true) {
                            count++;
                        }
                    }
                    assert.strictEqual(count, 1);
                })
                .end()
        }

    });
});
