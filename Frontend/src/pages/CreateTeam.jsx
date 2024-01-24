import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateTeams() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [team, setTeam] = useState([]);
  const navigate = useNavigate();

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
    if (selectedPokemon && team.length < 6 && !team.some(p => p.id === selectedPokemon.id)) {
      setTeam(prevTeam => [...prevTeam, selectedPokemon]);
      setSelectedPokemon(null);
    }
  };

  const submitTeam = async () => {
    try {
      const team_name = team.name; 
      const selected_pokemons = team.map(pokemon => ({ pokemon_id: pokemon.id }));
  
      const response = await fetch('/save-team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: team_name,
          selected_pokemons: selected_pokemons,
        }),
      });
  
      if (response.ok) {
        console.log('Team saved successfully!');
        navigate('/main-page');
      } else {
        console.error('Failed to save team:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving team:', error);
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
        <button onClick={handleAddToTeam} disabled={!selectedPokemon || team.length === 6}>
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
      <div>
        <button onClick={submitTeam}>Save Team</button>
      </div>
      <div>
        <button onClick={() => navigate('/main-page')}>Teams Page</button>
      </div>
    </div>
  );
}

export default CreateTeams;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// function CreateTeams() {
//   const [pokemonList, setPokemonList] = useState([]);
//   const [selectedPokemon, setSelectedPokemon] = useState(null);
//   const [team, setTeam] = useState([]);
//   const navigate = useNavigate()

//   useEffect(() => {
//     fetch("/api/pokemon")
//       .then(r => r.json())
//       .then(response => {
//         setPokemonList(response);
//       })
//       .catch(error => {
//         console.error('Error fetching Pokémon:', error);
//       });
//   }, []);

//   const handlePokemonClick = (pokemon) => {
//     setSelectedPokemon(pokemon);
//   };

//   const handleAddToTeam = () => {
//     if (selectedPokemon && team.length < 6) {
//       setTeam(prevTeam => [...prevTeam, selectedPokemon]);
//       setSelectedPokemon(null);
//     }
//   };

//   return (
//     <div>
//       <h1>Create Teams Page</h1>
//       <ul>
//         {pokemonList.map(pokemon => (
//           <li key={pokemon.id} onClick={() => handlePokemonClick(pokemon)}>
//             {pokemon.name}
//           </li>
//         ))}
//       </ul>
//       <div>
//         <h2>Selected Pokémon: {selectedPokemon ? selectedPokemon.name : 'None'}</h2>
//         <button onClick={handleAddToTeam} disabled={!selectedPokemon || team.length === 6}>
//           Add to Team
//         </button>
//       </div>
//       <div>
//         <h2>Selected Team:</h2>
//         <ul>
//           {team.map(pokemon => (
//             <li key={pokemon.id}>{pokemon.name}</li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <button onSubmit={()=>{navigate("/main-page")}}>Save Team</button>
//       </div>
//       <div>
//         <button onClick={()=>{navigate("/main-page")}}>Teams Page</button>
//       </div>
//     </div>
//   );
// }

// export default CreateTeams;