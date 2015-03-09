html5-lint - HTML Validation using Mozilla's HTML5 Validator instance
==========

This is a node.js and Python front-end to the Mozilla Labs' HTML Validator Web Service, located at https://validator.mozillalabs.com/.  It was setup in order to be used in the build system of various Mozilla projects, without spamming the main validator (i.e., http://validator.nu) --see https://bugzilla.mozilla.org/show_bug.cgi?id=763804.  You can read more about the validator at https://validator.mozillalabs.com/.

You can and should use it in your own Mozilla project's build system in order to automatically check your HTML for errors.

Usage - node.js
-------

The `html5-lint` module can be installed via npm:

`$ npm install html5-lint`

Once installed, it can be used like so:

```javascript
var fs = require( 'fs' ),
    html5Lint = require( 'html5-lint' );

fs.readFile( 'index.html', 'utf8', function( err, html ) {
  if ( err )
    throw err;

  html5Lint( html, function( err, results ) {
    results.messages.forEach( function( msg ) {
      var type = msg.type, // error or warning
          message = msg.message;

      console.log( "HTML5 Lint [%s]: %s", type, message );
    });
  });
});
````

##### gulp.js

If you are using the [gulp.js build system](http://gulpjs.com/) you may wish to use the `gulp-html5-lint` plugin. Documentation is available at https://www.npmjs.com/package/gulp-html5-lint.

Usage - Python
-------

`html5check.py -h file.html`

You can test the parser with the supplied files:

```bash
$ ./html5check.py -h good.html
The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0 (subject to the utter previewness of this service).
```

```bash
$ ./html5check.py bad.html
Error: Start tag seen without seeing a doctype first. Expected
```

Options
--------

* -h : force text/html
* -x : force application/xhtml+xml
* -g : GNU output
* -e : errors only (no info or warnings)
* --encoding=foo : declare encoding foo
* --service=url  : the address of the HTML5 validator (defautls to https://validator.mozillalabs.com/)

TODO
--------

* error/warning filtering based on types, categories of errors/warnings
