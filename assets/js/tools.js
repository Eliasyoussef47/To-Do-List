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
    showElement(rightBottomLoadingCircle);
}

function stopMediumLoading() {
    hideElement(rightBottomLoadingCircle);
}

function makeLists(array) {
    let currentListId = "0";
    let listConDiv;
    let listHeader;
    let listHeaderTitle;
    let listBody;
    let listItem;
    let listItemCheckbox;
    let listItemCheckboxLabel;
    let listItemEditBtnWrap;
    let listItemEditBtn;
    let listItemOptionsBtnWrap;
    let listItemOptionsBtn;
    let listItemOptionsBtnDropdownMenu;
    let listItemOptionsBtnDropdownMenuOption;
    let listFooter;
    let listItemAddBtns;
    let nextArrayElement;
    array.forEach(function(currentElm, index, array) {
        nextArrayElement = array[(index + 1)];
        if (currentListId !== currentElm.listId) {
            listConDiv = document.createElement("DIV");
            listConDiv.className = "list-group toDoLists";
            listConDiv.dataset.listId = currentElm.listId;
            listHeader = document.createElement("DIV");
            listHeader.className = "list-group-item list-group-item-action list-group-item-primary active toDoListHeader";
            listHeaderTitle = document.createElement("SPAN");
            listHeaderTitle.className = "toDoListHeaderTitle";
            listHeaderTitle.innerText = currentElm.listName;
            listHeader.appendChild(listHeaderTitle);
            listItemEditBtnWrap = document.createElement("DIV");
            listItemEditBtnWrap.className = "float-right ml-2";
            let modalData = {
                listId: currentElm.listId,
                listName: currentElm.listName
            };
            listItemEditBtnWrap.onclick = function() {
                setUpModal(document.getElementById("editModal"), "Edit list", "updateList", modalData);
                $("#editModal").modal("show");
            };
            listItemEditBtn = document.createElement("I");
            listItemEditBtn.className = "fas fa-edit text-light listItemEditBtns";
            listItemEditBtnWrap.appendChild(listItemEditBtn);
            listItemOptionsBtnWrap = document.createElement("DIV");
            listItemOptionsBtnWrap.className = "btn-group dropleft float-right ml-2";
            listItemOptionsBtn = document.createElement("I");
            listItemOptionsBtn.className = "fas fa-ellipsis-v text-light listItemOptionsBtns";
            listItemOptionsBtn.dataset.toggle = "dropdown";
            listItemOptionsBtnWrap.appendChild(listItemOptionsBtn);
            listItemOptionsBtnDropdownMenu = document.createElement("DIV");
            listItemOptionsBtnDropdownMenu.className = "dropdown-menu";
            listItemOptionsBtnDropdownMenuOption = document.createElement("A");
            listItemOptionsBtnDropdownMenuOption.className = "dropdown-item";
            listItemOptionsBtnDropdownMenuOption.href = "#";
            listItemOptionsBtnDropdownMenuOption.innerText = "Delete";
            listItemOptionsBtnDropdownMenu.appendChild(listItemOptionsBtnDropdownMenuOption);
            listItemOptionsBtnWrap.appendChild(listItemOptionsBtnDropdownMenu);
            listHeader.appendChild(listItemOptionsBtnWrap);
            listHeader.appendChild(listItemEditBtnWrap);
            listConDiv.appendChild(listHeader);
            toDoListsMainCon.appendChild(listConDiv);
            currentListId = currentElm.listId;
            listBody = document.createElement("DIV");
            listBody.className = "list-group-item toDoListBody";
        }
        if (currentElm.itemId != null) {
            listItem = document.createElement("DIV");
            listItem.className = "custom-control custom-checkbox list-group-item listItems list-group-item-action pl-5";
            listItemCheckbox = document.createElement("INPUT");
            listItemCheckbox.type = "checkbox";
            listItemCheckbox.className = "custom-control-input";
            listItemCheckbox.id = "listItemCheckbox" + currentElm.listId + "_" + currentElm.itemId;
            listItem.appendChild(listItemCheckbox);
            listItemCheckboxLabel = document.createElement("LABEL");
            listItemCheckboxLabel.className = "custom-control-label";
            listItemCheckboxLabel.setAttribute("for", "listItemCheckbox" + currentElm.listId + "_" + currentElm.itemId);
            listItemCheckboxLabel.innerText = currentElm.itemName;
            listItem.appendChild(listItemCheckboxLabel);
            listItemEditBtn = document.createElement("I");
            listItemEditBtn.className = "fas fa-edit text-primary float-right listItemEditBtns";
            listItem.appendChild(listItemEditBtn);
            listBody.appendChild(listItem);
        }
        if ((nextArrayElement === undefined || nextArrayElement.listId === null) || parseInt(nextArrayElement.listId) > parseInt(currentElm.listId)) {//als de volgende listId hoger is dan de huidige
            listConDiv.appendChild(listBody);
            listFooter = document.createElement("A");
            listFooter.href = "#";
            listFooter.className = "list-group-item list-group-item-action list-group-item-primary toDoListFooter";
            listFooter.innerText = "Add a new card";
            listItemAddBtns = document.createElement("I");
            listItemAddBtns.className = "fas fa-plus float-right listItemAddBtns";
            listFooter.appendChild(listItemAddBtns);
            listConDiv.appendChild(listFooter);
        }
    })
}

function removeChildren(parentElement) {
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}

function getFormValues(form) {
    let values = {};
    form.querySelectorAll("input, select").forEach((element) => {
        values[element.name] = element.value;
    });
    return values;
}
