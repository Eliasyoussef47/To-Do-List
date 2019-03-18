/*globals toDoListsMainCon*/
function insertListVisual(insertData) {
    toDoListsMainCon.appendChild(makeList(insertData));
}

function insertListItemVisual(insertData) {
    let list = document.querySelector("[data-list-id='" + insertData.listId + "']");
    let listBody = list.querySelector("div.toDoListBody");
    listBody.appendChild(makeListItem(insertData));
}

function updateListVisual(updateData) {
    let list = document.querySelector("[data-list-id='" + updateData.listId + "']");
    let listHeaderTitle = list.querySelector("div.toDoListHeader > span.toDoListHeaderTitle");
    listHeaderTitle.textContent = updateData.listName;
}

function updateListItemVisual(updateData) {
    let list = document.querySelector("[data-list-id='" + updateData.listId + "']");
    let listItem = list.querySelector("div.toDoListBody > div.listItem[data-list-item-id='" + updateData.listItemId + "']");
    let listItemTitle = listItem.querySelector("label.listItemTitle");
    listItemTitle.textContent = updateData.listItemName;
}