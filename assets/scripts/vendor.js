const PAGE_HEADER = document.getElementById("page-header");

const SIDEBAR = document.getElementById("sidebar");

const MENU_BUTTON = document.getElementById("menu-button");

const ABOUT_ME = document.getElementById("about-me-pointer");
const PROJECTS = document.getElementById("projects-pointer");
const CONTACT = document.getElementById("contact-pointer");

window.addEventListener("scroll", () => {
    if (window.scrollY === 0) {
        PAGE_HEADER.style.boxShadow = "none";
    } else {
        PAGE_HEADER.style.boxShadow = "2px 2px 5px #AAAAAA";
    }
})

document.addEventListener("click", event => {
    if (sidebarStatus === "open") {
        if (!event.target.classList.contains("sidebar-content")) {
            closeSidebar();
        }
    }
    if (event.target.id === "menu-button") {
        openSidebar();
    }
    if (event.target.id === "sidebar-about-me-link" || event.target.id === "header-about-me-link") {
        goToAboutMe();
    }
    if (event.target.id === "sidebar-projects-link" || event.target.id === "header-projects-link") {
        goToProjects();
    }
    if (event.target.id === "sidebar-contact-link" || event.target.id === "header-contact-link") {
        goToContact();
    }
    if (event.target.id === "project-1-link") {
        window.location = "https://miles-rowbottom.github.io/website/pokedex/database";
    }
    if (event.target.id === "project-2-link") {
        window.location = "https://miles-rowbottom.github.io/website/pokemon/comparison";
    }
    if (event.target.id === "project-3-link") {
        window.location = "https://miles-rowbottom.github.io/website/apps/colour_palette";
    }
    if (event.target.id === "project-4-link") {
        window.location = "https://miles-rowbottom.github.io/website/apps/random_cocktails";
    }
    if (event.target.id === "project-1-code") {
        window.location = "https://github.com/miles-rowbottom/website/tree/master/pokedex";
    }
    if (event.target.id === "project-2-code") {
        window.location = "https://github.com/miles-rowbottom/website/tree/master/pokemon";
    }
    if (event.target.id === "project-3-code") {
        window.location = "https://github.com/miles-rowbottom/website/tree/master/apps";
    }
    if (event.target.id === "project-4-code") {
        window.location = "https://github.com/miles-rowbottom/website/tree/master/apps";
    }
    if (event.target.id === "email-button") {
        window.location = "mailto:miles.rowbottom@gmail.com"
    }
    if (event.target.id === "linkedin-button") {
        window.location = "https://www.linkedin.com/in/miles-rowbottom-128040155/"
    }
})
