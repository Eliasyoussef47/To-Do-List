function setUpModal(modal, title, mode) {
    modal.querySelector(".modal-title").innerHTML = title;
    modal.querySelector(".modal-body").innerHTML = modalBodies[mode];
}

function getEditModalForm(mode) {
    let modes = ["list", "listItem", "newList"];

}
