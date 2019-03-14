<?php
class Home_model extends CI_Model {
	public function getAllLists() {
		$this->load->database();
        $this->db->select('*');
        $this->db->from('lists');
        $this->db->join('listsItems', 'listsItems.listId = lists.listId');
        $query = $this->db->get();
		if ($query->num_rows() > 0) {
			return $query->result_array();
		} else { 
			return false;
		}
	}
}