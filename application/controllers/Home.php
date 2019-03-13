<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {
	public function index()
	{
        $data['title'] = 'To do list';
        $this->load->view('templates/header_view', $data);
		$this->load->view('Home_view');
        $this->load->view('templates/footer_view');
	}
}
