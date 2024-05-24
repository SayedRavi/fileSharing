<?php 
	require 'connection.php';
	$query = 'SELECT * FROM files';

	$result = mysqli_query($connection, $query);

	$count = mysqli_num_rows($result);
 ?>
<table class="table table-striped table-hover table-sm">
	<thead>
		<tr>
			<th>No</th>
			<th>File Name</th>
			<th>File Size</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		<?php 

			if ($count < 1) {
				?>
				<tr>
				<td colspan="4" style="text-align: center;">No Record Found</td>
				</tr>
				<?php
			}else{
				$i=1;
				while ($data = mysqli_fetch_assoc($result)) {
					?>
					<tr>
						<td><?php echo $i++; ?></td>
						<td><?php echo $data['file_name']; ?></td>
						<td><?php echo $data['file_size']; ?></td>
						<td>
							<a href="<?php echo $data['file_path'] ?>" class="btn btn-info btn-sm">Download</a>
							<button onclick="_delete(event, '<?php echo $data['id']; ?>')" class="btn btn-danger btn-sm">Delete</button>
						</td>
					</tr>
					<?php
				}
			}
		 ?>
		
	</tbody>
</table>