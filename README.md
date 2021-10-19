# This is the data for my site

It's automagically transformed into static HTML by [Jekyll](http://jekyllrb.com/ "Jekyll") whenever I push this repo to GitHub.

I've used a CMS or service for as long as I can remember for my site. For what I need, a CMS is generally too much. Plus I'm tired of backing up databases anytime a software upgrade comes along, etc. I learned about Jekyll, and decided I wanted to do the same thing.

To run local:
- Fire up terminal
- Navigate to directory
- Run `gulp` to compile SCSS and bundle JS
- Run `gulp transpile` to just compile scss
- Run `gulp bundle` to just copy JS files from Node plugins to output directory
- Run `bundle exec jekyll serve` to run Jekyll compiler/webserver

## License

The following directories and their contents are Copyright Paul Van Tuyl. You may not reuse anything therein without my permission:

- _posts
- _assets
- _work
- Any of the apple-touch-icon* files
- favicon.ico

I would be flattered if you wanted to repurpose my theme for your own site. Give me some link back love if you do...
