function insertList(insertData) {
    startMediumLoading();
    let insertDataString = JSON.stringify(insertData);
    let searchParams = new URLSearchParams();
    searchParams.append('insertData', insertDataString);
    const myInit = {
        method: 'POST',
        credentials: 'include',
        body: searchParams
    };
    return fetch("http://localhost/To-Do-List/API/insertList", myInit)
        .then(function(response) {
            if (response.status === 200) {
                return response.json();
            }
        }).then(function(json) {
            stopMediumLoading();
            return json;
        }).catch(function (error) {
            console.log(error.body);
        });
}

function insertListItem(insertData) {
    startMediumLoading();
    let insertDataString = JSON.stringify(insertData);
    let searchParams = new URLSearchParams();
    searchParams.append('insertData', insertDataString);
    const myInit = {
        method: 'POST',
        credentials: 'include',
        body: searchParams
    };
    return fetch("http://localhost/To-Do-List/API/insertListItem", myInit)
        .then(function(response) {
            if (response.status === 200) {
                return response.json();
            }
        }).then(function(json) {
            stopMediumLoading();
            return json;
        }).catch(function (error) {
            console.log(error.body);
        });
}

function getAllLists() {
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

function getList(requestData) {
    startModalLoading(editModal);
    let requestDataString = JSON.stringify(requestData);
    let searchParams = new URLSearchParams();
    searchParams.append('requestData', requestDataString);
    const myInit = {
        method: 'POST',
        credentials: 'include',
        body: searchParams
    };
    return fetch("http://localhost/To-Do-List/API/getList", myInit)
        .then(function(response) {
            if (response.status === 200) {
                return response.json();
            }
        }).then(function (json) {
            stopModalLoading();
            return json;
        }).catch(function (error) {
            console.log(error.body);
        });
}

function getListItem(requestData) {
    startModalLoading(editModal);
    let requestDataString = JSON.stringify(requestData);
    let searchParams = new URLSearchParams();
    searchParams.append('requestData', requestDataString);
    const myInit = {
        method: 'POST',
        credentials: 'include',
        body: searchParams
    };
    return fetch("http://localhost/To-Do-List/API/getListItem", myInit)
        .then(function(response) {
            if (response.status === 200) {
                return response.json();
            } else {
                response.text().then(text => console.log(text));
            }
        }).then(function (json) {
            stopModalLoading();
            return json;
        }).catch(function (error) {
            console.log(error.body);
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

function updateListItem(updateData) {
    startMediumLoading();
    let updateDataString = JSON.stringify(updateData);
    let searchParams = new URLSearchParams();
    searchParams.append('updateData', updateDataString);
    const myInit = {
        method: 'POST',
        credentials: 'include',
        body: searchParams
    };
    return fetch("http://localhost/To-Do-List/API/updateListItem", myInit)
        .then(function(response) {
            stopMediumLoading();
            return response.text();
        }).then(function(responseText) {
            console.log(responseText);
        }).catch(function (error) {
            console.log(error.body);
        });
}

function updateListItemStatus(updateData) {
    startMediumLoading();
    let updateDataString = JSON.stringify(updateData);
    let searchParams = new URLSearchParams();
    searchParams.append('updateData', updateDataString);
    const myInit = {
        method: 'POST',
        credentials: 'include',
        body: searchParams
    };
    return fetch("http://localhost/To-Do-List/API/updateListItemStatus", myInit)
        .then(function(response) {
            stopMediumLoading();
            return response.text();
        }).then(function(responseText) {
            console.log(responseText);
        }).catch(function (error) {
            console.log(error.body);
        });
}
