---
layout: post
title: "Photoshop, Paths, PDF"
date: 2013-11-10
published: true
---

I had an interesting dillema pop up while working on some Photoshop comps that were going to be delivered as PDF files. The PDF exports contained bar charts which were easiest to create using vector paths due to their design style; and while Illustrator may have been easier to handle such content, the project required Photoshop to be used.

## The Problem

The bar charts were made using vector paths that were staggered vertically and then masked at a specific poing. Opon output to PDF, I found that the bar charts not properly concealed by the mask on the Layer Group. You can see the border of the charts extending outside of their Layer Group in this image:

<img src="/assets/2013/11/mask-error.png" class="img-responsive" alt="The Masking Error" />

An additional, undesired complication was that each individual bar in the graph was being rendered, well, *individually*! You can imagine this really slowed down opening the PDF.

This would have been super simpy to fix in Illustrator, but since Photoshop still can't align points of paths (this project was built using CC), I couldn't simply move all of the bottom points up so that they wouldn't render below. Doing each one individually was unnacceptable, and I was at this point past the deadline on this project.

## The Solution

Simple enough: Convert the Layer Group into a Smart Object. Save as PDF, works great, renders faster. Amazing.

<img src="/assets/2013/11/mask-fixed.png" class="img-responsive" alt="Path Masking Fixed Using Smart Objects" />