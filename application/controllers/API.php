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
        $lists = $this->API_model->getAllLists();
//        var_dump($lists);
        echo(json_encode($lists));
    }

    public function updateList()
    {
        if (!isset($_POST["updateData"])) {
            http_response_code(400);
            echo '<h1>400 Bad Request</h1>';
        } else {
            $updateData = json_decode($_POST["updateData"], true);
            $this->load->model('API_model');
            $query = $this->API_model->updateList($updateData);
            echo $query;
        }

    }
}
