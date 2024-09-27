# positive-server-hors-docker
   1  sudo npm install -g yarn && sudo yarn install && sudo add nodemon && sudo apt-get install mysql-server && sudo mysql -u root

CREATE DATABASE confiance ;
CREATE USER 'boris'@'localhost' IDENTIFIED BY 'Lovelace2024';
GRANT ALL PRIVILEGES ON *.* TO 'boris'@'localhost' WITH GRANT OPTION;
   
   3  cd mysql-dump && sudo mysql -u root -p confiance < database.sql
  
