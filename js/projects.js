
const tableKey = 'cms-table';
let cmsTable;
let cmsTableDemo = {};

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
    refreshTable();
});

let enableDisableCompanyInput = (option) => {
    let newPersonCompany = document.getElementById('newPersonCompany');
    
    if (option === 'enable')
        newPersonCompany.disabled = false;
   
        else if (option === 'disable')
        newPersonCompany.disabled = true;
}

let refreshTable = () => { 
    let cmsTableKeys = Object.keys(cmsTable);
    let tableContaier = document.getElementById('cmsTableContainer');
    let oldTableBody = document.getElementById('tableBody');
   
    tableContaier.removeChild(oldTableBody);
   
    let newTableBody = document.createElement('span');
    newTableBody.id = 'tableBody';
    tableContaier.appendChild(newTableBody);
    
    for(let i = 0; i < cmsTableKeys.length;i++){
        let currentRow = document.createElement('div');
        let currentCompanyCol = document.createElement('div');
        let currentPropertyNameCol = document.createElement('div');
        let currentLocationCol = document.createElement('div');
        let currentClaimsCol = document.createElement('div');
        let currentAreaCol = document.createElement('div');
        let currentEditBtn = document.createElement('div');
        let currentDeleteBtn = document.createElement('div');


        currentRow.className = 'cm-table-row';
        currentCompanyCol.className = 'cm-table-column cm-company';
        currentPropertyNameCol.className = 'cm-table-column cm-propertyName';
        currentLocationCol.className = 'cm-table-column cm-location';
        currentClaimsCol.className = 'cm-table-column cm-claims';
        currentAreaCol.className = 'cm-table-column cm-area';
        currentEditBtn.className = 'cm-table-column cm-edit';
        currentDeleteBtn.className = 'cm-table-column cm-delete';

        currentCompanyCol.innerHTML = cmsTableKeys[i];
        currentPropertyNameCol.innerHTML = cmsTable[cmsTableKeys[i]].propertyName;
        currentLocationCol.innerHTML = cmsTable[cmsTableKeys[i]].location;
        currentClaimsCol.innerHTML = cmsTable[cmsTableKeys[i]].claims;
        currentAreaCol.innerHTML = cmsTable[cmsTableKeys[i]].area;

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
       
        let newPersonCompany = document.getElementById('newPersonCompany');
        let newPersonPropertyName = document.getElementById('newPersonPropertyName');
        let newPersonLocation = document.getElementById('newPersonLocation');
        let newPersonClaims = document.getElementById('newPersonClaims');
        let newPersonArea = document.getElementById('newPersonArea');
        
        newPersonCompany.value = '';
        newPersonPropertyName.value = '';
        newPersonLocation.value = '';
        newPersonClaims.value = '';
        newPersonArea.value = '';
        
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
        let newPersonPropertyName = document.getElementById('newPersonPropertyName').value.trim();
        let newPersonLocation = document.getElementById('newPersonLocation').value.trim();
        let newPersonClaims = document.getElementById('newPersonClaims').value.trim();
        let newPersonArea = document.getElementById('newPersonArea').value.trim();
        
        if(newPersonCompany === '')
            document.getElementById('newPersonCompany').className = 'input-err';
        
            else 
            document.getElementById('newPersonCompany').className = '';

        if(newPersonPropertyName === '')
            document.getElementById('newPersonPropertyName').className = 'input-err';
        
        else 
            document.getElementById('newPersonPropertyName').className = '';
       
        if(newPersonLocation === '')
            document.getElementById('newPersonLocation').className = 'input-err';
        
        else 
            document.getElementById('newPersonLocation').className = '';
        
        if(newPersonClaims === '')
            document.getElementById('newPersonClaims').className = 'input-err';
        
        else 
            document.getElementById('newPersonClaims').className = '';
       
         if(newPersonArea === '')
            document.getElementById('newPersonArea').className = 'input-err';
       
        else 
            document.getElementById('newPersonArea').className = '';
        
        
        if(newPersonCompany !== '' && newPersonPropertyName !== '' && newPersonLocation !== '' && newPersonClaims !== ''){
            cmsTable[newPersonCompany] = {
                
                'propertyName': newPersonPropertyName,
                'location': newPersonLocation,
                'claims': newPersonClaims,
                'area': newPersonArea,
            }
            localStorage.setItem(tableKey,JSON.stringify(cmsTable));
            enableDisableNewUserModal('disable');
            refreshTable();
        }
    });
   
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
            
            enableDisableCompanyInput('enable');
            enableDisableNewUserModal('enable');
           
            let newPersonCompany = document.getElementById('newPersonCompany');
            let newPersonPropertyName = document.getElementById('newPersonPropertyName');
            let newPersonLocation = document.getElementById('newPersonLocation');
            let newPersonClaims = document.getElementById('newPersonClaims');
            let newPersonArea = document.getElementById('newPersonArea');
           
            
            newPersonCompany.value = nameToEdit; //use company name for editing
            newPersonPropertyName.value = personToEdit.propertyName;
            newPersonLocation.value = personToEdit.location;
            newPersonClaims.value = personToEdit.claims;
            newPersonArea.value = personToEdit.area;
        });
    }
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
    localStorage.setItem(tableKey,JSON.stringify(cmsTable));
    refreshTable();
}
let init = () => {
    
    if(localStorage.getItem(tableKey)){
        cmsTable = JSON.parse(localStorage.getItem(tableKey));
    }
    
    else {
        cmsTable = cmsTableDemo;
        localStorage.setItem(tableKey,JSON.stringify(cmsTable));
    }
    refreshTable();
}
init();