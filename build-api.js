#!/bin/bash

# Bash Script for Building AkuruLK JS Client
# Uses uglify-js and clean-css
#  	uglify-js: `sudo npm install uglify-js -g`
#   clean-css: `sudo npm install clean-css -g`


#Clean and create the Dist Directory

#Minify and Mix
echo "Minifying Started"

JS_FILE=hibar.js
JS_MIN_FILE=hibar.min.js

#create files
echo "" > $JS_FILE

echo "Attching JavaScript Files"

#aading template
echo 'var hibar_template="' `tr '\n' ' ' < lib/template.html` '";' >> $JS_FILE

#adding vendor files
cat lib/vendor/jquery.cookie.js >> $JS_FILE
cat lib/vendor/jquery.eventemitter.js >> $JS_FILE

echo "" >> $JS_FILE
#adding home cooked files
cat lib/js/hibar.js >> $JS_FILE

echo "Starting CSS minification"

#adding vendor css
cleancss lib/css/hibar.css >> tmp_css_file
echo 'var hibar_css="' `tr '\n' ' ' < tmp_css_file` '";' >> $JS_FILE

#delete tmp css file
rm tmp_css_file

echo "CSS minification completed"

uglifyjs $JS_FILE > $JS_MIN_FILE

echo "Minifying JS completed"