window.onload = function() {
    getAllLists().then(response => makeLists(response));
};

newListBtn.onclick = function () {
    setUpModal(document.getElementById("editModal"), "Add a new list", "deleteListItem", null);
    $("#editModal").modal("show");
};
