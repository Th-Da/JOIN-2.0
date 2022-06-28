async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "./templates/navbar.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
/*     updateActivePage();
 */}

/* function updateActivePage() {
    let active = window.location.pathname.split('/').pop();
    let links = document.getElementsByClassName('slected-nav-item');
    
    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        link.classList.remove('active');
        link.ariaCurrent = null;
        let path = link.href.split('/').pop(); 
        if (active == path) {
            link.classList.add('active');
            link.ariaCurrent = "page";
        }
    }
} */
