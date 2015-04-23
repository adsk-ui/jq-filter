// define([
//     'intern!object',
//     'intern/chai!assert',
//     'dist/jqFilter',
//     'cheerio'
//     // 'jquery'
// ], function(registerSuite, assert, jqFilter, cheerio) {
// ], function(registerSuite, assert, jqFilter, $) {
// ], function(registerSuite, assert, jqFilter) {

define(function(require) {
    var registerSuite = require('intern!object'),
        assert = require('intern/chai!assert'),
        jqFilter = require('dist/jqFilter');

    registerSuite({
        name: 'jqFilter',

        'Test findAndModify': function() {
            assert.strictEqual(jqFilter.findAndModify(), 0,
                'jqFilter.findAndModify should return 0 when invoked without any params');
        },

        'Test findAndModify': function() {
            // if (typeof window === 'undefined') {
            //     this.skip('Browser-only test');
            // }
            // // try {
            // //     $;
            // // } catch (exception) {
            // // }
            console.log('HERE');
            if (typeof window === 'undefined') {
                // this.skip('Browser-only test');
                console.log("WINDOW undefined");
                var dfd = this.async(5000);
                // var cheerio = require('cheerio');
                require(['cheerio'], function(cheerio) {
                    console.log('blah');
                    $ = cheerio.load('<div id="list"><div data-search="foo">foo</div><div data-search="bar">bar</div></div>');
                    // $ = require('jquery');
                    $.html();

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

                    dfd.resolve();
                });
            } else if (typeof $ === 'undefined') {
                console.log("$ undefined");
                var dfd = this.async(5000);
                // var cheerio = require('cheerio');
                require(['jquery'], function(jquery) {
                // require(['intern/order!../../bower_components/jquery/dist/jquery.min.js'], function(jquery) {
                    console.log('blah');
                    // $ = cheerio.load('<div id="list"><div data-search="foo">foo</div><div data-search="bar">bar</div></div>');
                    // $ = require('jquery');
                    // $.html();
                    window.$ = jquery;

                    // $('<div id="list"><div data-search="foo">foo</div><div data-search="bar">bar</div></div>');

                    var $list = $('<div id="list"><div data-search="foo">foo</div><div data-search="bar">bar</div></div>').find('div'),
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

                    dfd.resolve();
                });
            } else {
                console.log('NOT');
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
            }
        },

        'Test generateRegex': function() {
            assert.strictEqual(jqFilter.generateRegex().toString(), /(?:)/gi.toString(),
                'jqFilter.generateRegex should return /(?:)/gi when invoked without any params');
        },

        'Test generateRegex': function() {
            assert.strictEqual(jqFilter.generateRegex(['foo', 'bar']).toString(), /(?=.*foo)(?=.*bar)/gi.toString(),
                "jqFilter.generateRegex should return /(?=.*foo)(?=.*bar)/gi when invoked with ['foo', 'bar']");
        },

        'Test highlight': function() {
            assert.strictEqual(jqFilter.highlight(), undefined,
                "jqFilter.highlight should return undefined when invoked without any params");
        },

        'Test highlight': function() {
            assert.strictEqual(jqFilter.highlight('foo bar baz', ['foo', 'baz']), '<span class="highlight" style="background-color: yellow;">foo</span> bar <span class="highlight" style="background-color: yellow;">baz</span>',
                "jqFilter.highlight should highlight foo and baz when given foo bar baz");
        }
    });
});
