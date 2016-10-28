<?php

function handleVotes($vote, $token, $projectName) {
    $handler = new PDO('mysql:host=petroniofoscredi.mysql.db;dbname=petroniofoscredi', 'petroniofoscredi', 'Verbatim91e');
    $stmt = $handler->query("SELECT COUNT(*) from `".$projectName."` WHERE token='".$token."'")->fetchColumn();
    if($vote == 'up' && $stmt < 1) {
        $voteUp = true;
        $voteDown = false;
        $stmt = $handler->prepare("INSERT INTO `".$projectName."` (token, voteUp, voteDown) VALUES (:token, :voteUp, :voteDown)");
        $stmt->bindParam(':token', $token);
        $stmt->bindParam(':voteUp', $voteUp);
        $stmt->bindParam(':voteDown', $voteDown);
        $stmt->execute();
        $stmt = $handler->query("SELECT COUNT(*) FROM `".$projectName."` WHERE voteUp=1")->fetchColumn();
        $results['voteUp'] = $stmt;
        echo json_encode($results);
    } else if($vote == 'down' && $stmt < 1) {
        $voteUp = false;
        $voteDown = true;
        $stmt = $handler->prepare("INSERT INTO `".$projectName."` (token, voteUp, voteDown) VALUES (:token, :voteUp, :voteDown)");
        $stmt->bindParam(':token', $token);
        $stmt->bindParam(':voteUp', $voteUp);
        $stmt->bindParam(':voteDown', $voteDown);
        $stmt->execute();
        $stmt = $handler->query("SELECT COUNT(*) FROM `".$projectName."` WHERE voteDown=1")->fetchColumn();
        $handler = null;
        $results['voteUp'] = $stmt;
        echo json_encode($results);
    } else {
        $results['done'] = 'Vous avez déjà voté pour ce projet, merci !';
        echo json_encode($results);
    }
}

if($_POST) {
    $vote = $_POST['vote'];
    $token = $_POST['token'];
    $projectName = $_POST['project'];
    $results = [];

    handleVotes($vote, $token, $projectName);
}

