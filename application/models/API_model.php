<?php
class API_model extends CI_Model {
	public function getAllLists() {
		$this->load->database();
        $this->db->select('*');
        $this->db->from('lists');
        $this->db->join('listsItems', 'lists.listId = listsItems.listId', 'left');
        $query = $this->db->get();
		if ($query->num_rows() > 0) {
			return $query->result_array();
		} else { 
			return false;
		}
	}

	public function updateList($updateData) {
        $this->load->database();
        $listId = $updateData["listId"];
        unset($updateData["listId"]);
        $query = $this->db->update('lists', $updateData, "listId = " . $listId);
        return $query;
	}
}