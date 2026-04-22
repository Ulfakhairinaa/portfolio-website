<?php
include 'koneksi.php';

$result = $conn->query("SELECT * FROM messages ORDER BY id DESC");

$data = [];

while($row = $result->fetch_assoc()){
  $data[] = [
    "name" => htmlspecialchars($row['name']),
    "email" => htmlspecialchars($row['email']),
    "message" => htmlspecialchars($row['message']),
    "created_at" => $row['created_at']
  ];
}

echo json_encode($data);