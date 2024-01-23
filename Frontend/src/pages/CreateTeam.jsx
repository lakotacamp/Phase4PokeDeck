

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateTeams () {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    
    axios.get("http://localhost:5555/api/pokemon")
      // .then(r=>r.json())
      .then(response => {
        setPokemonList(response.data);
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