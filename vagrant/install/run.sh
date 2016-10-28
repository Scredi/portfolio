#!/bin/bash

apt-get update

# Install Apache
apt-get install -y apache2 php5 curl git php5-curl php5-mcrypt
apt-get -y install mysql-server
apt-get install php5-mysql
apt-get -y install phpmyadmin
a2dismod mpm_event
a2enmod mpm_prefork
a2enmod rewrite
php5enmod mcrypt
service apache2 restart
apt-get install -y apache2-mpm-itk
service apache2 restart
cp /vagrant/install/files/petronio-maxime.dev.conf /etc/apache2/sites-available/
a2ensite petronio-maxime.dev
service apache2 reload
