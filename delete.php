<?php	
require 'connection.php';

	$id = $_POST['id'];	
	$delete_qurey = "DELETE FROM files WHERE id= $id";
	$select_query = "SELECT * FROM files WHERE id=$id LIMIT 1";

	$result_select_query = mysqli_query($connection, $select_query);
	$data = mysqli_fetch_assoc($result_select_query);

	if (file_exists($data['file_path'])) {
		unlink($data['file_path']);
		mysqli_query($connection, $delete_qurey);
		echo json_encode([
			'result' => true
		]);

	}

?>