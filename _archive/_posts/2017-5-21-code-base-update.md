---
layout: post
title: "Codebase update"
date: 2017-5-21 17:30:00
published: true
category: Post
tags:
  - Design
  - Development
active: blog
---

For a long time, my site was built using Bootstrap (1 or 2, can't remember) and Jekyll/Github Pages. Well, I finally got around to overhauling my codebase to lean things up – and switched to [Foundation](http://foundation.zurb.com)!

I've long appreciated the wireframe *feel* of Foundation. As a front-end framework, it does have opinions on interaction patterns and methods, but it is much less opinionated in terms of visual appearance. That *generally* means it's easier to style it how you want.

One funny thing I found though, is that the color of links is tied to the <code>$primary-color</code> SASS variable. I wanted to have a little more contrast in my link color than the Primary provides. I was having problems with overrides until I remembered to include my custom classes **after** all of the Foundation file includes. Duh.

Also, I made some tweaks that I've been meaning to make to typography and changed up the navbar color to be black. Because minimalism and Johnny Cash's *Man in Black* and all that. Still to-do: Fix some of my portfolio pages. Lots of experimenting in there.
