function setUpModal(modal, title, mode, data) {
    let relevantServerFunction = {
        "updateList" : updateList
    };
    let relevantVisualServerFunction = {
        "updateList" : updateListVisual
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
    let formGroupDiv;
    let formGroupDivLabel;
    let formGroupDivInput;
    if (mode === "updateList") {
        formGroupDiv = document.createElement("DIV");
        formGroupDiv.className = "form-group";
        formGroupDivLabel = document.createElement("LABEL");
        formGroupDivLabel.setAttribute("for", "listNameInput");
        formGroupDivLabel.innerText = "List name:";
        formGroupDiv.appendChild(formGroupDivLabel);
        formGroupDivInput = document.createElement("INPUT");
        formGroupDivInput.type = "text";
        formGroupDivInput.name = "listId";
        formGroupDivInput.hidden = true;
        formGroupDivInput.value = data.listId;
        formGroupDiv.appendChild(formGroupDivInput);
        formGroupDivInput = document.createElement("INPUT");
        formGroupDivInput.type = "text";
        formGroupDivInput.id = "listNameInput";
        formGroupDivInput.className = "form-control";
        formGroupDivInput.name = "listName";
        formGroupDivInput.value = data.listName;
        formGroupDivInput.placeholder = "List name";
        formGroupDiv.appendChild(formGroupDivInput);
        return formGroupDiv;
    }
}
