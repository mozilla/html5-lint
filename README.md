html5-lint
==========

HTML Validation using Mozilla's HTML5 Validator instance.  This is a modified Python file for using the Mozilla Labs' HTML Validator Web Service, located at https://validator.mozillalabs.com/.  It was setup in order to be used in the build system of various Mozilla projects, without spamming the main validator (i.e., http://validator.nu) --see https://bugzilla.mozilla.org/show_bug.cgi?id=763804.  You can read more about the validator at https://validator.mozillalabs.com/.

You can and should use it in your own Mozilla project's build system in order to automatically check your HTML for errors.

Usage
-------

`html5check.py -h file.html`

You can test the parser with the supplied files:

```bash
$ ./html5check.py -h good.html
The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0 (subject to the utter previewness of this service).
```

```bash
$ ./html5check.py bad.html 
Error: Start tag seen without seeing a doctype first. Expected “<!DOCTYPE html>”.
From line 1, column 1; to line 1, column 6

Error: Element “head” is missing a required instance of child element “title”.
From line 3, column 3; to line 3, column 9

Error: An “body” start tag seen but an element of the same type was already open.
From line 5, column 3; to line 5, column 8

Warning: The character encoding of the document was not declared.

There were errors. (Tried in the text/html mode.)
$ ./html5check.py -h good.html
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

* node.js client to go with python
* error/warning filtering based on types, categories of errors/warnings
