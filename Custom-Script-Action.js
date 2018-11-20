var myCSS = document.createElement( "link" );
myCSS.rel = "stylesheet";
myCSS.href = "https://sharepointsolver.sharepoint.com/sites/brandme/Style%20Library/QuickLaunch/left-nav-override.css";
document.head.insertBefore( myCSS, document.head.childNodes[ document.head.childNodes.length - 1 ].nextSibling );

function loadJavaScript(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
}

loadJavaScript("https://sharepointsolver.sharepoint.com/sites/brandme/Style%20Library/QuickLaunch/left-nav-override.js", function() {
    console.log("QuickLaunch navigation dropdowns enabled.");
});