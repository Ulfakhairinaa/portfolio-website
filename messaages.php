<?php include 'koneksi.php'; ?>

<h2>Messages</h2>

<?php
$result = $conn->query("SELECT * FROM messages ORDER BY id DESC");

while($row = $result->fetch_assoc()) {
?>
  <div class="msg-box">
    <b><?php echo $row['name']; ?></b>
    <p><?php echo $row['message']; ?></p>
  </div>
<?php } ?>