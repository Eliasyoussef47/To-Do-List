window.onload = function() {
    getAllLists().then(response => makeLists(response));
};
