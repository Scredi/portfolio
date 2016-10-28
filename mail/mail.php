<?php

    // Email address verification
    function isEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    if($_POST) {

        $emailTo = 'm.petronio91@gmail.com';

        $clientName = addslashes(trim($_POST['name']));
        $clientEmail = addslashes(trim($_POST['email']));
        $subject = addslashes(trim($_POST['subject']));
        $message = addslashes(trim($_POST['message']));
        $antispam = addslashes(trim($_POST['antispam']));

        $errors = [
            'errorName' => '',
            'errorEmail' => '',
            'errorSubject' => '',
            'errorMessage' => '',
            'errorSpam' => ''
        ];

        if($clientName == '') {
            $errors['errorName'] = 'Nom vide';
        }
        if(!isEmail($clientEmail)) {
            $errors['errorEmail'] = 'Adresse mail non valide';
        }
        if($subject == '') {
            $errors['errorSubject'] = 'Sujet vide';
        }
        if($message == '') {
            $errors['errorMessage'] = 'Message vide';
        }
        if($antispam != '12') {
            $errors['errorSpam'] = 'Réponse incorrecte !';
        }
        if($clientName != '' && isEmail($clientEmail) && $subject != '' && $message != '' && $antispam == '12') {
            // Send email
            $headers = "From: " . $clientName . " <" . $clientEmail . ">" . "\r\n" . "Reply-To: " . $clientEmail;
            mail($emailTo, $subject, $message, $headers);
        }

        echo json_encode($errors);

    }

?>