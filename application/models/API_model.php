<?php
class API_model extends CI_Model {
    public function insertList($insertData) {
        $this->load->database();
        $this->db->insert('lists', $insertData);
        return $this->db->insert_id();
    }

    public function insertListItem($insertData) {
        $this->load->database();
        $this->db->insert('listsItems', $insertData);
        return $this->db->insert_id();
    }

	public function getAllLists() {
		$this->load->database();
        $this->db->select('`lists`.`listId`');
        $this->db->select('`lists`.`listName`');
        $this->db->select('`listsItems`.`listItemId`');
        $this->db->select('`listsItems`.`listItemName`');
        $this->db->select('`listsItems`.`listItemDuration`');
        $this->db->select('`listsItems`.`listItemStatus`');
        $this->db->from('lists');
        $this->db->join('listsItems', 'lists.listId = listsItems.listId', 'left');
//        $this->db->order_by('listItemId', 'ASC');
        $this->db->order_by('listId', 'ASC');
        $query = $this->db->get();
		if ($query->num_rows() > 0) {
			return $query->result_array();
		} else { 
			return false;
		}
	}

    public function getList($requestData) {
        $this->load->database();
        $this->db->select('*');
		$this->db->where('listId', $requestData["listId"]);
		$query = $this->db->get('lists');
        if ($query->num_rows() > 0) {
            return $query->row_array();
        } else {
            return false;
        }
    }

    public function getListItem($requestData) {
        $this->load->database();
        $this->db->select('*');
		$this->db->where('listItemId', $requestData["listItemId"]);
		$this->db->where('listId', $requestData["listId"]);
		$query = $this->db->get('listsItems');
        if ($query->num_rows() > 0) {
            return $query->row_array();
        } else {
            return false;
        }
    }

	public function updateList($updateData, $listId) {
        $this->load->database();
        $this->db->where('listId', $listId);
        $query = $this->db->update('lists', $updateData);
        return $query;
	}

	public function updateListItem($updateData, $listItemId, $listId) {
        $this->load->database();
        $this->db->where('listItemId', $listItemId);
        $this->db->where('listId', $listId);
        $query = $this->db->update('listsItems', $updateData);
        return $query;
	}

	public function deleteList($deleteData, $listId) {
        $this->load->database();
        $tables = array('listsItems', 'lists');
        $this->db->where('listId', $listId);
        $query = $this->db->delete($tables);
        return $query;
	}

	public function deleteListItem($deleteData, $listItemId) {
        $this->load->database();
        $this->db->where('listItemId', $listItemId);
        $query = $this->db->delete('listsItems');
        return $query;
	}
}