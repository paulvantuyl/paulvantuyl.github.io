---
layout: post
title: "Notes: Customizing My Ruby Environment on OS X"
date: 2015-7-5 21:20:00
published: true
category: Development
tags: Ruby
---

This post is as much a note for myself as it is sharing my setup and experiences with others.

It all started with wanting to fork [@jglovier's](https://github.com/jglovier/gifs) gifs repo and roll my own gif library. Once I cloned locally, I needed to compile and run the Jekyll-based project so I could re-theme it... And found that is uses Gems that I don't have installed. Pretty quickly I ended up getting messages like this:

```
/Library/Ruby/Gems/2.0.0/gems/bundler-1.8.3/lib/bundler/spec_set.rb:92:in `block in materialize': Could not find RedCloth-4.2.9 in any of the sources (Bundler::GemNotFound)
	from /Library/Ruby/Gems/2.0.0/gems/bundler-1.8.3/lib/bundler/spec_set.rb:85:in `map!'
  ...
```

Mind you, this is happening even though RedCloth *is* installed. Oh, wait, I'm lazy and installed all of my gems via Sudo.

So, I decided to try and jump into using [rbenv](https://github.com/sstephenson/rbenv) again, since installing Gems using the Sudo command aren't working, and I'm treading on ground I don't *completely* understand (Sudo–Ruby–OS X). I started by installing [Homebrew](https://github.com/Homebrew/homebrew), then ran the Homebrew install instructions on the rbenv repo.

Once that was complete, I used `brew doctor` to find I had some problems and cleaned them up. After that, I dug around on the nets to find what I needed to set up my `~/.bash_profile` properly so that when I open Terminal, it loads up the version of Ruby I have installed with rbenv. Here's what I have working currently:

```
# Fix $PATH for homebrew
homebrew=/usr/local/bin:/usr/local/sbin
export PATH=$homebrew:$PATH

# Initialize rbenv
if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi
```

Next, I installed a version of Ruby using rbenv `rbenv install 2.0.0-p645`, and set it to be my global Ruby setup with `rbenv global 2.0.0-p645`.

I quit and restarted Terminal, and checked the Ruby version with `ruby --version`. Terminal came back with the version I installed with rbenv. If Terminal doesn't say the version of Ruby installed with rbenv, something isn't working right with the `~./bash_profile`.

Notes:

- Your `.bash_profile` must be installed at `~/`, which is the home folder of your account. At the time of writing this, I'm using a MacBookPro10,1 running OS X 10.10.3.
- Some of my reference material was found on [Robert Anderson's](http://blog.zerosharp.com/installing-ruby-with-homebrew-and-rbenv-on-mac-os-x-mountain-lion/) blog.
