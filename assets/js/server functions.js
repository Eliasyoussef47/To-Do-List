function getListsFromServer() {
    startFullScreenLoading();
    const myInit = {
        method: 'GET',
        credentials: 'include'
    };

    return fetch("http://localhost/To-Do-List/API/getAllLists", myInit)
    .then(function(response) {
        if (response.status === 200) {
            return response.json();
        }
    }).then(function (json) {
        stopFullScreenLoading();
        return json;

    }).catch(function (error) {
        return error;
    });
}
