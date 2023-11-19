
const tableKey = 'cms-table';
let cmsTable;
let cmsTableDemo = {};

/*document.getElementById('SortButton').addEventListener('click', () => {
    const sortedKeys = Object.keys(cmsTable).sort();
    const tempTable = {};
    sortedKeys.forEach(key => tempTable[key] = cmsTable[key]);
    cmsTable = tempTable;
    refreshTable();
}); */

document.getElementById('SortButton').addEventListener('click', () => {
    const sortedKeys = Object.keys(cmsTable).sort();
    const tempTable = {};
    sortedKeys.forEach(key => tempTable[key] = cmsTable[key]);
    cmsTable = tempTable;
    refreshTable();
});

//
/*
let enableDisableCompanyInput = (option) => {
    let newPersonCompany = document.getElementById('newPersonCompany');
    if(option === 'enable')
        newPersonCompany.disabled = false;
    else if (option === 'disable')
        newPersonCompany.disabled = true;

} */

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
            cmsTable[newPersonName] = {
                
                'company': newPersonCompany,
                'ticker': newPersonTicker,
                'address': newPersonAddress,
                'phone': newPersonPhone,
                'email': newPersonEmail
            }
            localStorage.setItem(tableKey,JSON.stringify(cmsTable));
            enableDisableNewUserModal('disable');
            refreshTable();
        }
    });
   
    newPersonCancelBtn.addEventListener('click', () =>{
        enableDisableNewUserModal('disable');
        enableDisableCompanyInput('disable');
    });
    
    addNewEntryBtn.addEventListener('click', () => {
        enableDisableNewUserModal('enable');
        enableDisableCompanyInput('enable');
    });
   
    for(let i = 0; i < editBtns.length; i++){
       
        editBtns[i].addEventListener('click', ($event) => {
           
            let nameToEdit = $event.target.parentElement.children[0].innerText;
            let personToEdit = cmsTable[nameToEdit];
            
            enableDisableCompanyInput('enable');
            enableDisableNewUserModal('enable');
           
            let newPersonCompany = document.getElementById('newPersonCompany');
            let newPersonTicker = document.getElementById('newPersonTicker');
            let newPersonAddress = document.getElementById('newPersonAddress');
            let newPersonName = document.getElementById('newPersonName');
            let newPersonPhone = document.getElementById('newPersonPhone');
            let newPersonEmail = document.getElementById('newPersonEmail');
           
            
            newPersonCompany.value = nameToEdit;
            newPersonTicker.value = personToEdit.ticker;
            newPersonAddress.value = personToEdit.address;
            newPersonName.value = personToEdit.name;
            newPersonPhone.value = personToEdit.phone;
            newPersonEmail.value = personToEdit.email;
            
            enableDisableCompanyInput('disable');
        })
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
    } else {
        cmsTable = cmsTableDemo;
        localStorage.setItem(tableKey,JSON.stringify(cmsTable));
    }
    refreshTable();
}
init();