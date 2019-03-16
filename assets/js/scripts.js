window.onload = function() {
    getListsFromServer().then(response => makeLists(response));
};
