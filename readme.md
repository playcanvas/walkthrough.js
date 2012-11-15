# walkthrough.js

walkthrough.js allows you to create interactive walkthroughs for your website.

~~~javascript~~~
var wt = new WT.Walkthrough('walkthrough-name', {})

wt.addStep({
    el: 'body', // jQuery selector for the element that the message is positioned relative to
    position: 'center', // Where to position relative to el
    html: "<h3>Walkthrough</h3><p>Use HTML to set the content of the message</p>", // The HTML content of the message
    first: true, // Indicate that this is the first of a batch, page reloads will wind back to the previous 'first' step
    page: "^http(s)?://example.com/pageone.html$", // RegEx to limit step to appear on a particular URL
    width: 300, // Override default width
    height: 200, // Override default height
    highlight: false // Disable element hightlighting
});

wt.addStep({
    el: 'input[type='submit'], // jQuery selector for the element that the message is positioned relative to
    position: 'bottom', // Where to position relative to el
    html: "<h3>Walkthrough</h3><p>Use HTML to set the content of the message</p>", // The HTML content of the message
    offsetX: 10, // offset relative to the default positioning
    offsetY: 20, // offset relative to the default positioning
    trigger: 'click' // Type of event that triggers the next message
    disable: '#selector' // Disable element using jQuery selector
});

wt.addStep({
    el: 'body', // The element to that the message is positioned relative to
    position: 'bottom', // Where to position relative to el
    html: "<h3>Walkthrough</h3><p>Use HTML to set the content of the message</p>", // The HTML content of the message
    enable: '#selector' // Enable element using jQuery selector
    last: true
});

~~~~~~~

See the examples folder for working demos.