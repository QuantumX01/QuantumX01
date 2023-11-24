<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "japan";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT group1.df AS df, 
            group1.nai AS nai, 
           group1.ta AS ta, 
            group1.nakatta AS nakatta, 
            group1.te AS te, 
            group1.km AS km, 
            group1.masu AS masu, 
            group1.masen AS masen, 
            group1.mashita AS mashita, 
            group1.masendeshita AS masendeshita,
            group1s.df AS dfs, 
            group1s.nai AS nais,
            group1s.ta AS tas, 
            group1s.nakatta AS nakattas, 
            group1s.te AS tes, 
            group1s.km AS km, 
            group1s.masu AS masus, 
            group1s.masen AS masens, 
            group1s.mashita AS mashitas, 
            group1s.masendeshita AS masendeshitas
            FROM group1
            JOIN group1s ON group1.id = group1s.id";

$result = $conn->query($sql);

$rows = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Remove 'id' and 'NULL' values from the row
        unset($row['id']);
        $row = array_map(function ($value) {
            return $value === NULL ? "" : $value;
        }, $row);

        // Add the row to the rows array
        $rows[] = $row;
    }
} else {
    echo "0 results";
}
$conn->close();

echo json_encode($rows);

?>
