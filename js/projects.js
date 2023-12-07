document.addEventListener('DOMContentLoaded', function () {
    // Check if the script has already been loaded
    if (!document.getElementById('pmsTableContainer')) {
        console.log('Project script loaded.');
       projectsInit();
    }
});

const tableKey = 'projects';
let pmsTable;
let pmsTableDemo = {};

// ------------Function to fetch project count-------------------------
function getProjectCount() {
    return Object.keys(pmsTable).length;
}

//--------- Update the project count on the dashboard----------------
function updateProjectCount() {
    try {
        const projectCountElement = document.getElementById("projectCount");

        if (projectCountElement) {
            const count = countProjects();
            console.log("Project count:", count);

            if (typeof count === "number" && !isNaN(count)) {
                projectCountElement.textContent = `${count}`;
            } else {
                console.error("Invalid project count:", count);
                projectCountElement.textContent = "Error: Invalid count";
            }
        } else {
            console.error("Project count element not found!");
        }
    } catch (error) {
        console.error("Error updating project count:", error);
    }
}

// Add event listener for the 'projectUpdated' event
document.addEventListener("projectUpdated", () => {
    console.log("projectUpdated event triggered in projects.js.");
    
    // Update the project count
    updateProjectCount();
});

//-------------------- Function to update project count element-----------------

// Modify updateProjectCount function to update count only on the dashboard
function updateProjectCount() {
    console.log('Updating project count...');

    const projectCountElement = document.getElementById('projectCount');
   
    if (projectCountElement) {
        console.log('Project count element found:', projectCountElement);        
        
        const projectCount = getProjectCount();
        console.log('Project count:', projectCount);

        projectCountElement.textContent = projectCount;
    } else {
        console.log('Project count element not found!');
    }
}


// Function to count projects
 function countProjects() {
    try {
      const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
      console.log("Stored projects:", storedProjects); // Add this line
      return storedProjects.length;
    } catch (error) {
      console.error("Error counting projects:", error);
      return 0;
    }
  }

  // Function to update project count on the dashboard
  function updateProjectCount() {
    try {
      const projectCountElement = document.getElementById("projectCount");

      if (projectCountElement) {
        const count = countProjects(); // Call the countProjects function
        console.log("Project count:", count); // Log the count to the console for debugging

        if (typeof count === "number" && !isNaN(count)) {
          projectCountElement.textContent = `${count}`;
        } else {
          console.error("Invalid project count:", count);
          projectCountElement.textContent = "Error: Invalid count";
        }
      } else {
        console.error("Project count element not found!");
      }
    } catch (error) {
      console.error("Error updating project count:", error);
      projectCountElement.textContent = "Error updating count";
    }
  }

//--------ADDED THIS FROM SCRIPTS.JS FILE AND COMMENTED IT OUT OF THE OTHER FILE----------
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
  });
//-----------------------------------FROM SCRIPTS-------------------------------------------

/*
  // Add event listener for the 'projectUpdated' event
  document.addEventListener("projectUpdated", () => {
    console.log("projectUpdated event triggered in dashboard.html.");
    
//------------------ Update the project count--------------------------------
    updateProjectCount();
  }); */

  
//-------------------------------------ADD NEW PROJECTS-----------------------------------
let enableDisableProjectInput = (option) => {
    let newProjectCompany = document.getElementById('newProjectCompany');
    
    if (option === 'enable')
        newProjectCompany.disabled = false;
   
        else if (option === 'disable')
        newProjectCompany.disabled = true;
}

let refreshProjectTable = () => { 
    console.log('Refreshing project table...');

    let pmsTableKeys = Object.keys(pmsTable);
    let tableContainer = document.getElementById('pmsTableContainer');
    let oldTableBody = document.getElementById('tableBody');
   
 //   tableContainer.removeChild(oldTableBody);

 //---------NEW CODE TO CHECK FOR ERRORS--------
 // Check if oldTableBody is a valid element and has a parent before attempting to remove it
 if (oldTableBody && oldTableBody.parentNode) {
    oldTableBody.parentNode.removeChild(oldTableBody);
}
 //---------NEW CODE TO CHECK FOR ERRORS END--------   

    let newTableBody = document.createElement('span');
    newTableBody.id = 'tableBody';
    tableContainer.appendChild(newTableBody);
    
    for(let i = 0; i < pmsTableKeys.length;i++){
        let currentRow = document.createElement('div');
        let currentCompanyCol = document.createElement('div');
        let currentPropertyNameCol = document.createElement('div');
        let currentLocationCol = document.createElement('div');
        let currentClaimsCol = document.createElement('div');
        let currentAreaCol = document.createElement('div');
        let currentEditBtn = document.createElement('div');
        let currentDeleteBtn = document.createElement('div');


        currentRow.className = 'pm-table-row';
        currentCompanyCol.className = 'pm-table-column pm-company';
        currentPropertyNameCol.className = 'pm-table-column pm-propertyName';
        currentLocationCol.className = 'pm-table-column pm-location';
        currentClaimsCol.className = 'pm-table-column pm-claims';
        currentAreaCol.className = 'pm-table-column pm-area';
        currentEditBtn.className = 'pm-table-column pm-edit';
        currentDeleteBtn.className = 'pm-table-column pm-delete';

        currentCompanyCol.innerHTML = pmsTableKeys[i];
        currentPropertyNameCol.innerHTML = pmsTable[pmsTableKeys[i]].propertyName;
        currentLocationCol.innerHTML = pmsTable[pmsTableKeys[i]].location;
        currentClaimsCol.innerHTML = pmsTable[pmsTableKeys[i]].claims;
        currentAreaCol.innerHTML = pmsTable[pmsTableKeys[i]].area;


        currentDeleteBtn.innerHTML = '<i class="fas fa-dumpster"></i>';
        currentEditBtn.innerHTML = '<i class="fas fa-user-edit"></i>';

        currentRow.appendChild(currentCompanyCol);
        currentRow.appendChild(currentPropertyNameCol);
        currentRow.appendChild(currentLocationCol);
        currentRow.appendChild(currentClaimsCol);
        currentRow.appendChild(currentAreaCol);
        currentRow.appendChild(currentEditBtn);
        currentRow.appendChild(currentDeleteBtn);
        newTableBody.appendChild(currentRow);
    }

    let enableDisableNewUserModal = (option) => {
       
        let newProjectCompany = document.getElementById('newProjectCompany');
        let newProjectPropertyName = document.getElementById('newProjectPropertyName');
        let newProjectLocation = document.getElementById('newProjectLocation');
        let newProjectClaims = document.getElementById('newProjectClaims');
        let newProjectArea = document.getElementById('newProjectArea');

        
        newProjectCompany.value = '';
        newProjectPropertyName.value = '';
        newProjectLocation.value = '';
        newProjectClaims.value = '';
        newProjectArea.value = '';

        
        let newProjectModal = document.getElementById('newProjectModal');
        let pmbackdrop = document.getElementById('pmbackdrop');
        
        newProjectModal.className = `${option}-modal`;
        pmbackdrop.className = `${option}-modal`;
    }

    let addNewEntryBtn = document.getElementById('pmAddNewEntry');
    let editBtns = document.getElementsByClassName('pm-edit');
    let deleteBtns = document.getElementsByClassName('pm-delete');
    let newProjectSubmitBtn = document.getElementById('newProjectSubmitButton');
    let newProjectCancelBtn = document.getElementById('newProjectCancelButton');
    
newProjectSubmitBtn.addEventListener('click', () => {
    let newProjectCompany = document.getElementById('newProjectCompany').value.trim();
    let newProjectPropertyName = document.getElementById('newProjectPropertyName').value.trim();
    let newProjectLocation = document.getElementById('newProjectLocation').value.trim();
    let newProjectClaims = document.getElementById('newProjectClaims').value.trim();
    let newProjectArea = document.getElementById('newProjectArea').value.trim();

    if (newProjectCompany === '')
        document.getElementById('newProjectCompany').className = 'input-err';
    else
        document.getElementById('newProjectCompany').className = '';

    if (newProjectPropertyName === '')
        document.getElementById('newProjectPropertyName').className = 'input-err';
    else
        document.getElementById('newProjectPropertyName').className = '';

    if (newProjectLocation === '')
        document.getElementById('newProjectLocation').className = 'input-err';
    else
        document.getElementById('newProjectLocation').className = '';

    if (newProjectClaims === '')
        document.getElementById('newProjectClaims').className = 'input-err';
    else
        document.getElementById('newProjectClaims').className = '';

    if (newProjectArea === '')
        document.getElementById('newProjectArea').className = 'input-err';
    else
        document.getElementById('newProjectArea').className = '';

        if (newProjectCompany !== '' && newProjectPropertyName !== '' && newProjectLocation !== '' && newProjectClaims !== '' && newProjectArea !== '') {
           
//--------------------- Add the new project to pmsTable-------------------
            pmsTable[newProjectCompany] = {

                'propertyName': newProjectPropertyName,
                'location': newProjectLocation,
                'claims': newProjectClaims,
                'area': newProjectArea,
            };

//----------------------STORE AND SORT DATA AUTOMATICALLY------------------
        
        // Dispatch a storage event
        const event = new Event('projectUpdated');
        window.dispatchEvent(event);
    
            // Sort the company names alphabetically
            const sortedKeys = Object.keys(pmsTable).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    
            // Create a new object with sorted data
            const tempTable = {};
            sortedKeys.forEach(key => (tempTable[key] = pmsTable[key]));
    
            // Update pmsTable with the sorted data
            pmsTable = tempTable;
    
            localStorage.setItem(tableKey, JSON.stringify(pmsTable));
            enableDisableNewUserModal('disable');
            refreshProjectTable();
    
//-------------------- Update the project count---------------------------
            updateProjectCount();
        }
    });
   
// -----------------------CANCEL AND SUBMIT BUTTONS----------------------------------------

    newProjectCancelBtn.addEventListener('click', () =>{
        enableDisableNewUserModal('disable');  
    });
    
    addNewEntryBtn.addEventListener('click', () => {
        enableDisableNewUserModal('enable');
    });
   
    for(let i = 0; i < editBtns.length; i++){
       
        editBtns[i].addEventListener('click', ($event) => {

            let nameToEdit = $event.target.parentElement.children[0].innerText;
            let projectToEdit = pmsTable[nameToEdit];
    
            // Enable input fields for editing
            enableDisableProjectInput('enable');
            enableDisableNewUserModal('enable');
    
            let newProjectCompany = document.getElementById('newProjectCompany');
            let newProjectPropertyName = document.getElementById('newProjectPropertyName');
            let newProjectLocation = document.getElementById('newProjectLocation');
            let newProjectClaims = document.getElementById('newProjectClaims');
            let newProjectArea = document.getElementById('newProjectArea');
    
            // Populate input fields with existing project data
            newProjectCompany.value = nameToEdit;
            newProjectPropertyName.value = projectToEdit.propertyName;
            newProjectLocation.value = projectToEdit.location;
            newProjectClaims.value = projectToEdit.claims;
            newProjectArea.value = projectToEdit.area;
    
            // Update button event listener for submission
            newProjectSubmitBtn.removeEventListener('click', newProjectSubmitListener);
    
            // Define a new event listener for submission
            const editProjectSubmitListener = () => {
                // Get updated values
                let updatedCompany = newProjectCompany.value.trim();
    
                // Update the existing item in pmsTable
                pmsTable[updatedCompany] = {
                    'propertyName': newProjectPropertyName.value.trim(),
                    'location': newProjectLocation.value.trim(),
                    'claims': newProjectClaims.value.trim(),
                    'area': newProjectArea.value.trim(),
                };
    
                // Remove the old item if the company name is changed
                if (updatedCompany !== nameToEdit) {
                    delete pmsTable[nameToEdit];
                }
    
                // Update localStorage
                localStorage.setItem(tableKey, JSON.stringify(pmsTable));
    
                // Disable the modal and refresh the table
                enableDisableNewUserModal('disable');
                refreshProjectTable();
            };
    
            // Attach the new event listener
            newProjectSubmitBtn.addEventListener('click', editProjectSubmitListener);
        });
    }

    for(let i = 0; i < deleteBtns.length; i++){
        deleteBtns[i].addEventListener('click', ($event) => {
            
            let nameToDelete = $event.target.parentElement.children[0].innerText;
            let isSure = window.confirm('Are you sure you want to delete ' + nameToDelete + '?');
            
            if(isSure)
                // delete user from table
                deleteProjectFromTable(nameToDelete);
        })
    }
}
let deleteProjectFromTable = (userName) => {
    let tempTable = {};
    let pmsTableKeys = Object.keys(pmsTable);
    
    for(let i = 0; i < pmsTableKeys.length; i++){
        if(userName !== pmsTableKeys[i]){
            tempTable[pmsTableKeys[i]] = pmsTable[pmsTableKeys[i]]; 
        }
    }

    pmsTable = tempTable;
    localStorage.setItem(tableKey, JSON.stringify(pmsTable));
    refreshProjectTable();

  // ----------------------------- UPDATE THE PROJECT COUNT--------------
    updateProjectCount();
};

let projectsInit = () => {
    console.log('Initializing projects.js');

    if(localStorage.getItem(tableKey)){
        pmsTable = JSON.parse(localStorage.getItem(tableKey));
    }
    
    else {
        pmsTable = pmsTableDemo;
        localStorage.setItem(tableKey,JSON.stringify(pmsTable));
    }
    refreshProjectTable();
}


//--------------------------------Function to count projects-------------------
/*function countProjects() {
    try {
        // Retrieve the project count from localStorage or any other logic you are using
        // Ensure that this logic matches your implementation in projects.js
        const storedProjects = pmsTable || {};
        return Object.keys(storedProjects).length;
    } catch (error) {
        console.error("Error counting projects:", error);
        return 0; // Return 0 in case of an error
    }
}
*/

//  -------------------------Function to update project count element ---------------------------------

// Function to update project count on the dashboard
function updateProjectCount() {
    try {
        const projectCountElement = document.getElementById("projectCount");

         // Retrieve the client count using the countProjects function
         const count = countProjects();

        if (projectCountElement) {
            const count = countProjects(); // Call the countProjects function
            console.log("Project count:", count); // Log the count to the console for debugging

            if (typeof count === "number" && !isNaN(count)) {
                projectCountElement.textContent = `${count}`;

                 // Dispatch the event after updating the count
                 const event = new Event('projectsUpdated');
                 window.dispatchEvent(event);

            } else {
                console.error("Invalid project count:", count);
                projectCountElement.textContent = "Error: Invalid count";
            }
        } else {
            console.error("Project count element not found!");
            projectCountElement.textContent = "Error: Invalid count";
        }
    } catch (error) {
        console.error("Error updating project count:", error);
        projectCountElement.textContent = "Error updating count";
    }
}

document.addEventListener('clientDataUpdated', () => {
    console.log('clientDataUpdated event triggered in projects.js.');
    
    // Update the client count
    updateClientCount();
});

projectsInit();