<?php
	require 'connection.php';
	
	if (!empty($_FILES['file'])) {
		$file = $_FILES['file'];
		$file_name = $file['name'];
		$file_size = $file['size'];
		$file_tmp = $file['tmp_name'];

		if (is_uploaded_file($file_tmp)) {
			$file_array = explode('.', $file_name);
			$file_ext = end($file_array);

			$file_new_name = uniqid();
			$destination = 'files/'.$file_new_name.'.'.$file_ext;

			$result = move_uploaded_file($file_tmp, $destination);
			$query = "INSERT INTO `files` (`id`, `file_name`, `file_size`, `file_path`) VALUES (NULL, '".$file_name."', '".$file_size."', '".$destination."')";
			$result = mysqli_query($connection, $query);

			if($result) {
				echo json_encode([
					'result' => true,
					'message' => '
					<div class="alert alert-success alert-dismissible">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					<strong>Success!</strong> File Uploaded Successfuly.
					</div>

					'
 				]);
			}
		}
	}

?>