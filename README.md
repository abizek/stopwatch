# Kloc

XXX: update this 
Stopwatch app with 10ms accuracy and lap support _inspired_ by the Samsung stopwatch.
Made using [Xstate](https://stately.ai/docs/xstate) for maintaining the stopwatch state and [Framer Motion](https://www.framer.com/motion/) for animating the layouts.

Check out the [app](https://kloc.pages.dev/) _or..._

Check out the [stopwatch](https://stately.ai/registry/editor/350b30e8-7251-4b58-bd6c-670bfee8af31?mode=design&machineId=b50146c3-1632-41cc-bd44-baa31457f6cf) and [timer](https://stately.ai/registry/editor/350b30e8-7251-4b58-bd6c-670bfee8af31?mode=design&machineId=04d2084b-bb49-4e65-b68e-3db3ac7c40ae) state machines on the stately.ai visualizer!

## Development

1. Run `npm i`.
2. Run `npm run dev` and the app should be served on `http://localhost:5173`.

> BTW, I used node v20

XXX: schema for stored data
XXX: R: nextjs with kv or firebase rtdb or partykit or cf workers or deno deploy or bun turso drizzle koyeb/fly.io or bun + other edge providers with websocket or vercel

XXX: implement shared timer
XXX: implement shared stopwatch
XXX: share id as slug for sharable url of stopwatch and timer
XXX: Share menu with link icon has enable shraing switch
XXX: link for share with copy, and qr code
XXX: Add and remove share id on enable sharing switch toggle
XXX: remove share id when changing from stopwatch to time or viceversa
XXX: remember share id of each machine
XXX: handle 404 share id by redirecting and showing a Toast for a short time period
XXX: test state sharing
XXX: update readme

XXX: view-only links
XXX: test view-only state sharing

XXX: share UI change on disconnect
XXX: notif on disconnect
XXX: test disconnect

XXX: your timer ended while you were away toast + handle beep play without interaction (or) ?: use alert dialog instead
XXX: test new toast

XXX: fullscreen
XXX: scroll on tabs with use-gesture
XXX: mute button in header for timer
XXX: title and description for shared timer and stopwatch

XXX: buttons stop using scale by default and scale up on hover and scale down on active but keep font unscaled? (see Josh Comeau's article on CSS Transitions for exact button animation)
XXX: animate timer buttons
XXX: animate with morphing icons (lottie?)

XXX: update meta title, description with each page (react-helmet maybe?)

XXX: error correction on write input
XXX: R&D: scrolling input with stiffness and damping and momentum
XXX: R&D: looping scroll input for hh mm ss
XXX: R&D: scroll on click timer input
XXX: write input on click selected values
XXX: timer input hh mm ss styling
XXX: update test for new hh mm ss scroll input

XXX: timer select date and time input + styling
XXX: update/add timer input tests

XXX: timer destination preview (no date if today, localized date if not)
XXX: update destination preview test

XXX: timer timeView days, years : show units when hours is present
XXX: timer timeView days, years : units styling
XXX: timer timeView days, years : do not show units with 0 value when hours is present
XXX: timer timeView days, years : do not prefix 0 on the biggest unit when hours is present
XXX: timer timeView days, years : hours, days, years layout
XXX: add days, years timer tests

XXX: kloc.live domain

XXX: capacitor app with timer notifications, open app via link, convert local and session storage stuff, link for share using android share
XXX: update Readme with capacitor stuff

XXX: ?: negative timer in toast description (upto seconds only)

XXX: ?: lazy load pages
XXX: ?: test pages are loaded properly

XXX: ?: countdown animation for timeView (except ms)
XXX: ?: 3 body problem easter egg in timer timeview
XXX: ?: electron app with timer notifications

XXX: Deadpool 3 timer and linkedin post
XXX: ?: blog post on dev.to
