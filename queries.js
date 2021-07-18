const Sequelize = require('sequelize')

const sequelize = new Sequelize('mysql://root:314671470kh@localhost/sequelize');
sequelize
    .authenticate()
    .then(() => {
         console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

    // EX2
let heaviestPokemon = async function(){
    let heaviestQuery = `SELECT name, weight FROM pokemon WHERE weight = (SELECT MAX(weight) from pokemon)`;
    let heaviestPoke = await sequelize.query(heaviestQuery);
    return heaviestPoke[0][0]
}
// heaviestPokemon().then((heaviestPoke)=>{
//     console.log(heaviestPoke.name,"the heviest Pokemon ",heaviestPoke.weight,"Kg");
// })

    // EX3
let findByType = async function(type){
    let pokeTypeQuery = `SELECT id FROM pokemon_type WHERE type = '${type}'`
    let pokemonTypeData =  await sequelize.query(pokeTypeQuery);
    let pokemonTypeId = pokemonTypeData[0][0].id;

    let heaviestQuery = `SELECT name FROM pokemon WHERE pokeType_id = ${pokemonTypeId}`;
    let heaviestPoke = await sequelize.query(heaviestQuery);
    return heaviestPoke[0]
}
// findByType("grass").then((pokemons) =>{
//     pokemons.forEach(pokemon => {
//         console.log(pokemon.name);
//     });
// })

    //EX4
let findOwners = async function(pokeName){
    let trainersArray = [];
    let pokeIdQuery = `SELECT id FROM pokemon WHERE name = '${pokeName}'`
    let pokemonIdData =  await sequelize.query(pokeIdQuery);
    let pokemonId = pokemonIdData[0][0].id;

    let trainerIdQuery = `SELECT trainerr_id FROM pokemon_trainer WHERE pokemon_id = ${pokemonId}`;
    let trainerId = await sequelize.query(trainerIdQuery);

    for(let trainer of trainerId[0]){
        let trainerNameQuery = `SELECT name FROM trainer WHERE id = ${trainer.trainerr_id}`;
        let trainerName = await sequelize.query(trainerNameQuery);
        trainersArray.push(trainerName[0][0].name)
    }
    return trainersArray;
}
// findOwners("gengar").then((trainers) =>{
//     trainers.forEach(trainer => {
//         console.log(trainer);
//     });
// })

    //EX5
let findRoster = async function(trainerName){
    let pokemonsArray = [];
    let trainerIdQuery = `SELECT id FROM trainer WHERE name = '${trainerName}'`
    let trainerIdData =  await sequelize.query(trainerIdQuery);
    let trainerId = trainerIdData[0][0].id;

    let pokemonIdQuery = `SELECT pokemon_id FROM pokemon_trainer WHERE trainerr_id = ${trainerId}`;
    let pokemonId = await sequelize.query(pokemonIdQuery);

    for(let pokemon of pokemonId[0]){
        let pokemonNamesQuery = `SELECT name FROM pokemon WHERE id = ${pokemon.pokemon_id}`;
        let pokemonName = await sequelize.query(pokemonNamesQuery);
        pokemonsArray.push(pokemonName[0][0].name)
    }
    return pokemonsArray; 
}
// findRoster("Loga").then((pokemons) =>{
//     pokemons.forEach(pokemon => {
//         console.log(pokemon);
//     });
// })

    //EX6
let mostOwned = async function(){
    let mostOwnedArray=[];
    let mostOwnedQuery = `SELECT pokemon_id, COUNT(pokemon_id) AS cnt 
                          FROM pokemon_trainer GROUP BY pokemon_id ORDER BY COUNT(pokemon_id) desc `
    let mostOwnedData = await sequelize.query(mostOwnedQuery);
    
    let maxOwned = mostOwnedData[0][0].cnt
    for(let mostOwned of mostOwnedData[0]){
        if(mostOwned.cnt < maxOwned){
            break;
        }
        else{
            let pokemonNameQuer = `SELECT name FROM pokemon WHERE id = ${mostOwned.pokemon_id}`;
            let pokemonData = await sequelize.query(pokemonNameQuer);
            mostOwnedArray.push(pokemonData[0][0].name);
        }
    }
    return mostOwnedArray;
}
mostOwned().then((mostOwnedPoke) => {
    console.log(mostOwnedPoke);
})