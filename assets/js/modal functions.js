function setUpModal(modal, title, mode, data) {
    let relevantServerFunction = {
        "updateList": updateList,
        "updateListItem": updateListItem
    };
    let relevantVisualServerFunction = {
        "updateList": updateListVisual,
        "updateListItem": updateListItemVisual
    };
    let modalBody = modal.querySelector("div.modal-body");
    let modalForm = modal.querySelector("form.modalForm");
    modal.querySelector(".modal-title").innerHTML = title;
    removeChildren(modalBody);
    modalBody.appendChild(getModalForm(mode, data));
    modalForm.onsubmit = function () {
        event.preventDefault();
        relevantServerFunction[mode](getFormValues(modalForm));
        relevantVisualServerFunction[mode](getFormValues(modalForm));
        $("#" + modal.id).modal("hide");
    };
}

function getModalForm(mode, data) {
    let modes = ["updateList", "updateListItem", "newList"];
    if (!modes.includes(mode)) {
        return false;
    }
    let wrapperDiv;
    let formGroupDiv;
    let formGroupDivLabel;
    let formGroupDivInput;
    if (mode === "updateList") {
        formGroupDiv = document.createElement("DIV");
        formGroupDiv.className = "form-group";
        formGroupDivInput = document.createElement("INPUT");
        formGroupDivInput.type = "text";
        formGroupDivInput.name = "listId";
        formGroupDivInput.hidden = true;
        formGroupDivInput.value = data.listId;
        formGroupDiv.appendChild(formGroupDivInput);
        formGroupDivLabel = document.createElement("LABEL");
        formGroupDivLabel.setAttribute("for", "listNameInput");
        formGroupDivLabel.innerText = "List name:";
        formGroupDiv.appendChild(formGroupDivLabel);
        formGroupDivInput = document.createElement("INPUT");
        formGroupDivInput.type = "text";
        formGroupDivInput.id = "listNameInput";
        formGroupDivInput.className = "form-control";
        formGroupDivInput.name = "listName";
        formGroupDivInput.value = data.listName;
        formGroupDivInput.placeholder = "List name";
        formGroupDiv.appendChild(formGroupDivInput);
        return formGroupDiv;
    } else if (mode === "updateListItem") {
        wrapperDiv = document.createElement("DIV");
        formGroupDivInput = document.createElement("INPUT");
        formGroupDivInput.type = "text";
        formGroupDivInput.name = "listItemId";
        formGroupDivInput.hidden = true;
        formGroupDivInput.value = data.listItemId;
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
        formGroupDivInput.value = data.listItemName;
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
        formGroupDivInput.value = data.listItemDuration;
        formGroupDivInput.placeholder = "List item duration";
        formGroupDiv.appendChild(formGroupDivInput);
        return wrapperDiv;
    }
}
