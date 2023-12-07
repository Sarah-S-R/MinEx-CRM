document.addEventListener('DOMContentLoaded', function () {
    // Check if the script has already been loaded
    if (!document.getElementById('cmsTableContainer')) {
        console.log('Client script loaded.');
        init();
    }
});

const tableKeyClient = 'clients';
let cmsTable;
let cmsTableDemo = {};

// ----------------------------Function to fetch client count---------------------------------------
function getClientCount() {
    return Object.keys(cmsTable).length;
}

//------------------------ UPDATE CLIENT COUNT ON THE DASHBOARD--------------------
function updateClientCount() {
    try {
        const clientCountElement = document.getElementById("clientCount");

        if (clientCountElement) {
            const count = countClients();
            console.log("Client count:", count);

            if (typeof count === "number" && !isNaN(count)) {
                clientCountElement.textContent = `${count}`;
            } else {
                console.error("Invalid client count:", count);
                clientCountElement.textContent = "Error: Invalid count";
            }
        } else {
            console.error("Client count element not found!");
        }
    } catch (error) {
        console.error("Error updating client count:", error);
    }
}

//--------------- Add event listener for the 'clientUpdated' event--------------------------------
document.addEventListener('clientUpdated', () => {
    console.log('Client updated event triggered.');
   
    // Update the client count
    updateClientCount();
});

//  -------------------------Function to update client count element ---------------------------------

// Modify updateClientCount function to update count only on the dashboard
function updateClientCount() {
    console.log('Updating client count...');
    
    const clientCountElement = document.getElementById('clientCount');
    
    if (clientCountElement) {
        console.log('Client count element found:', clientCountElement);
        
        const clientCount = getClientCount();
        console.log('Client count:', clientCount);
        
        clientCountElement.textContent = clientCount;
    } else {
        console.log('Client count element not found!');
    }
}

//------------------ADDED THIS FROM SCRIPTS.JS AND COMMENTED IT OUT ON SCRIPTS--------------

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
  
  });

//-----------------------------------FROM SCRIPTS-------------------

//-------------------------------------ADD NEW CLIENT-------------------------------------------
let enableDisableCompanyInput = (option) => {
    let newPersonCompany = document.getElementById('newPersonCompany');
    
    if (option === 'enable')
        newPersonCompany.disabled = false;
   
        else if (option === 'disable')
        newPersonCompany.disabled = true;
}

let refreshClientTable = () => {
    console.log('Refreshing client table...');

    let cmsTableKeys = Object.keys(cmsTable);
    let tableContainerClient = document.getElementById('cmsTableContainer');
    let oldTableBodyClient = document.getElementById('cmsTableBody');

    // Check if oldTableBodyClient is a valid element and has a parent before attempting to remove it
    if (oldTableBodyClient && oldTableBodyClient.parentNode) {
        oldTableBodyClient.parentNode.removeChild(oldTableBodyClient);
    }

    let newTableBodyClient = document.createElement('div');
    newTableBodyClient.id = 'cmsTableBody';
    tableContainerClient.appendChild(newTableBodyClient);
    
    for(let i = 0; i < cmsTableKeys.length;i++){
        let currentRow = document.createElement('div');
        let currentCompanyCol = document.createElement('div');
        let currentTickerCol = document.createElement('div');
        let currentAddressCol = document.createElement('div');
        let currentNameCol = document.createElement('div');
        let currentPhoneCol = document.createElement('div');
        let currentEmailCol = document.createElement('div');
        let currentEditBtn = document.createElement('div');
        let currentDeleteBtn = document.createElement('div');

        currentRow.className = 'cm-table-row';
        currentCompanyCol.className = 'cm-table-column cm-company';
        currentTickerCol.className = 'cm-table-column cm-ticker';
        currentAddressCol.className = 'cm-table-column cm-address';
        currentNameCol.className = 'cm-table-column cm-name';
        currentPhoneCol.className = 'cm-table-column cm-phone';
        currentEmailCol.className = 'cm-table-column cm-email';
        currentEditBtn.className = 'cm-table-column cm-edit';
        currentDeleteBtn.className = 'cm-table-column cm-delete';

        currentCompanyCol.innerHTML = cmsTableKeys[i];
        currentTickerCol.innerHTML = cmsTable[cmsTableKeys[i]].ticker;
        currentAddressCol.innerHTML = cmsTable[cmsTableKeys[i]].address;
        currentNameCol.innerHTML = cmsTable[cmsTableKeys[i]].name;
        currentPhoneCol.innerHTML = cmsTable[cmsTableKeys[i]].phone;
        currentEmailCol.innerHTML = cmsTable[cmsTableKeys[i]].email;

        currentDeleteBtn.innerHTML = '<i class="fas fa-dumpster"></i>';
        currentEditBtn.innerHTML = '<i class="fas fa-user-edit"></i>';

        currentRow.appendChild(currentCompanyCol);
        currentRow.appendChild(currentTickerCol);
        currentRow.appendChild(currentAddressCol);
        currentRow.appendChild(currentNameCol);
        currentRow.appendChild(currentPhoneCol);
        currentRow.appendChild(currentEmailCol);
        currentRow.appendChild(currentEditBtn);
        currentRow.appendChild(currentDeleteBtn);
        newTableBodyClient.appendChild(currentRow);
    }

    let enableDisableNewUserModal = (option) => {
       
        let newPersonCompany = document.getElementById('newPersonCompany');
        let newPersonTicker = document.getElementById('newPersonTicker');
        let newPersonAddress = document.getElementById('newPersonAddress');
        let newPersonName = document.getElementById('newPersonName');
        let newPersonPhone = document.getElementById('newPersonPhone');
        let newPersonEmail = document.getElementById('newPersonEmail');
        
        newPersonCompany.value = '';
        newPersonTicker.value = '';
        newPersonAddress.value = '';
        newPersonName.value = '';
        newPersonPhone.value = '';
        newPersonEmail.value = '';
        
        let newPersonModal = document.getElementById('newPersonModal');
        let backdrop = document.getElementById('backdrop');
        
        newPersonModal.className = `${option}-modal`;
        backdrop.className = `${option}-modal`;
    }

    let addNewEntryBtn = document.getElementById('cmAddNewEntry');
    let editBtns = document.getElementsByClassName('cm-edit');
    let deleteBtns = document.getElementsByClassName('cm-delete');
    let newPersonSubmitBtn = document.getElementById('newPersonSubmitButton');
    let newPersonCancelBtn = document.getElementById('newCancelButton');
    
    newPersonSubmitBtn.addEventListener('click', () => {
        
        let newPersonCompany = document.getElementById('newPersonCompany').value.trim();
        let newPersonTicker = document.getElementById('newPersonTicker').value.trim();
        let newPersonAddress = document.getElementById('newPersonAddress').value.trim();
        let newPersonName = document.getElementById('newPersonName').value.trim();
        let newPersonPhone = document.getElementById('newPersonPhone').value.trim();
        let newPersonEmail = document.getElementById('newPersonEmail').value.trim();
        
        if(newPersonCompany === '')
            document.getElementById('newPersonCompany').className = 'input-err';
        
            else 
            document.getElementById('newPersonCompany').className = '';

        if(newPersonTicker === '')
            document.getElementById('newPersonTicker').className = 'input-err';
        
        else 
            document.getElementById('newPersonTicker').className = '';
       
        if(newPersonAddress === '')
            document.getElementById('newPersonAddress').className = 'input-err';
        
        else 
            document.getElementById('newPersonAddress').className = '';
        
        if(newPersonName === '')
            document.getElementById('newPersonName').className = 'input-err';
        
        else 
            document.getElementById('newPersonName').className = '';
       
         if(newPersonPhone === '')
            document.getElementById('newPersonPhone').className = 'input-err';
       
        else 
            document.getElementById('newPersonPhone').className = '';
        
            if(newPersonEmail === '')
            document.getElementById('newPersonEmail').className = 'input-err';
       
        else 
            document.getElementById('newPersonEmail').className = '';  
        
        if(newPersonCompany !== '' && newPersonTicker !== '' && newPersonAddress !== '' && newPersonName !== '' &&  newPersonPhone !== '' && newPersonEmail !== ''){
            
//-------- Add the new project to cmsTable-----------------
            cmsTable[newPersonCompany] = {
                
                'ticker': newPersonTicker,
                'address': newPersonAddress,
                'name': newPersonName,
                'phone': newPersonPhone,
                'email': newPersonEmail
            };

//----------------------STORE AND SORT DATA AUTOMATICALLY---------------------------------

 // Dispatch a storage event
 const event = new Event('clientUpdated');
 window.dispatchEvent(event);

 // Sort the company names alphabetically
 const sortedKeys = Object.keys(cmsTable).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

 // Create a new object with sorted data
 const tempTable = {};
 sortedKeys.forEach(key => (tempTable[key] = cmsTable[key]));

 // Update cmsTable with the sorted data
 cmsTable = tempTable;

 localStorage.setItem(tableKeyClient, JSON.stringify(cmsTable));
            enableDisableNewUserModal('disable');
            refreshClientTable();

 // ------------------------ UPDATE THE CLIENT COUNT-----------------------------------------
             updateClientCount();
        }
    });
    
   // -----------------------CANCEL AND SUBMIT BUTTONS----------------------------------------
   
   newPersonCancelBtn.addEventListener('click', () =>{
        enableDisableNewUserModal('disable');  
    });
    
    addNewEntryBtn.addEventListener('click', () => {
        enableDisableNewUserModal('enable');
    });
   //------------------------------------------------------------------------
    for(let i = 0; i < editBtns.length; i++){
       
        editBtns[i].addEventListener('click', ($event) => {
           
            let nameToEdit = $event.target.parentElement.children[0].innerText;
            let personToEdit = cmsTable[nameToEdit];
            
            // Enable input fields for editing
            enableDisableCompanyInput('enable');
            enableDisableNewUserModal('enable');
           
            let newPersonCompany = document.getElementById('newPersonCompany');
            let newPersonTicker = document.getElementById('newPersonTicker');
            let newPersonAddress = document.getElementById('newPersonAddress');
            let newPersonName = document.getElementById('newPersonName');
            let newPersonPhone = document.getElementById('newPersonPhone');
            let newPersonEmail = document.getElementById('newPersonEmail');
           
            // Populate input fields with existing client data
            newPersonCompany.value = nameToEdit; //use company name for editing
            newPersonTicker.value = personToEdit.ticker;
            newPersonAddress.value = personToEdit.address;
            newPersonName.value = personToEdit.name;
            newPersonPhone.value = personToEdit.phone;
            newPersonEmail.value = personToEdit.email; 

            // Update button event listener for submission
            newPersonSubmitBtn.removeEventListener('click', newPersonSubmitListener);
    
            // Define a new event listener for submission
            const editPersonSubmitListener = () => {
                // Get updated values
                let updatedCompany = newPersonCompany.value.trim();
    
                // Update the existing item in cmsTable
                cmsTable[updatedCompany] = {
                    'company': newPersonCompany.value.trim(),
                    'ticker': newPersonTicker.value.trim(),
                    'address': newPersonAddress.value.trim(),
                    'name': newPersonName.value.trim(),
                    'phone': newPersonPhone.value.trim(),
                    'email': newPersonEmail.value.trim(),
                };
    
                // Remove the old item if the company name is changed
                if (updatedCompany !== nameToEdit) {
                    delete cmsTable[nameToEdit];
                }
    
                // Update localStorage
                localStorage.setItem(tableKeyClient, JSON.stringify(cmsTable));
    
                // Disable the modal and refresh the table
                enableDisableNewUserModal('disable');
                refreshClientTable();

                // Update the client count
            updateClientCount();

            };
    
            // Attach the new event listener
            newPersonSubmitBtn.addEventListener('click', editPersonSubmitListener);
        });
    }






    //------------------------NEW CODE ADDED END------------
    for(let i = 0; i < deleteBtns.length; i++){
        deleteBtns[i].addEventListener('click', ($event) => {
            
            let nameToDelete = $event.target.parentElement.children[0].innerText;
            let isSure = window.confirm('Are you sure you want to delete ' + nameToDelete + '?');
            
            if(isSure)
                // delete user from table
                deleteUserFromTable(nameToDelete);
        })
    }
}
let deleteUserFromTable = (userName) => {
    let tempTable = {};
    let cmsTableKeys = Object.keys(cmsTable);
    
    for(let i = 0; i < cmsTableKeys.length; i++){
        if(userName !== cmsTableKeys[i]){
            tempTable[cmsTableKeys[i]] = cmsTable[cmsTableKeys[i]]; 
        }
    }

    cmsTable = tempTable;
    localStorage.setItem(tableKeyClient,JSON.stringify(cmsTable));
    refreshClientTable();

    // ----------------------------- UPDATE THE CLIENT COUNT------------------------------
    updateClientCount();
};

let init = () => {
    console.log('Initializing client.js');
    
    // Add an identifier to the body to prevent duplicate loading
    document.body.id = 'cmsBodyLoaded';

    cmsTable = localStorage.getItem(tableKeyClient) ? JSON.parse(localStorage.getItem(tableKeyClient)) : {};

    let tableContainerClient = document.getElementById('cmsTableContainer');
    if (tableContainerClient) {
        refreshClientTable();
    }
};


//----------------------Function to count clients----------------------------
function countClients() {
    try {
        // Retrieve the client count using the consistent key ('clients')
        const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
        console.log("Stored clients:", storedClients); // Log the stored clients for debugging
        const count = storedClients.length;
        console.log("Calculated client count:", count); // Log the calculated count for debugging
        return count;

    } catch (error) {
        console.error("Error counting clients:", error);
        return 0; // Return 0 in case of an error
    }
}

//  -------------------------Function to update client count element ---------------------------------

// Function to update client count on the dashboard
function updateClientCount() {
    try {
        const clientCountElement = document.getElementById("clientCount");
        
        // Retrieve the client count using the countClients function
        const count = countClients();

        if (typeof count === "number" && !isNaN(count)) {
            clientCountElement.textContent = `${count}`;

            // Dispatch the event after updating the count
            const event = new Event('clientUpdated');
            window.dispatchEvent(event);
        } 
        else {
            console.error("Invalid client count:", count);
            clientCountElement.textContent = "Error: Invalid count";
        }
    } catch (error) {
        console.error("Error updating client count:", error);
        clientCountElement.textContent = "Error updating count";
    }
}

document.addEventListener('projectUpdated', () => {
    console.log('projectUpdated event triggered in client.js.');
    // Update the project count
    updateProjectCount();
});

init();