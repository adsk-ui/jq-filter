define(['exports'], function (exports) {
    'use strict';

    exports.__esModule = true;
    var findAndModify = function findAndModify(options) {
        var results = 0;

        options = options || {};
        if (!options.$selector) {
            return results;
        }
        options.conditions = options.conditions || [];
        options.foundCallback = options.foundCallback || $.noop;
        options.notFoundCallback = options.notFoundCallback || $.noop;

        options.$selector.each(function () {
            var $elem = $(this),
                found = true,
                i = 0,
                len = options.conditions.length;
            for (; i < len; i++) {
                if (options.conditions[i]['val'].test($elem.data(options.conditions[i]['key'])) === false) {
                    found = false;
                    break;
                }
            }
            if (found) {
                options.foundCallback($elem);
                results++;
            } else {
                options.notFoundCallback($elem);
            }
        });

        return results;
    },
        generateRegex = function generateRegex(strings) {
        var regexString = '',
            i = 0,
            len;

        if (strings && strings.length && strings.length > 0) {
            len = strings.length;
            for (; i < len; i++) {
                regexString += '(?=.*' + _sanitize(strings[i]) + ')';
            }
        }

        return new RegExp(regexString, 'ig');
    },
        highlight = function highlight(text, keys) {
        var regexString = '',
            i = 0,
            len;

        if (!text || !keys) {
            return undefined;
        }

        if (keys && keys.length && keys.length > 0) {
            len = keys.length;
            for (; i < len; i++) {
                regexString += '(' + keys[i] + ')';
                if (i < len - 1) {
                    regexString += '|';
                }
            }
        }

        return new String(text).replace(new RegExp(regexString, 'ig'), '<span class="highlight" style="background-color: yellow;">$&</span>');
    },
        removeHighlight = function removeHighlight($currentText, originalText) {
        $currentText.html(originalText);
    },
        _sanitize = function _sanitize(string) {
        return string.replace(/[\.\*\\\|\(\)\[\]\?\$\^\+]+/, '\\$');
    };

    exports.findAndModify = findAndModify;
    exports.generateRegex = generateRegex;
    exports.highlight = highlight;
    exports.removeHighlight = removeHighlight;
});