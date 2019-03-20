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

function startModalLoading(modal) {
    let modalBody = modal.querySelector("div.modal-body");
    removeChildren(modalBody);
    modalBody.innerHTML = "Loading...";
    showElement(modalLoadingCircle);
}

function stopModalLoading() {
    hideElement(modalLoadingCircle);
}

function makeLists(array) {
    let currentListId = "0",
    listConDiv,
    listHeader,
    listHeaderTitle,
    listBody,
    listItem,
    listItemCheckbox,
    listItemCheckboxLabel,
    listItemEditBtnWrap,
    listItemEditBtn,
    listItemOptionsBtnWrap,
    listItemOptionsBtn,
    listItemOptionsBtnDropdownMenu,
    listItemOptionsBtnDropdownMenuOption,
    listFooter,
    listItemAddBtns,
    nextArrayElement;

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
            modalData = {
                listId: currentElm.listId,
                listName: currentElm.listName
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
                let list = document.querySelector("[data-list-id='" + currentElm.listId + "']");
                sortList(list, "listItemDuration");
            };
            listItemOptionsBtnDropdownMenu.appendChild(listItemOptionsBtnDropdownMenuOption);
            listItemOptionsBtnDropdownMenuOption = document.createElement("A");
            listItemOptionsBtnDropdownMenuOption.className = "dropdown-item";
            listItemOptionsBtnDropdownMenuOption.href = "#";
            listItemOptionsBtnDropdownMenuOption.innerText = "Sort by status";
            listItemOptionsBtnDropdownMenuOption.onclick = function() {
                let list = document.querySelector("[data-list-id='" + currentElm.listId + "']");
                sortList(list, "listItemStatus");
            };
            listItemOptionsBtnDropdownMenu.appendChild(listItemOptionsBtnDropdownMenuOption);
            listItemOptionsBtnWrap.appendChild(listItemOptionsBtnDropdownMenu);
            listHeader.appendChild(listItemEditBtnWrap);
            listHeader.appendChild(listItemOptionsBtnWrap);
            listConDiv.appendChild(listHeader);
            toDoListsMainCon.appendChild(listConDiv);
            currentListId = currentElm.listId;
            listBody = document.createElement("DIV");
            listBody.className = "list-group-item toDoListBody";
        }
        if (currentElm.listItemId != null) {
            listItem = document.createElement("DIV");
            listItem.className = "custom-control custom-checkbox list-group-item list-group-item-action pl-5 listItem";
            listItem.dataset.listItemId = currentElm.listItemId;
            listItem.dataset.listId = currentElm.listId;
            listItem.dataset.listItemDuration = currentElm.listItemDuration;
            listItem.dataset.listItemStatus = currentElm.listItemStatus;
            listItemCheckbox = document.createElement("INPUT");
            listItemCheckbox.type = "checkbox";
            listItemCheckbox.className = "custom-control-input listItemCheckbox";
            listItemCheckbox.id = "listItemCheckbox" + currentElm.listId + "_" + currentElm.listItemId;
            if (currentElm.listItemStatus === "0") {
                listItemCheckbox.checked = false;
            } else if (currentElm.listItemStatus === "1") {
                listItemCheckbox.checked = true;
            }
            let updateData = {
                listItemId: currentElm.listItemId,
                listId: currentElm.listId,
                listItemStatus: currentElm.listItemStatus
            };
            listItemCheckbox.onchange = function() {
                updateData.listItemStatus = this.checked;
                updateListItemStatus(updateData);
                updateListItemStatusVisual(updateData);
            };
            listItem.appendChild(listItemCheckbox);
            listItemCheckboxLabel = document.createElement("LABEL");
            listItemCheckboxLabel.className = "custom-control-label listItemTitle";
            listItemCheckboxLabel.setAttribute("for", "listItemCheckbox" + currentElm.listId + "_" + currentElm.listItemId);
            listItemCheckboxLabel.innerText = currentElm.listItemName;
            listItem.appendChild(listItemCheckboxLabel);
            listItemEditBtnWrap = document.createElement("DIV");
            listItemEditBtnWrap.className = "float-right ml-2";
            let modalData = {
                listItemId: currentElm.listItemId,
                listId: currentElm.listId,
                listItemName: currentElm.listItemName,
                listItemDuration: currentElm.listItemDuration
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
            modalData = {
                listItemId: currentElm.listItemId,
                listId: currentElm.listId,
                listItemName: currentElm.listItemName,
                listItemDuration: currentElm.listItemDuration
            };
            listItemOptionsBtnDropdownMenuOption.onclick = function() {
                setUpModal(document.getElementById("editModal"), "Delete list item?", "deleteListItem", modalData);
                $("#editModal").modal("show");
            };
            listItemOptionsBtnDropdownMenu.appendChild(listItemOptionsBtnDropdownMenuOption);
            listItemOptionsBtnWrap.appendChild(listItemOptionsBtnDropdownMenu);
            listItem.appendChild(listItemOptionsBtnWrap);
            listItem.appendChild(listItemEditBtnWrap);
            listBody.appendChild(listItem);
        }
        if ((nextArrayElement === undefined || nextArrayElement.listId === null) || parseInt(nextArrayElement.listId) > parseInt(currentElm.listId)) {//als de volgende listId hoger is dan de huidige
            listConDiv.appendChild(listBody);
            listFooter = document.createElement("DIV");
            listFooter.className = "list-group-item list-group-item-action list-group-item-primary toDoListFooter";
            listFooter.innerText = "Add a new card";
            let modalData = {
                listId: currentElm.listId
            };
            listFooter.onclick = function() {
                setUpModal(document.getElementById("editModal"), "Add a new card", "insertListItem", modalData);
                $("#editModal").modal("show");
            };
            listItemAddBtns = document.createElement("I");
            listItemAddBtns.className = "fas fa-plus float-right listItemAddBtns";
            listFooter.appendChild(listItemAddBtns);
            listConDiv.appendChild(listFooter);
        }
    })
}

function getFormValues(form) {
    let values = {};
    form.querySelectorAll("input, select").forEach((element) => {
        values[element.name] = element.value;
    });
    return values;
}

function sortList(list, factor) {
    let listBody, listItems, dir, switching, i, x, y, shouldSwitch, switchCount = 0;
    listBody = list.querySelector(".toDoListBody");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        listItems = listBody.querySelectorAll(".listItem");
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 0; i < (listItems.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = listItems[i].dataset[factor];
            y = listItems[i + 1].dataset[factor];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir === "asc") {
                if (Number(x) > Number(y)) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (Number(x) < Number(y)) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            listItems[i].parentNode.insertBefore(listItems[i + 1], listItems[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchCount ++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchCount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
