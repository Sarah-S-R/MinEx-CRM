document.addEventListener('DOMContentLoaded', function () {
    init();
});

const tableKeyClient = 'cms-table';
let cmsTable;
let cmsTableDemo = {};
let tableContainer = document.getElementById('cmsTableContainer');
let oldTableBody = document.getElementById('tableBody');

// ----------------------------Function to fetch client count---------------------------------------
function getClientCount() {
    return Object.keys(cmsTable).length;
}

//  -------------------------Function to update client count element ---------------------------------
function updateClientCount() {
    const clientCountElement = document.getElementById('clientCount');
    if (clientCountElement) {
        const clientCount = getClientCount();
        clientCountElement.textContent = clientCount;
    }
}
//------------------------------------ CLIENT TABLE SORT BUTTON-----------------------------------------------------
/*
document.getElementById('SortButton').addEventListener('click', () => {
    const sortedKeys = Object.keys(cmsTable).sort((a, b) => {
        // Convert keys to lowercase for case-insensitive sorting
        const keyA = a.toLowerCase();
        const keyB = b.toLowerCase();

        // Compare keys as numbers if both are numeric, otherwise, compare as strings
        if (!isNaN(keyA) && !isNaN(keyB)) {
            return parseFloat(keyA) - parseFloat(keyB);
        } else {
            return keyA.localeCompare(keyB);
        }
    });

    const tempTable = {};
    sortedKeys.forEach(key => (tempTable[key] = cmsTable[key]));
    cmsTable = tempTable;
    refreshClientTable();
});
*/
//--------------------------------------SORT BUTTON END-----------------------------------------

//-------------------------------------ADD NEW CLIENT-------------------------------------------
let enableDisableClientInput = (option) => {
    let newPersonCompany = document.getElementById('newPersonCompany');
    
    if (option === 'enable')
        newPersonCompany.disabled = false;
   
        else if (option === 'disable')
        newPersonCompany.disabled = true;
}

let refreshClientTable = () => { 
    let cmsTableKeys = Object.keys(cmsTable);
    let tableContainer = document.getElementById('cmsTableContainer');
    let oldTableBody = document.getElementById('tableBody');

    tableContainer.removeChild(oldTableBody);
   
    let newTableBody = document.createElement('span');
    newTableBody.id = 'tableBody';
    tableContainer.appendChild(newTableBody);
    
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
        newTableBody.appendChild(currentRow);
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
            // Add the new project to cmsTable
            cmsTable[newPersonCompany] = {
                
                'ticker': newPersonTicker,
                'address': newPersonAddress,
                'name': newPersonName,
                'phone': newPersonPhone,
                'email': newPersonEmail
            };

      //STORE AND SORT DATA AUTOMATICALLY-

      // Dispatch a storage event
      const event = new Event('clientDataUpdated');
      window.dispatchEvent(event);
  
          // Sort the company names alphabetically
          const sortedKeys = Object.keys(cmsTable).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  
          // Create a new object with sorted data
          const tempTable = {};
          sortedKeys.forEach(key => (tempTable[key] = cmsTable[key]));
  
          // Update cmsTable with the sorted data
          cmsTable = tempTable;


            localStorage.setItem(tableKeyClient,JSON.stringify(cmsTable));
            enableDisableNewUserModal('disable');
            refreshClientTable();


 // ------------------------ Update the project count------------------------------
             updateClientCount();
        }
    });
    
   // ---------------CANCEL AND SUBMIT BUTTONS----------------------------------------
    newPersonCancelBtn.addEventListener('click', () =>{
        enableDisableNewUserModal('disable');  
    });
    
    addNewEntryBtn.addEventListener('click', () => {
        enableDisableNewUserModal('enable');
    });
   
    for(let i = 0; i < editBtns.length; i++){
       
        editBtns[i].addEventListener('click', ($event) => {
           
            let nameToEdit = $event.target.parentElement.children[0].innerText;
            let personToEdit = cmsTable[nameToEdit];
            
            // Enable input fields for editing
            enableDisableClientInput('enable');
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
}

let init = () => {
    if (localStorage.getItem(tableKeyClient)) {
        cmsTable = JSON.parse(localStorage.getItem(tableKeyClient));
    } else {
        cmsTable = cmsTableDemo;
        localStorage.setItem(tableKeyClient, JSON.stringify(cmsTable));
    }

    refreshClientTable();

}


document.addEventListener('clientDataUpdated', () => {
    console.log('clientDataUpdated event triggered.');
    // Update the client count
    updateClientCount();
});


init();