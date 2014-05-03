---

layout: post
title: "Password Friction"
date: 2014-5-2
published: true
category: UX Fail

---

We've all dealt with this: Horrifying password creation experiences. I was trying to set up an account with a service that's mandatory for me to use... I followed their instructions for setting up a password, but this error message came up each of the 7 times I tried submitting the form:

> Your password must be 8 to 20 characters and may include upper or lowercase letters (A-Z and a-z), numbers (0-9), spaces, and special characters. You must use at least one letter and one number. You cannot use the same character in four or more consecutive positions (for example, AAAa is valid, but AAAA is not valid) and you cannot use four or more sequential characters, in ascending or descending order, in a row (for example, ABCD and 4321 are not allowed).

The seventh try was when I figured out that it actually does not allow for the number 0.

We all need to work hard on making error messages that tell the user _what the actual problem is_. Not instructions that are even more verbose and require users to create a bulleted list that they can check off to find the exact cause of the problem on their own. If this was a product that wasn't mandatory for me, I would have left as soon as I saw that error message. 
