function updateListVisual(updateData) {
    let list = document.querySelector("[data-list-id='" + updateData.listId + "']");
    let listHeaderTitle = list.querySelector("div.toDoListHeader > span.toDoListHeaderTitle");
    listHeaderTitle.textContent = updateData.listName;
}

function updateListItemVisual(updateData) {
    let list = document.querySelector("[data-list-id='" + updateData.listId + "']");
    let listItemTitle = list.querySelector("div.toDoListBody > div.listItem > label.listItemTitle");
    listItemTitle.textContent = updateData.listItemName;
}