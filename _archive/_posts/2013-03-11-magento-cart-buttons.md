---
layout: post
title: "Magento Cart Buttons"
date: 2013-03-11 12:00:00
published: true
category: Post
tags: Magento
active: blog
---

Sometimes I find myself needing to modify the default behavior of Magento's *Add to Cart* button. If it's a Bundled Product, for example, the default Cart button in the Grid and List views will throw an error at the user if the bundle has required options<sup>1</sup>. It makes more sense for the button to say something like *Configure Now*, and take the user to the product page.

Below are a couple of Gists of mine that have various ways to modify the front-end of a Magento site's Add to Cart buttons. Of course, always back up your theme files before modifying them \(or use Git\). And never modify core unless you're prepared to deal with it.

### Conditional Bundle Button ###

Use this in <code>list.phtml</code> to change the button based on whether it's a Simple or Bundle Product. This could also be expanded to cover Configurable Products as well.

{% gist 5147883 %}

### CMS Block Button ###

This one is super custom - I used it in <code>addtocart.phtml</code> to replace the Add to Cart button with a link based on input from a URL Product Attribute.

{% gist 5137358 %}

<small><sup>1</sup>Magento 1.6, Blank theme. Things may be different with other themes and versions.</small>
