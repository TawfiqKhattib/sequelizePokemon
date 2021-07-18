-- CREATE DATABASE sequelize
-- drop DATABASE sequelize
USE sequelize;
-- delete from pokemon
-- delete from pokemon_trainer
-- delete from pokemon_type
-- delete from town
-- delete from trainer

CREATE TABLE pokemon_type(
    id INT NOT NULL  PRIMARY KEY,
    type VARCHAR(20) UNIQUE
);

CREATE TABLE pokemon(
    id INT NOT NULL  PRIMARY KEY,
    name VARCHAR(20),
    height INT,
    weight INT,
    pokeType_id INT,
    FOREIGN KEY(pokeType_id) REFERENCES pokemon_type(id)
);


CREATE TABLE town(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) UNIQUE
);

CREATE TABLE trainer(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) UNIQUE,
    town_id INT,
    FOREIGN KEY(town_id) REFERENCES town(id)
);

CREATE TABLE pokemon_trainer(
    pokemon_id INT,
    trainerr_id INT,
    FOREIGN KEY(pokemon_id) REFERENCES pokemon(id),
    FOREIGN KEY(trainerr_id) REFERENCES trainer(id)
);

