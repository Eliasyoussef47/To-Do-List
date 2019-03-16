
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
        $this->load->model('Home_model');
        $lists = $this->Home_model->getAllLists();
//        var_dump($lists);
        echo(json_encode($lists));
    }

    public function changeListItemStatus()
    {
        $this->load->model('Home_model');
        $lists = $this->Home_model->getAllLists();
        echo(json_encode($lists));
    }
}
