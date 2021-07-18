const Sequelize = require('sequelize')

const pokemonData = require('./PokemonData/poke_data.json');

const sequelize = new Sequelize('mysql://root:314671470kh@localhost/sequelize');
sequelize
    .authenticate()
    .then(() => {
         console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })


const addPokemonType = async function (id,type) {
    try {
        let pokeTypeIdQuery = `SELECT id FROM pokemon_type WHERE type = '${type}'`;
        let isPokeTypeExist = await sequelize.query(pokeTypeIdQuery);
        if(!isPokeTypeExist[0][0]){
            let query =`INSERT INTO pokemon_type VALUES (${id}, '${type}')`;
            let result = await sequelize.query(query);
            return result[0];
        }
        return null;
    } catch (error) {
        console.log(error);
    }

}

const addPokemon = async function (id,name, height, weight, type) {
    try {
        let pokemonTypeQuery = `SELECT id FROM pokemon_type WHERE type = '${type}'`;
        let pokemonTypeData =  await sequelize.query(pokemonTypeQuery);
        let pokemonTypeId = pokemonTypeData[0][0].id;
        let query =`INSERT INTO pokemon VALUES (${id}, '${name}', '${height}', '${weight}', ${pokemonTypeId})`;
        let result = await sequelize.query(query);
        return result[0];
    } catch (error) {
        console.log(error);
    }
}

const addTown = async function (name) {
    try {
        let townExistQuery = `SELECT id FROM town WHERE name = '${name}'`;
        let isTownExist = await sequelize.query(townExistQuery);
        if(!isTownExist[0][0]){
            let query =`INSERT INTO town VALUES (null, '${name}')`;
            let result = await sequelize.query(query);
            return result[0];
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}

const addTrainer = async function (name, townName) {
    try {
        let townIdQuery = `SELECT id FROM town WHERE name = '${townName}'`;
        let townData = await sequelize.query(townIdQuery);
        let townId = townData[0][0].id
        let isTrainerExist = await sequelize.query(`SELECT id,town_id FROM trainer WHERE name = '${name}' AND town_id = ${townId}`);
        if(!isTrainerExist[0][0]){
            let query =`INSERT INTO trainer VALUES (null, '${name}', ${townId})`;
            let result = await sequelize.query(query);
            return result[0];
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}

const addPokemonTrainer = async function (PokemonId,trainerName) {
    try {
        let trainerIdQuery = `SELECT id FROM trainer WHERE name = '${trainerName}'`
        let TrainerData =  await sequelize.query(trainerIdQuery);
        let TrainerId = TrainerData[0][0].id;
        let query =`INSERT INTO pokemon_trainer VALUES (${PokemonId}, ${TrainerId})`;
        let result = await sequelize.query(query);
        return result[0];
    } catch (error) {
        console.log(error);
    }
}

let addDataToSql = async function(){
    for(let pokemon of pokemonData){
        await addPokemonType(pokemon.id,pokemon.type);
        await addPokemon(pokemon.id, pokemon.name, pokemon.height, pokemon.weight, pokemon.type);
        for(let owner of pokemon.ownedBy){
            await addTown(owner.town);
            await addTrainer(owner.name,owner.town);
            await addPokemonTrainer(pokemon.id,owner.name);
        }
    }
}


addDataToSql();
