function updateListVisual(updateData) {
    let list = document.querySelector("[data-list-id='" + updateData.listId + "']");
    let listHeaderTitle = list.querySelector("div.toDoListHeader > span.toDoListHeaderTitle");
    listHeaderTitle.textContent = updateData.listName;
}