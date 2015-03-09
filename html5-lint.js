/*
# Copyright (c) 2013 Mozilla Foundation
#
# Permission is hereby granted, free of charge, to any person obtaining a
# copy of this software and associated documentation files (the "Software"),
# to deal in the Software without restriction, including without limitation
# the rights to use, copy, modify, merge, publish, distribute, sublicense,
# and/or sell copies of the Software, and to permit persons to whom the
# Software is furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
# THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
# DEALINGS IN THE SOFTWARE.
*/

const outputFormats = [
  "", // html
  "xhtml",
  "xml",
  "json",
  "gnu",
  "text" // human readable text
];

const defaults = {
  errorsOnly: false, // level parameter
  output: "json", // out parameter
  service: "https://html5.validator.nu/",
  showSource: false // showsource parameter
};

var extend = require("extend"),
    http = require("http"),
    request = require("request");

var Lint = function Lint(input, options, callback) {
  if (typeof input === 'function' && !options && !callback) {
    callback = input;
    options = extend({}, defaults);
    input = null;
  } else if (typeof options === 'function' && !callback) {
    callback = options;
    options = extend({}, defaults);
  } else {
    options = extend({}, defaults, options);

    if (!callback) {
      callback = function() {};
    }
  }

  var reqOptions = {
    body: input,
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    },
    method: "post",
    uri: options.service,
    qs: {
      out: options.output
    }
  };
  if (options.errorsOnly) {
    reqOptions.qs.level = "error";
  }
  if (options.showSource) {
    reqOptions.qs.showsource = "yes";
  }

  request(reqOptions, function(err, res, body) {
    if (err) {
      callback(err);
      return;
    }

    if (res.statusCode !== 200) {
      var httpError = new Error(http.STATUS_CODES[res.statusCode]);
      httpError.status = res.statusCode;
      return callback(httpError);
    }

    if (options.output === "json") {
      try {
        body = JSON.parse(body);
      } catch (parseError) {
        return callback(parseError);
      }
    }

    callback(null, body);
  });
};

module.exports = Lint;
