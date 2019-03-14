function removeChildren(parentElement) {
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}

function showElementT(elm) {
    elm.style.display = "block";
    setTimeout(function(){ elm.style.opacity = "1"; }, 100);
}

function hideElementT(elm) {
    elm.style.opacity = "0";
    setTimeout(function(){ elm.style.display = "none"; }, 100);
}

function showElement(elm) {
    elm.style.display = "block";
}

function hideElement(elm) {
    elm.style.display = "none";
}

function startFullScreenLoading() {
    showElementT(fullScreanLoadingBackground);
}

function stopFullScreenLoading() {
    hideElementT(fullScreanLoadingBackground);
}

function startMediumLoading() {
    showElementT(fullScreanLoadingBackground);
}

function stopMediumLoading() {
    hideElementT(fullScreanLoadingBackground);
}

function getListsFromServer() {
    startFullScreenLoading();
    const myInit = {
        method: 'GET',
        credentials: 'include'
    };

    fetch("http://localhost/To-Do-List/home/alllists", myInit)
    .then(function(response) {
        if (response.status === 200) {
            return response.json();
        }
    }).then(function (json) {
        makeLists(json);
        stopFullScreenLoading();
    }).catch(function (error) {
        return error;
    });
}

function makeLists(array) {
    let currentListId = "0";
    let listConDiv;
    let listHeader;
    let listItem;
    let listItemCheckbox;
    let listItemCheckboxLabel;
    let listItemEditBtn;

    array.forEach(function(currentElm, index, array) {
        if (currentListId !== currentElm.listId) {
            listConDiv = document.createElement("DIV");
            listConDiv.className = "list-group toDoLists";
            listHeader = document.createElement("DIV");
            listHeader.className = "list-group-item list-group-item-action list-group-item-primary active";
            listHeader.innerText = currentElm.listName;
            listConDiv.appendChild(listHeader);
            toDoListsMainCon.appendChild(listConDiv);
            currentListId = currentElm.listId;
        }
        listItem = document.createElement("DIV");
        listItem.className = "custom-control custom-checkbox list-group-item listItems list-group-item-action pl-5";
        listItemCheckbox = document.createElement("INPUT");
        listItemCheckbox.type = "checkbox";
        listItemCheckbox.className = "custom-control-input";
        listItemCheckbox.id = "customCheck" + currentElm.listId + "_" + currentElm.itemId;
        listItem.appendChild(listItemCheckbox);
        listItemCheckboxLabel = document.createElement("LABEL");
        listItemCheckboxLabel.className = "custom-control-label";
        listItemCheckboxLabel.setAttribute("for", "customCheck" + currentElm.listId + "_" + currentElm.itemId);
        listItemCheckboxLabel.innerText = currentElm.itemName;
        listItem.appendChild(listItemCheckboxLabel);
        listItemEditBtn = document.createElement("i");
        listItemEditBtn.className = "fas fa-edit text-primary float-right listItemEditBtns";
        listItem.appendChild(listItemEditBtn);
        listConDiv.appendChild(listItem);
    })
}