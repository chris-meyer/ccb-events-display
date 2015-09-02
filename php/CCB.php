<?php
/*
*	This class acts as an interface to the CCB API
* @author JR Stanley - jrstanley@atgrace.com
*/
class ccb {
	private $curl;
	private $church;
	private $user;
	private $pass;
	private $base_url;
	private $format = "XML";


	public function __construct($church, $user, $pass) {
		$this->church = $church;
		$this->user = $user;
		$this->pass = $pass;
		$this->base_url = "https://" . $this->church . ".ccbchurch.com/api.php";
		$this->curl = curl_init();
	}
	public function __destruct()  { curl_close($this->curl); }
	public function format($format) { $this->format = $format; }

	private function buildGET($srv, $parameters) {
		$url = $this->base_url . '?srv=' . $srv;
		if ($parameters && is_array($parameters)) {
			foreach ($parameters as $key => $value) {
				$url .= '&' . $key . '=' . urlencode($value);
			}
		}
		return $url;
	}
	private function buildPOST($parameters, $return = NULL) {
		$data = "";
		foreach ($parameters as $key => $value) {
			$data .= '&' . $key . '=' . urlencode($value);
		}
		if ($return == 'count') { return count($parameters); }
		else { return $data; }
	}
	private function xml2array($xmlObject, $out = array()) {
		foreach ( (array) $xmlObject as $index => $node ) {
			$index = str_replace("@", "", $index);
			if (is_object($node)) {
				$out[$index] = $this->xml2array($node);
			} else if (is_array($node)) {
				$out[$index] = $this->xml2array($node);
			} else {
				$out[$index] = $node;
			}
		}
		return $out;
	}
	private function formatData($data) {
		if ($this->format == 'XML' ) { return $data; }
		if ($this->format == 'OBJ' ) { return simplexml_load_string($data); }
		if ($this->format == 'ARR' ) { return $this->xml2array(simplexml_load_string($data)); }
		if ($this->format == 'JSON') { return json_encode($this->xml2array(simplexml_load_string($data))); }
	}

	private function get($srv, $parameters = NULL) {
		curl_setopt_array($this->curl, array(
			CURLOPT_RETURNTRANSFER => 1,
			CURLOPT_URL => $this->buildGET($srv, $parameters),
			CURLOPT_USERPWD => $this->user.':'.$this->pass,
			CURLOPT_SSL_CIPHER_LIST => 'TLSv1'
		));

		$curlResult = curl_exec($this->curl);
		if(!$curlResult) echo curl_error($this->curl);

		return $this->formatData($curlResult);
	}
	private function post($srv, $parameters) {
		curl_setopt_array($this->curl, array(
			CURLOPT_RETURNTRANSFER => 1,
			CURLOPT_URL => $this->buildGET($srv),
			CURLOPT_POST => $this->buildPOST($parameters, 'count'),
			CURLOPT_POSTFIELDS => $this->buildPOST($parameters),
			CURLOPT_USERPWD => $this->user.':'.$this->pass
		));
		return $this->formatData(curl_exec($this->curl));
	}


	public function get_individual_profile_from_id($id) {
		return $this->get('individual_profile_from_id', array('individual_id'=>$id));
	}
	public function get_valid_individuals() {
		return $this->get('valid_individuals');
	}
	public function get_public_calendar_listing($date_start = NULL,$date_end = NULL) {
		$start = $date_start == NULL ? date("Y-m-d") : $date_start;
		$end = $date_end;
		$params = array('date_start'=>$start);
		if($end){
				$params['date_end']=$end;
		}
		return $this->get('public_calendar_listing', $params);
	}
}
?>
