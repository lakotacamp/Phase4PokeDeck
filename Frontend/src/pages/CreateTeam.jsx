

// // import React, { useState, useEffect } from 'react';

// // // function CreateTeams () {
// // //   const [pokemonList, setPokemonList] = useState([]);
// // //   useEffect(() => {
    
// // //     fetch ("/api/pokemon")
// // //       .then(r=>r.json())
// // //       .then(response => {
// // //         console.log(response)
// // //         setPokemonList(response);
// // //       })
// // //       .catch(error => {
// // //         console.error('Error fetching Pokémon:', error);
// // //       });
// // //   }, []); 


  
//   return (
//     <div>
//       <h1>Create Teams Page</h1>
//       <ul>
//         {pokemonList.map(pokemon => (
//           <li key={pokemon.id}>
//             {pokemon.name}
//             </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CreateTeams;

import React, { useState, useEffect } from 'react';

function CreateTeams() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch("/api/pokemon")
      .then(r => r.json())
      .then(response => {
        setPokemonList(response);
      })
      .catch(error => {
        console.error('Error fetching Pokémon:', error);
      });
  }, []);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleAddToTeam = () => {
    if (selectedPokemon) {
      setTeam(prevTeam => [...prevTeam, selectedPokemon]);
      setSelectedPokemon(null);
    }
  };

  return (
    <div>
      <h1>Create Teams Page</h1>
      <ul>
        {pokemonList.map(pokemon => (
          <li key={pokemon.id} onClick={() => handlePokemonClick(pokemon)}>
            {pokemon.name}
          </li>
        ))}
      </ul>
      <div>
        <h2>Selected Pokémon: {selectedPokemon ? selectedPokemon.name : 'None'}</h2>
        <button onClick={handleAddToTeam} disabled={!selectedPokemon}>
          Add to Team
        </button>
      </div>
      <div>
        <h2>Selected Team:</h2>
        <ul>
          {team.map(pokemon => (
            <li key={pokemon.id}>{pokemon.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CreateTeams;