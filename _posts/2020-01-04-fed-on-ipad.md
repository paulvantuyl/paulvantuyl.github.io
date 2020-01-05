---
layout: post
title: "Ay yo I did some dev from an iPad"
date: 2020-01-04 15:45:00
published: true
category: Post
tags:
  - Front End
  - iPad
  - Saywhut
active: blog
---

At the end of last year, I made the ca-razy choice to switch from a MacBook Pro to an iPad Pro as my personal computer. I've been using a [reMarkable]({% post_url 2017-12-02-my-first-month-or-so-with-my-remarkable.md %}) for over 2 years to do sketching and note taking, so that's one of my iPad's primary uses. Additionally, I also wanted to be able to post updates to my site and make design changes, so I began an interesting research journey.

## Version control

Since I'm using Github Pages to serve up my site, I needed a way to easily manage git on my iPad. There's a number of options available on the App Store, but I decided on [Working Copy](https://workingcopy.app/). The ability to clone a repo to my iPad and then push to the remote source was pretty important, so I opted for the paid version. When I purchased, It was priced at $10; for that price the sheer quantity of features made the purchase an easy decision. I believe that it's currently priced at $15 USD, which is still a very good value.

Initially I found the methods of branching, pulling, and fetching in Working Copy to be utterly confusing after using Github's tools for many years. Yesterday, however, an update was released that has made vast improvements to the UX.

## Compiling Jekyll and SASS

The harder issue to solve was compiling code on my iPad. Apple still isn't allowing for code compiling on their flagship tablet and iPadOS yet (I'm hoping that changes this year), so I started searching for cloud solutions. The problem I kept finding was that nobody wants to support Safari; it really is the modern IE, but since it has crap market share, nobody cares. Installing Chrome doesn't get me anywhere, because it's still a WebKit browser on iPadOS. 

I ended up getting Google's Cloud Console and Cloud Shell to do what I needed, from Safari – but it did take a little work. Cloud Console does offer a really nice iPad app, but it's missing a couple of key features that the browser console has:

- The ability to run a preview/web server on a port you specify
- Cloud Console can switch between a shell and a file browser, or split screen both; browser can show hidden files
- Little QOL items, such as a GUI for uploading files

I initially had problems with the shell – I couldn't get the keyboard to activate. I found that I needed to increase the type size so that the cursor hit area would be big enough to tap (wouldn't activate with the pencil, either). I also had some installation problems with software, but this was due to me not having experience working on a Linux Shell, needing to move my site off of Bower, and general trash in my repo I needed to clean up. Once I got everything sorted, I was able to `gulp sass` and then run Jekyll!

### So, what's the flow?

It's definitely not as smooth as it is from a MacBook if I want to make any design changes, but blog posts are easy peasy. For design updates, I'm creating a branch in Working Copy and pushing it to Github. Then I pull the branch to the Google Cloud Shell, and compile any SASS, run Jekyll to preview, and push to Github. From Github I create & run a merge request. 

### Future possibilities 

I'm currently beta testing [iSH](https://ish.app/), an Alpine Linux Shell for iOS. I haven't quite been able to get it to work with my setup yet; node is still an in-progress issue, and while Jekyll was working with it at one point, it isn't at this moment. I'm hoping that once the wrinkles get ironed out, it can be a fully viable method for my FED workflow locally on my iPad. At some point I may consider an external keyboard, but for now, this is an interesting setup.
