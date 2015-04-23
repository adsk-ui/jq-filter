// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
// These default settings work OK for most people. The options that *must* be changed below are the
// packages, suites, excludeInstrumentation, and (if you want functional tests) functionalSuites.
define({
    // The port on which the instrumenting proxy will listen
    proxyPort: 9000,

    // A fully qualified URL to the Intern proxy
    proxyUrl: 'http://localhost:9000/',

    // Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
    // specified browser environments in the `environments` array below as well. See
    // https://code.google.com/p/selenium/wiki/DesiredCapabilities for standard Selenium capabilities and
    // https://saucelabs.com/docs/additional-config#desired-capabilities for Sauce Labs capabilities.
    // Note that the `build` capability will be filled in with the current commit ID from the Travis CI environment
    // automatically
    capabilities: {
        'selenium-version': '2.41.0'
    },

    // Browsers to run integration testing against. Note that version numbers must be strings if used with Sauce
    // OnDemand. Options that will be permutated are browserName, version, platform, and platformVersion; any other
    // capabilities options specified for an environment will be copied as-is
    environments: [
        // { browserName: 'internet explorer', version: '11', platform: 'Windows 8.1' },
        // { browserName: 'internet explorer', version: '10', platform: 'Windows 8' },
        // { browserName: 'internet explorer', version: '9', platform: 'Windows 7' },
        // { browserName: 'firefox', version: '28', platform: [ 'OS X 10.9', 'Windows 7', 'Linux' ] },
        // { browserName: 'chrome', version: '34', platform: [ 'OS X 10.9', 'Windows 7', 'Linux' ] },
        {
            browserName: 'chrome'
        },
        // { browserName: 'safari', version: '6', platform: 'OS X 10.8' },
        // { browserName: 'safari', version: '7', platform: 'OS X 10.9' }
    ],
    // environments: [ { browserName: 'phantomjs' } ],

    // Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
    maxConcurrency: 3,

    // Name of the tunnel class to use for WebDriver tests
    // tunnel: 'SauceLabsTunnel',
    tunnel: 'NullTunnel',

    // The desired AMD loader to use when running unit tests (client.html/client.js). Omit to use the default Dojo
    // loader
    // useLoader: {
    //     'host-node': 'dojo/dojo',
    //     'host-browser': 'node_modules/dojo/dojo.js'
    // },
    useLoader: {
        'host-node': 'requirejs', // host-node specifies the loader to use in Node.js. This should be a Node.js module ID.
        'host-browser': '../../bower_components/requirejs/require.js' // host-browser specifies the loader to use in browsers. This should be a URL to a script file.
    },

    // Configuration options for the module loader; any AMD configuration options supported by the specified AMD loader
    // can be used here
    loader: {
        paths: {
            baseUrl: '.',
            // the left side is the module ID,
            // the right side is the path to
            // the jQuery file, relative to baseUrl.
            // Also, the path should NOT include
            // the '.js' file extension. This example
            // is using jQuery 1.9.0 located at
            // js/lib/jquery-1.9.0.js, relative to
            // the HTML page.
            jquery: "bower_components/jquery/dist/jquery.min"
        }
    },

    // Non-functional test suite(s) to run in each browser
    // suites: [ /* 'myPackage/tests/foo', 'myPackage/tests/bar' */ ],
    suites: ['tests/unit/index'],

    // Functional test suite(s) to run in each browser once non-functional tests are completed
    functionalSuites: ['tests/functional/index'],

    // A regular expression matching URLs to files that should not be included in code coverage analysis
    excludeInstrumentation: /^(?:tests|node_modules|dist\/lib|bower_components)\//
});
