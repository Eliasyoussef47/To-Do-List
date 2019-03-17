<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class API extends CI_Controller {
    public function index()
    {
        http_response_code(400);
        echo '<h1>400 Bad Request</h1>';
    }

    public function getAllLists()
    {
        $this->load->model('API_model');
        $query = $this->API_model->getAllLists();
        echo(json_encode($query));
    }

    public function getList()
    {
        if ($this->input->post('requestData') === null) {
            http_response_code(400);
            echo '<h1>400 Bad Request</h1>';
        } else {
            $requestData = json_decode($this->input->post('requestData'), true);
            $this->load->model('API_model');
            $query = $this->API_model->getList($requestData);
            echo(json_encode($query));
        }

    }

    public function getListItem()
    {
        if ($this->input->post('requestData') === null) {
            http_response_code(400);
            echo '<h1>400 Bad Request</h1>';
        } else {
            $requestData = json_decode($this->input->post('requestData'), true);
            $this->load->model('API_model');
            $query = $this->API_model->getListItem($requestData);
            echo(json_encode($query));
        }

    }

    public function updateList()
    {
        if ($this->input->post('updateData') === null) {
            http_response_code(400);
            echo '<h1>400 Bad Request</h1>';
        } else {
            $updateData = json_decode($this->input->post('updateData'), true);
            $this->load->model('API_model');
            $listId = $updateData["listId"];
            unset($updateData["listId"]);
            $query = $this->API_model->updateList($updateData, $listId);
            echo $query;
        }

    }
}
