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
    list,
    listBody,
    listItem;
    array.forEach(function(currentElm) {
        if (currentListId !== currentElm.listId) {
            list = makeList(currentElm);
            listBody = list.querySelector("div.toDoListBody");
            toDoListsMainCon.appendChild(list);
            currentListId = currentElm.listId;
        }
        if (currentElm.listItemId != null) {
            listItem = makeListItem(currentElm);
            listBody.appendChild(listItem);
        }
        // if ((nextArrayElement === undefined || nextArrayElement.listId === null) || parseInt(nextArrayElement.listId) > parseInt(currentElm.listId)) {//als de volgende listId hoger is dan de huidige
        //
        // }
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
