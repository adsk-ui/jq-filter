define([
    'intern!object',
    'intern/chai!assert',
    'dist/jqFilter',
    'cheerio'
], function(registerSuite, assert, jqFilter, cheerio) {
    registerSuite({
        name: 'jqFilter',

        findAndModify: function() {
            assert.strictEqual(jqFilter.findAndModify(), 0,
                'jqFilter.findAndModify should return 0 when invoked without any params');
        },

        findAndModify: function() {
            try {
                $;
            } catch (exception) {
                $ = cheerio.load('<div id="list"><div data-search="foo">foo</div><div data-search="bar">bar</div></div>');
                $.html();
            }

            var $list = $('#list div'),
                searchRegex = jqFilter.generateRegex(['foo']),
                conditions = [{
                    'key': 'search',
                    'val': searchRegex
                }],
                results = jqFilter.findAndModify({
                    '$selector': $list,
                    'conditions': conditions,
                    'foundCallback': function($elem) {
                        $elem.css('display: block;');
                        $elem.html(jqFilter.highlight($elem.data('search'), ['foo', 'bar']));
                    },
                    'notFoundCallback': function($elem) {
                        $elem.css('display: none;');
                    }
                });

            assert.strictEqual(results, 1,
                'jqFilter.findAndModify should return 1 result when searching for foo in a list of foo and bar');
        },

        generateRegex: function() {
            assert.strictEqual(jqFilter.generateRegex().toString(), /(?:)/gi.toString(),
                'jqFilter.generateRegex should return /(?:)/gi when invoked without any params');
        },

        generateRegex: function() {
            assert.strictEqual(jqFilter.generateRegex(['foo', 'bar']).toString(), /(?=.*foo)(?=.*bar)/gi.toString(),
                "jqFilter.generateRegex should return /(?=.*foo)(?=.*bar)/gi when invoked with ['foo', 'bar']");
        },

        highlight: function() {
            assert.strictEqual(jqFilter.highlight(), undefined,
                "jqFilter.highlight should return undefined when invoked without any params");
        },

        highlight: function() {
            assert.strictEqual(jqFilter.highlight('foo bar baz', ['foo', 'baz']), '<span class="highlight" style="background-color: yellow;">foo</span> bar <span class="highlight" style="background-color: yellow;">baz</span>',
                "jqFilter.highlight should highlight foo and baz when given foo bar baz");
        }
    });
});
