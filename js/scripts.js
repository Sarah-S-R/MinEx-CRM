//----------------------------------- SIDEBAR TOGGLE----------------------------------------------------

let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
};

//--------------------------------------DATE AND TIME---------------------------------------------------
/*
function updateDateTime() {
  const datetimeContainer = document.getElementById('datetime');
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const formattedDate = now.toLocaleDateString('en-US', options);
  datetimeContainer.textContent = formattedDate;
} */

// Update date and time every minute
setInterval(updateDateTime, 60000);

// Initial update
updateDateTime();

/* --------------------------------------PROJECT COUNT --------------------------------------------------*/
/*
document.addEventListener('DOMContentLoaded', function () {
  const projectCountElement = document.getElementById('projectCount');
  if (projectCountElement) {
      console.log('Project script loaded.');  // This line should now be executed
      const projectCount = getProjectCount(); // Make sure getProjectCount is defined in projects.js
      projectCountElement.textContent = projectCount;
  }
});

document.addEventListener('projectUpdated', () => {
  // Update the project count
  updateProjectCount();
}); */

/* --------------------------------------CLIENT COUNT ----------------------------------------------------*/
/*
document.addEventListener('DOMContentLoaded', function () {
  const clientCountElement = document.getElementById('clientCount');
  if (clientCountElement) {
      const clientCount = getClientCount(); // Make sure getClientCount is defined in client.js
      clientCountElement.textContent = clientCount;
  }
});

document.addEventListener('clientUpdated', () => {

// Update the client count
updateClientCount();

}); */


  