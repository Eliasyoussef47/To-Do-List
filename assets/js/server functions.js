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

function updateList(updateData) {
    startMediumLoading();
    let updateDataString = JSON.stringify(updateData);
    let searchParams = new URLSearchParams();
    searchParams.append('updateData', updateDataString);
    const myInit = {
        method: 'POST',
        credentials: 'include',
        body: searchParams
    };
    return fetch("http://localhost/To-Do-List/API/updateList", myInit)
        .then(function(response) {
            stopMediumLoading();
            return response.text();
        }).then(function(responseText) {
            console.log(responseText);
        }).catch(function (error) {
            console.log(error.body);
        });
}
