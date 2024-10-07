#!/bin/bash

# Vérifier si le mot de passe root est fourni
if [ -z "$1" ]; then
    echo "Usage: $0 <root_password>"
    exit 1
fi

# Variables
ROOT_PASSWORD="Ada2024"
DB_NAME="confiance"
DB_USER="boris"
DB_PASSWORD="Lovelace2024"
DUMP_FILE="database.sql"
DUMP_DIR="mysql-dump"

# Créer la base de données et l'utilisateur
mysql -u root -p"$ROOT_PASSWORD" <<EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME;
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON *.* TO '$DB_USER'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EOF

# Importer la base de données
if [ -d "$DUMP_DIR" ] && [ -f "$DUMP_DIR/$DUMP_FILE" ]; then
    mysql -u root -p"$ROOT_PASSWORD" $DB_NAME < "$DUMP_DIR/$DUMP_FILE"
    echo "Base de données importée avec succès."
else
    echo "Le fichier de dump $DUMP_DIR/$DUMP_FILE n'existe pas."
fi