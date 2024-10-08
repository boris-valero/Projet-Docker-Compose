# Projet Docker Compose

Ce projet fait communiquer deux conteneurs entre eux grâce à Docker Compose : un conteneur encapsulant un serveur Express et un conteneur encapsulant une base de données MySQL. La base de données contient des affirmations positives à l'intention des développeurs. Pour les connaître et les afficher sur votre écran d'ordinateur je vous invite à installer les prérequis suivants et à suivre les étapes d'installation ci-dessous:

## Prérequis
- Docker
- Docker Compose
- Node.js
- Yarn

## Installation
1. Clonez le dépôt :
    ```sh
    git clone https://github.com/boris-valero/Projet-Docker-Compose.git
    cd Projet-Docker-Compose
    ```

2. Copiez le fichier [`.env.dist`] en [`.env`] :
    ```sh
    cp .env.dist .env
    ```

4. Construisez et démarrez les conteneurs Docker :
    ```sh
    docker compose up --build
    ```
    
4. Connectez vous à l'adresse suivante : 
	```
	http://localhost:7777
	```
