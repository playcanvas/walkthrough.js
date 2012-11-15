var walkthrough = new WT.Walkthrough('multipage');

walkthrough.addStep({
    el: '#page-one',
    html: "This is a multipage walkthrough",
    position: 'bottom'
});

walkthrough.addStep({
    el: '#next-page',
    html: "Click this link to move to load a new page and continue the walkthrough",
    position: 'bottom',
    trigger: 'click'
});

walkthrough.addStep({
    el: "#page-two",
    html: "This div is only present on the second page. The walkthrough continues from here.",
    position: 'left',
    first: true
});

// Reset on the first page
if (window.location.href.indexOf('one') >= 0) {
    walkthrough.reset();    
}

walkthrough.start();