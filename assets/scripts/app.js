let sidebarStatus = 'closed';

const openSidebar = () => {
  sidebarStatus = 'open';
  SIDEBAR.style.width = '250px';
};

const closeSidebar = () => {
  sidebarStatus = 'close';
  SIDEBAR.style.width = '0';
};

const goToAboutMe = () => {
  ABOUT_ME.scrollIntoView();
};

const goToProjects = () => {
  PROJECTS.scrollIntoView();
};

const goToContact = () => {
    CONTACT.scrollIntoView();
}
