<article class="markdown-body entry-content" itemprop="mainContentOfPage">

# [](#emulsion---a-photo-grid-for-film-lovers-and-slackers)Emulsion - _A Photo Grid for Film Lovers and Slackers_

## [](#introduction)Introduction

Emulsion is a photography-focused web application built from the ground up using "Vanilla JS". Users learn and visualize different photographic films through a curated assortment from Flickr's API. Extra educational text is provided, highlighting unique characteristics of each film.

While the basic idea of using "Vanilla JS" to fetch photos and display them in a grid/lightbox remains the same, the product concept was important to me - since film photography (and subsequently Flickr) were a huge part of my life.

We live in a fast paced world - we engineers blitz forward, often forgetting to slow down... missing countless moments. Film photography taught me just that. Given a finite amount of "shots" I could take - each one had to be calculated, impactful, and thoughtful. For this reason, the user is guided into a state of being unable to "go back" to the previous type of film viewed. Just like shooting film, once you advance to the next frame, you **generally** cannot rewind and see the shot you just took.

I hope the app proves to be meaningful - showing everyone that film photography can be a beautiful thing!

[![Screenshot of Emulsion](https://camo.githubusercontent.com/414d77153e5c48713dde68d0625a0a6d3daf8dd3/687474703a2f2f692e696d6775722e636f6d2f424352446741642e706e67)](https://camo.githubusercontent.com/414d77153e5c48713dde68d0625a0a6d3daf8dd3/687474703a2f2f692e696d6775722e636f6d2f424352446741642e706e67)

## [](#documentation)Documentation

### [](#tech-overview)Tech Overview

_While Emulsion doesn't rely on external libraries or frameworks, it leverages Babel for ES6._

*   Gulp
*   Babel
*   ESLint
*   SCSS

## [](#application-design)Application Design

### [](#overview)Overview

Originally conceived with a MVC (Model-View-Controller) pattern in mind, this idea soon fell out of favor. With limited time, I needed to highlight my major needs within my code:

*   Extensible (modular)
*   Maintainable (documentation helps here)

With these key features in mind, I shifted my attention to use component-based architecture. Inspired by my personal passion for exploring highly functional languages and patterns - I believe state management should be easy! Emulsion's main `app.js` is where most of the magic happens - it's got a 'global' event listener, waiting for custom `stateChange` events. These events bubble up from anywhere else and carry a payload. Based on its action type, we can update state and UI simultaneously from the top-level app.

**Here are some key features that stand out in my code:**

*   Application state is referred to as the "single source of truth"
    *   This makes it easier to reason about, as opposed to juggling stores and various models.
*   Minimal side effects, use pure functions
*   Maximize modularity - callback heaven!
*   Avoid touching the window object

I should mention that although my code is original - if you're wondering what inspired me to take this top-down approach, I was inspired by my learnings in:

*   React's Flux / Redux architectures
*   Clojure / ClojureScript
*   Elm

### [](#app-state-and-management)App State and Management

Previously, I explained how I arrived at using "state" in the context of a Emulsion global namespace.

Since app and user actions can readily be defined, I chose to conceptually highlight the major ones (a few examples):

*   fetch photos (set)
*   switch photos (when loading a new set)
*   render photos
*   remove photos

Since all events bubble up to the top-level app, debugging becomes easier. With a simple `console.log`, we can reveal both the action that was emitted and the current 'state' of the application. Without the crazy tangle of 100% traditional two-way data binding, state starts to become a little easier to reason about.

Another intent behind this project's methodology, was to demonstrate that "simple Vanilla JS" apps could benefit from a different approach, not reliant on heavy frameworks and libraries by other folks.

### [](#source)Source

[Browse Emulsion's source code](https://www.github.com/tsaiDavid/emulsion)

[Play with Live Demo](http://tsaidavid.github.io/emulsion/)

## [](#file-structure)File Structure

The application's file structure is described below:

## [](#get-started)Get Started

Before you start, you'll want to install the necessary npm packages.

```
npm install

```

Now we can begin having fun!

To run the application and take advantage of Browser Sync's live reloading:

```
gulp serve

```

To run the apps' tests and take advantage of Browser Sync's live reloading:

```
gulp serve:test

```

To build the files (to a 'dist' directory), run:

```
gulp

```

## [](#code-style-and-methodology)Code Style and Methodology

Application uses no frameworks, instead relying on a "global" app state.

Code style is heavily inspired by the new "standard" that AirBnb has set forth, which is actually now the standard used by MDN! I softened some of the rules for this project.

## [](#roadmap)Roadmap

With a short time frame to complete this project there are some other things I would like to finish:

*   More unit tests
*   Evaluate further code modularity
*   Implement client-side bundling (browserify, webpack)
*   ES6 Fetch Polyfill (just because!)
*   Generate JSdocs (I have already prepared my app for it, see source code)
*   Fix small CSS bugs
    *   I prioritized general code cleanliness and a thorough approach to code construction and documentation. I realize there are a few CSS issues that can be improved - and will likely fix those ASAP!

## [](#flickr)Flickr

**Note: API KEYS should never be exposed! The one you see in the app is for demo use only.**

To learn more about the Flickr endpoint I used: [https://www.flickr.com/services/api/misc.urls.html](https://www.flickr.com/services/api/misc.urls.html)

</article>
