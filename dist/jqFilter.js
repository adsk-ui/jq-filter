define(function(require) {
    var findAndModify = function(options) {
            var results = 0;

            options = options || {};
            if (!options.$selector) {
                return results;
            }
            options.conditions = options.conditions || [];
            options.foundCallback = options.foundCallback || $.noop;
            options.notFoundCallback = options.notFoundCallback || $.noop;

            options.$selector.each(function() {
                var $elem = $(this),
                    found = true,
                    i = 0;
                for (; i < options.conditions.length; i++) {
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

        generateRegex = function(strings) {
            var regexString = '',
                i = 0;

            for (; i < strings.length; i++) {
                regexString += '(?=.*' + strings[i] + ')';
            }

            return new RegExp(regexString, 'ig');
        },

        highlight = function(text, keys) {
            var regexString = '',
                i = 0;

            for (; i < keys.length; i++) {
                regexString += '(' + keys[i] + ')';
                if (i < keys.length - 1) {
                    regexString += '|';
                }
            }

            return (new String(text)).replace(new RegExp(regexString, 'ig'), '<span class="highlight" style="background-color: yellow;">$&</span>');
        };

    return {
        findAndModify: findAndModify,
        generateRegex: generateRegex,
        highlight: highlight
    }
});
