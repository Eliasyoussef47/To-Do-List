<div id="toDoListsMainCon" class="d-inline-flex"></div>
<button type="button" class="btn btn-newList inline-block col-1" id="newListBtn"><i class="fas fa-plus"></i> New list</button>
<img id="rightBottomLoadingCircle" src="<?php echo base_url();?>assets/images/loading-red.svg" alt="Loading...">
<!-- Modal -->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editModalTitle">Edit list</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="editModalForm" class="modalForm">
                <div class="modal-body">Loading...</div>
                <div class="modal-footer">
                    <img id="modalLoadingCircle" src="<?php echo base_url();?>assets/images/loading-red.svg" alt="Loading...">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div id="fullScreanLoadingBackground">
    <img id="fullScreanLoadingCircle" src="<?php echo base_url();?>assets/images/loading.svg" alt="Loading...">
</div>