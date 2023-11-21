
const tableKey = 'pms-table';
let pmsTable;
let pmsTableDemo = {};

document.getElementById('pmSortButton').addEventListener('click', () => {
    const sortedKeys = Object.keys(pmsTable).sort((a, b) => {
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
    sortedKeys.forEach(key => (tempTable[key] = pmsTable[key]));
    pmsTable = tempTable;
    refreshTable();
});

let enableDisableCompanyInput = (option) => {
    let newProjectCompany = document.getElementById('newProjectCompany');
    
    if (option === 'enable')
        newProjectCompany.disabled = false;
   
        else if (option === 'disable')
        newProjectCompany.disabled = true;
}

let refreshTable = () => { 
    let pmsTableKeys = Object.keys(pmsTable);
    let tableContainer = document.getElementById('pmsTableContainer');
    let oldTableBody = document.getElementById('tableBody');
   
    tableContainer.removeChild(oldTableBody);
   
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

        
        if(newProjectCompany === '')
            document.getElementById('newProjectCompany').className = 'input-err';
        
            else 
            document.getElementById('newProjectCompany').className = '';

        if(newProjectPropertyName === '')
            document.getElementById('newProjectPropertyName').className = 'input-err';
        
        else 
            document.getElementById('newProjectPropertyName').className = '';
       
        if(newProjectLocation === '')
            document.getElementById('newProjectLocation').className = 'input-err';
        
        else 
            document.getElementById('newProjectLocation').className = '';
        
        if(newProjectClaims === '')
            document.getElementById('newProjectClaims').className = 'input-err';
        
        else 
            document.getElementById('newProjectClaims').className = '';
       
         if(newProjectArea === '')
            document.getElementById('newProjectArea').className = 'input-err';
       
        else 
            document.getElementById('newProjectArea').className = '';
        

        
        if(newProjectCompany !== '' && newProjectPropertyName !== '' && newProjectLocation !== '' && newProjectClaims !== '' &&  newProjectArea !== '' ){
            pmsTable[newProjectCompany] = {
                
                'propertyName': newProjectPropertyName,
                'location': newProjectLocation,
                'claims': newProjectClaims,
                'area': newProjectArea,

            }
            localStorage.setItem(tableKey,JSON.stringify(pmsTable));
            enableDisableNewUserModal('disable');
            refreshTable();
        }
    });
   
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
            
            enableDisableCompanyInput('enable');
            enableDisableNewUserModal('enable');
           
            let newProjectCompany = document.getElementById('newProjectCompany');
            let newProjectPropertyName = document.getElementById('newProjectPropertyName');
            let newProjectLocation = document.getElementById('newProjectLocation');
            let newProjectClaims = document.getElementById('newProjectClaims');
            let newProjectArea = document.getElementById('newProjectArea');

           
            
            newProjectCompany.value = nameToEdit; //use company name for editing
            newProjectPropertyName.value = projectToEdit.propertyName;
            newProjectLocation.value = projectToEdit.location;
            newProjectClaims.value = projectToEdit.claims;
            newProjectArea.value = projectToEdit.area;

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
    let pmsTableKeys = Object.keys(pmsTable);
    
    for(let i = 0; i < pmsTableKeys.length; i++){
        if(userName !== pmsTableKeys[i]){
            tempTable[pmsTableKeys[i]] = pmsTable[pmsTableKeys[i]]; 
        }
    }
    pmsTable = tempTable;
    localStorage.setItem(tableKey,JSON.stringify(pmsTable));
    refreshTable();
}
let init = () => {
    
    if(localStorage.getItem(tableKey)){
        pmsTable = JSON.parse(localStorage.getItem(tableKey));
    }
    
    else {
        pmsTable = pmsTableDemo;
        localStorage.setItem(tableKey,JSON.stringify(pmsTable));
    }
    refreshTable();
}
init();