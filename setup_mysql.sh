#!/bin/bash

# Vérifier si MySQL est installé
if ! command -v mysql &> /dev/null
then
    echo "MySQL n'est pas installé. Installation en cours..."
    sudo apt-get update
    sudo apt-get install -y mysql-server
else
    echo "MySQL est déjà installé."
fi

# Démarrer le service MySQL
sudo service mysql start

# Créer la base de données confiance
echo "Création de la base de données 'confiance'..."
mysql -u root -e "CREATE DATABASE IF NOT EXISTS confiance;"

# Créer l'utilisateur boris avec le mot de passe Lovelace2024
echo "Création de l'utilisateur 'boris'..."
mysql -u root -e "CREATE USER IF NOT EXISTS 'boris'@'localhost' IDENTIFIED BY 'Lovelace2024';"

# Donner les privilèges administrateur à l'utilisateur boris
echo "Attribution des privilèges administrateur à 'boris'..."
mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO 'boris'@'localhost' WITH GRANT OPTION;"

# Injecter le script database.sql dans la base de données confiance
echo "Injection du script 'database.sql' dans la base de données 'confiance'..."
mysql -u boris -pLovelace2024 confiance < ./mysql-dump/database.sql

echo "Configuration terminée."