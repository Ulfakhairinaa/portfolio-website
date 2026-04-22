<?php
// ────────────────────────────────────────────────────
// SAVE MESSAGE (SAFE VERSION)
// ────────────────────────────────────────────────────
include 'koneksi.php';

$name    = $_POST['name'];
$email   = $_POST['email'];
$message = $_POST['message'];

$stmt = $conn->prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $message);

if ($stmt->execute()) {
  echo "success";
} else {
  echo "error";
}

$stmt->close();
$conn->close();
?>