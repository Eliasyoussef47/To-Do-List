window.onload = function() {
    getListsFromServer().then(response => makeLists(response));
};
editModal.onclick = function() {
    if (event.target.dataset["function"] !== undefined && event.target.dataset["function"] === "delete") {
        deleteBtn(this);
    }
};