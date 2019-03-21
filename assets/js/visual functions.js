function makeListItem(dataObj) {// dataObj moet de volgende bevatten: listItemId, listId, listItemName en listItemDuration
    let listItem,
    listItemCheckbox,
    listItemCheckboxLabel,
    listItemEditBtnWrap,
    listItemEditBtn,
    listItemOptionsBtnWrap,
    listItemOptionsBtn,
    listItemOptionsBtnDropdownMenu,
    listItemOptionsBtnDropdownMenuOption;
    listItem = document.createElement("DIV");
    listItem.className = "custom-control custom-checkbox list-group-item list-group-item-action pl-5 listItem";
    listItem.dataset.listItemId = dataObj.listItemId;
    listItem.dataset.listId = dataObj.listId;
    listItem.dataset.listItemDuration = dataObj.listItemDuration;
    listItem.dataset.listItemStatus = (dataObj.listItemStatus !== null ? dataObj.listItemStatus : "0");
    listItemCheckbox = document.createElement("INPUT");
    listItemCheckbox.type = "checkbox";
    listItemCheckbox.className = "custom-control-input listItemCheckbox";
    listItemCheckbox.id = "listItemCheckbox" + dataObj.listId + "_" + dataObj.listItemId;
    if (dataObj.listItemStatus === "1") {
        listItemCheckbox.checked = true;
    }
    let updateData = {
        listItemId: dataObj.listItemId,
        listId: dataObj.listId,
        listItemStatus: dataObj.listItemStatus
    };
    listItemCheckbox.onchange = function() {
        updateData.listItemStatus = this.checked;
        updateListItemStatus(updateData);
        updateListItemStatusVisual(updateData);
    };
    listItem.appendChild(listItemCheckbox);
    listItemCheckboxLabel = document.createElement("LABEL");
    listItemCheckboxLabel.className = "custom-control-label listItemTitle";
    listItemCheckboxLabel.setAttribute("for", "listItemCheckbox" + dataObj.listId + "_" + dataObj.listItemId);
    listItemCheckboxLabel.innerText = dataObj.listItemName;
    listItem.appendChild(listItemCheckboxLabel);
    listItemEditBtnWrap = document.createElement("DIV");
    listItemEditBtnWrap.className = "float-right ml-2";
    let modalData = {
        listItemId: dataObj.listItemId,
        listId: dataObj.listId,
        listItemName: dataObj.listItemName,
        listItemDuration: dataObj.listItemDuration
    };
    listItemEditBtnWrap.onclick = function() {
        setUpModal(document.getElementById("editModal"), "Edit list item", "updateListItem", modalData);
        $("#editModal").modal("show");
    };
    listItemEditBtn = document.createElement("I");
    listItemEditBtn.className = "fas fa-edit text-primary listItemEditBtns";
    listItemEditBtnWrap.appendChild(listItemEditBtn);
    listItemOptionsBtnWrap = document.createElement("DIV");
    listItemOptionsBtnWrap.className = "btn-group dropleft float-right ml-2";
    modalData = {
        listItemId: dataObj.listItemId,
        listId: dataObj.listId,
        listItemName: dataObj.listItemName,
        listItemDuration: dataObj.listItemDuration
    };
    listItemOptionsBtnWrap.onclick = function() {
        setUpModal(document.getElementById("editModal"), "Delete list item?", "deleteListItem", modalData);
        $("#editModal").modal("show");
    };
    listItemOptionsBtn = document.createElement("I");
    listItemOptionsBtn.className = "fas fa-ellipsis-v text-primary listItemOptionsBtns";
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
    listItem.appendChild(listItemOptionsBtnWrap);
    listItem.appendChild(listItemEditBtnWrap);
    return listItem;
}

function makeList(dataObj) {// dataObj moet de volgende bevatten: listId en listName
    let listConDiv,
    listHeader,
    listHeaderTitle,
    listBody,
    listItemEditBtnWrap,
    listItemEditBtn,
    listItemOptionsBtnWrap,
    listItemOptionsBtn,
    listItemOptionsBtnDropdownMenu,
    listItemOptionsBtnDropdownMenuOption,
    listFooter,
    listItemAddBtns;
    listConDiv = document.createElement("DIV");
    listConDiv.className = "list-group toDoLists";
    listConDiv.dataset.listId = dataObj.listId;
    listHeader = document.createElement("DIV");
    listHeader.className = "list-group-item list-group-item-action list-group-item-primary active toDoListHeader";
    listHeaderTitle = document.createElement("SPAN");
    listHeaderTitle.className = "toDoListHeaderTitle";
    listHeaderTitle.innerText = dataObj.listName;
    listHeader.appendChild(listHeaderTitle);
    listItemEditBtnWrap = document.createElement("DIV");
    listItemEditBtnWrap.className = "float-right ml-2";
    let modalData = {
        listId: dataObj.listId,
        listName: dataObj.listName
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
    modalData = {
        listId: dataObj.listId,
        listName: dataObj.listName
    };
    listItemOptionsBtnDropdownMenuOption.onclick = function() {
        setUpModal(document.getElementById("editModal"), "Delete list?", "deleteList", modalData);
        $("#editModal").modal("show");
    };
    listItemOptionsBtnDropdownMenu.appendChild(listItemOptionsBtnDropdownMenuOption);
    listItemOptionsBtnWrap.appendChild(listItemOptionsBtnDropdownMenu);
    listHeader.appendChild(listItemOptionsBtnWrap);

    listItemOptionsBtnWrap = document.createElement("DIV");
    listItemOptionsBtnWrap.className = "btn-group dropleft float-right ml-2";
    listItemOptionsBtn = document.createElement("I");
    listItemOptionsBtn.className = "fas fa-sort-amount-down text-light listItemOptionsBtns";
    listItemOptionsBtn.dataset.toggle = "dropdown";
    listItemOptionsBtnWrap.appendChild(listItemOptionsBtn);
    listItemOptionsBtnDropdownMenu = document.createElement("DIV");
    listItemOptionsBtnDropdownMenu.className = "dropdown-menu";

    listItemOptionsBtnDropdownMenuOption = document.createElement("A");
    listItemOptionsBtnDropdownMenuOption.className = "dropdown-item";
    listItemOptionsBtnDropdownMenuOption.href = "#";
    listItemOptionsBtnDropdownMenuOption.innerText = "Sort by time";
    listItemOptionsBtnDropdownMenuOption.onclick = function() {
        let list = document.querySelector("[data-list-id='" + dataObj.listId + "']");
        sortList(list, "listItemDuration");
    };
    listItemOptionsBtnDropdownMenu.appendChild(listItemOptionsBtnDropdownMenuOption);

    listItemOptionsBtnDropdownMenuOption = document.createElement("A");
    listItemOptionsBtnDropdownMenuOption.className = "dropdown-item";
    listItemOptionsBtnDropdownMenuOption.href = "#";
    listItemOptionsBtnDropdownMenuOption.innerText = "Sort by status";
    listItemOptionsBtnDropdownMenuOption.onclick = function() {
        let list = document.querySelector("[data-list-id='" + dataObj.listId + "']");
        sortList(list, "listItemStatus");
    };
    listItemOptionsBtnDropdownMenu.appendChild(listItemOptionsBtnDropdownMenuOption);

    listItemOptionsBtnWrap.appendChild(listItemOptionsBtnDropdownMenu);
    listHeader.appendChild(listItemEditBtnWrap);
    listHeader.appendChild(listItemOptionsBtnWrap);


    listConDiv.appendChild(listHeader);
    // currentListId = dataObj.listId;
    listBody = document.createElement("DIV");
    listBody.className = "list-group-item toDoListBody";
    listConDiv.appendChild(listBody);
    listFooter = document.createElement("DIV");
    listFooter.className = "list-group-item list-group-item-action list-group-item-primary toDoListFooter";
    listFooter.innerText = "Add a new card";
    modalData = {
        listId: dataObj.listId
    };
    listFooter.onclick = function() {
        setUpModal(document.getElementById("editModal"), "Add a new card", "insertListItem", modalData);
        $("#editModal").modal("show");
    };
    listItemAddBtns = document.createElement("I");
    listItemAddBtns.className = "fas fa-plus float-right listItemAddBtns";
    listFooter.appendChild(listItemAddBtns);
    listConDiv.appendChild(listFooter);
    return listConDiv;
}