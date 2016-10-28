<?php

$handler = new PDO('mysql:host=localhost;dbname=dbname', 'username', 'password');
$stmt = $handler->query("SELECT
                          (SELECT COUNT(*) FROM `compta-free` WHERE voteUp=1) AS comptaVoteUp,
                          (SELECT COUNT(*) FROM `compta-free` WHERE voteDown=1) AS comptaVoteDown,
                          (SELECT COUNT(*) FROM `tod` WHERE voteUp=1) AS todVoteUp,
                          (SELECT COUNT(*) FROM `tod` WHERE voteDown=1) AS todVoteDown,
                          (SELECT COUNT(*) FROM `cp` WHERE voteUp=1) AS cpVoteUp,
                          (SELECT COUNT(*) FROM `cp` WHERE voteDown=1) AS cpVoteDown,
                          (SELECT COUNT(*) FROM `gda` WHERE voteUp=1) AS gdaVoteUp,
                          (SELECT COUNT(*) FROM `gda` WHERE voteDown=1) AS gdaVoteDown,
                          (SELECT COUNT(*) FROM `adr` WHERE voteUp=1) AS adrVoteUp,
                          (SELECT COUNT(*) FROM `adr` WHERE voteDown=1) AS adrVoteDown
                        ")->fetchObject();
echo json_encode($stmt);

