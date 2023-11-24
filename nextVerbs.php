<?php
session_start();

$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'japan';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$currentIndex = isset($_SESSION['currentIndex']) ? $_SESSION['currentIndex'] : 0;
$currentIndex++;

$query = "SELECT group1.df AS japanese_word, group1s.df AS sinhala_word FROM group1, group1s LIMIT $currentIndex, 1";

$result = $conn->query($query);

// Always return a valid JSON response
header('Content-Type: application/json');

if ($result) {
    $row = $result->fetch_assoc();

    // Update the session variable
    $_SESSION['currentIndex'] = $currentIndex;

    echo json_encode($row);
} else {
    echo json_encode(['japanese_word' => 'try j', 'sinhala_word' => 'try s']);
}

$conn->close();
?>
