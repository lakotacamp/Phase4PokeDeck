

import React, { useState, useEffect } from 'react';

function CreateTeams () {
  const [pokemonList, setPokemonList] = useState([]);
  useEffect(() => {
    
    fetch ("/api/pokemon")
      .then(r=>r.json())
      .then(response => {
        console.log(response)
        setPokemonList(response);
      })
      .catch(error => {
        console.error('Error fetching Pokémon:', error);
      });
  }, []); 

  return (
    <div>
      <h1>Create Teams Page</h1>
      <ul>
        {pokemonList.map(pokemon => (
          <li key={pokemon.id}>
            {pokemon.name}
            </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateTeams;