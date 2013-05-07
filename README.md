grunt-tape-measure
==================
Bulk resize files to sizes

Getting Started
==================

This plugin requires Grunt ~0.4.0

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```js
npm install tape-measure
```

Once installed, just add this to your Gruntfile.js

```js
grunt.loadNpmTasks('tape-measure');
```

Configuration
==================
Tape-measure accepts options on how to ouptut your images. In grunt.initConfig simply edit the following to taste:

```
  'tape-measure': {
    'options': {
      'srcDir':'./sources/',
      'excluded': ['03.jpg'],
      'sizes': [640, 768, 1024, 2048],
      'quality': 0.8,
      'progressive': false,
      'format':'jpg',
      'glob':'**/*.jpg'
    }
  }
```

`srcDir` is a directory of images you wish to resize.

`excluded` is an array of any files that you wish to be skipped.

`sizes` is an array of sizes you wish to resize to. These will be the directory names created.

`quality` is the quality of the outputted image. (0-1)

`progressive` is the standard ImageMagick interlace setting

`format` is the outputted string

`glob` is the patter for selecting files in the srcDir