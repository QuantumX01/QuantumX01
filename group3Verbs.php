<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root"; // Default XAMPP username
$password = ""; // Default XAMPP password is typically empty
$dbname = "japan";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM group3";
$result = $conn->query($sql);

$rows = array();
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    // Remove 'id' and 'NULL' values from the row
    unset($row['id']);
    $row = array_map(function($value) { return $value === NULL ? "" : $value; }, $row);
    
    // Add the row to the rows array
    $rows[] = array_values($row); // Convert associative array to indexed array
  }
} else {
  echo "0 results";
}
$conn->close();

echo json_encode($rows);
?>

