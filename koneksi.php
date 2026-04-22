<?php
// ────────────────────────────────────────────────────
// DATABASE CONNECTION
// ────────────────────────────────────────────────────
$conn = new mysqli("localhost", "root", "", "portfolio_final");

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>