# positive-server-hors-docker
Étape 1 :
```bash
sudo npm install -g yarn && sudo yarn install && sudo add nodemon && sudo apt-get install mysql-server && sudo mysql -u root
```

Étape 2 :
```sql
CREATE DATABASE confiance ;
CREATE USER 'boris'@'localhost' IDENTIFIED BY 'Lovelace2024';
GRANT ALL PRIVILEGES ON *.* TO 'boris'@'localhost' WITH GRANT OPTION;
```

Étape 3 :
```bash
cd mysql-dump && sudo mysql -u root -p confiance < database.sql
```
