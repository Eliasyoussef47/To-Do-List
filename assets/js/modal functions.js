function setUpModal(modal, title, mode, data = null) {
    let relevantSetUpPromise = {
        "insertList": null,
        "insertListItem": null,
        "updateList": getList,
        "updateListItem": getListItem,
        "deleteListItem": getListItem
    };
    let relevantServerFunction = {
        "insertList": insertList,
        "insertListItem": insertListItem,
        "updateList": updateList,
        "updateListItem": updateListItem,
        "deleteListItem": deleteListItem
    };
    let relevantVisualServerFunction = {
        "insertList": insertListVisual,
        "insertListItem": insertListItemVisual,
        "updateList": updateListVisual,
        "updateListItem": updateListItemVisual,
        "deleteListItem": deleteListItemVisual
    };
    let modalBody = modal.querySelector("div.modal-body");
    let modalForm = modal.querySelector("form.modalForm");
    modal.querySelector(".modal-title").innerHTML = title;
    if (relevantSetUpPromise[mode] !== null) {
        relevantSetUpPromise[mode](data).then(requestData => {
            removeChildren(modalBody);
            modalBody.appendChild(getModalForm(mode, requestData));
        });
    } else {
        removeChildren(modalBody);
        modalBody.appendChild(getModalForm(mode, data));
    }
    modalForm.onsubmit = function () {
        event.preventDefault();
        if (mode === "updateList" || mode === "updateListItem" || mode === "deleteListItem") {
            relevantServerFunction[mode](getFormValues(modalForm));
            relevantVisualServerFunction[mode](getFormValues(modalForm));
        } else if (mode === "insertListItem" || mode === "insertList") {
            relevantServerFunction[mode](getFormValues(modalForm)).then(response => {
                relevantVisualServerFunction[mode]({...getFormValues(modalForm), ...response})//versprijd de properties van de objects zodat ik ze kan samenvoegen
            });
        }
        $("#" + modal.id).modal("hide");
    };
}

function getModalForm(mode, data) {
    if (data === null) {
        data = {};
    }
    let modes = ["insertList", "insertListItem", "updateList", "updateListItem", "deleteListItem"];
    if (!modes.includes(mode)) {
        return false;
    }
    let wrapperDiv;
    let formGroupDiv;
    let formGroupDivLabel;
    let formGroupDivInput;
    if (mode === "updateList" || mode === "insertList") {
        wrapperDiv = document.createElement("DIV");
        if (mode === "updateList") {
            formGroupDivInput = document.createElement("INPUT");
            formGroupDivInput.type = "text";
            formGroupDivInput.name = "listId";
            formGroupDivInput.hidden = true;
            formGroupDivInput.value = data.listId;
            wrapperDiv.appendChild(formGroupDivInput);
        }
        formGroupDiv = document.createElement("DIV");
        formGroupDiv.className = "form-group";
        formGroupDivLabel = document.createElement("LABEL");
        formGroupDivLabel.setAttribute("for", "listNameInput");
        formGroupDivLabel.innerText = "List name:";
        formGroupDiv.appendChild(formGroupDivLabel);
        formGroupDivInput = document.createElement("INPUT");
        formGroupDivInput.type = "text";
        formGroupDivInput.id = "listNameInput";
        formGroupDivInput.className = "form-control";
        formGroupDivInput.name = "listName";
        formGroupDivInput.value = data.listName || null;
        formGroupDivInput.placeholder = "List name";
        formGroupDiv.appendChild(formGroupDivInput);
        wrapperDiv.appendChild(formGroupDiv);
        return wrapperDiv;
    } else if (mode === "updateListItem" || mode === "insertListItem" || mode === "deleteListItem") {
        wrapperDiv = document.createElement("DIV");
        if (mode === "updateListItem" || mode === "deleteListItem") {
            formGroupDivInput = document.createElement("INPUT");
            formGroupDivInput.type = "text";
            formGroupDivInput.name = "listItemId";
            formGroupDivInput.hidden = true;
            formGroupDivInput.readonly = true;
            formGroupDivInput.value = data.listItemId;
            wrapperDiv.appendChild(formGroupDivInput);
        }
        formGroupDivInput = document.createElement("INPUT");
        formGroupDivInput.type = "text";
        formGroupDivInput.name = "listId";
        formGroupDivInput.hidden = true;
        formGroupDivInput.readonly = true;
        formGroupDivInput.value = data.listId;
        wrapperDiv.appendChild(formGroupDivInput);
        formGroupDiv = document.createElement("DIV");
        formGroupDiv.className = "form-group";
        wrapperDiv.appendChild(formGroupDiv);
        formGroupDivLabel = document.createElement("LABEL");
        formGroupDivLabel.setAttribute("for", "listItemNameInput");
        formGroupDivLabel.innerText = "List item name:";
        formGroupDiv.appendChild(formGroupDivLabel);
        formGroupDivInput = document.createElement("INPUT");
        formGroupDivInput.type = "text";
        formGroupDivInput.id = "listItemNameInput";
        formGroupDivInput.className = "form-control";
        formGroupDivInput.name = "listItemName";
        if (mode === "updateListItem" || mode === "deleteListItem") {
            formGroupDivInput.value = data.listItemName;
            if (mode === "deleteListItem") {
                formGroupDivInput.setAttribute("readonly", "");
            }
        }
        formGroupDivInput.placeholder = "List item name";
        formGroupDiv.appendChild(formGroupDivInput);
        formGroupDiv = document.createElement("DIV");
        formGroupDiv.className = "form-group";
        wrapperDiv.appendChild(formGroupDiv);
        formGroupDivLabel = document.createElement("LABEL");
        formGroupDivLabel.setAttribute("for", "listItemDurationInput");
        formGroupDivLabel.innerText = "List item duration:";
        formGroupDiv.appendChild(formGroupDivLabel);
        formGroupDivInput = document.createElement("INPUT");
        formGroupDivInput.type = "number";
        formGroupDivInput.id = "listItemDurationInput";
        formGroupDivInput.className = "form-control";
        formGroupDivInput.name = "listItemDuration";
        if (mode === "updateListItem" || mode === "deleteListItem") {
            formGroupDivInput.value = data.listItemDuration;
            if (mode === "deleteListItem") {
                formGroupDivInput.setAttribute("readonly", "");
            }
        }
        formGroupDivInput.placeholder = "List item duration";
        formGroupDiv.appendChild(formGroupDivInput);
        return wrapperDiv;
    }
}
