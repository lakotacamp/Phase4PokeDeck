import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EditTeams() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [team, setTeam] = useState([]);
  const [newTeamName, setNewTeamName] = useState('');
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

  const handleRemoveFromTeam = (pokemonId) => {
    setTeam(prevTeam => prevTeam.filter(p => p.id !== pokemonId));
  };

  const handleSubmitTeam = (e) => {
    e.preventDefault();
    // You may want to add validation before submitting
    if (newTeamName && team.length > 0 && team.length <= 6) {
      const data = {
        team_name: newTeamName,
        // Assuming you want to send an array of selected Pokemon names
        pokemon_names: team.map(pokemon => pokemon.name),
      };

      fetch("/api/save-team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (response.ok) {
            setNewTeamName('');
            setTeam([]);
            navigate("/main-page");
          } else {
            throw new Error('Team creation failed');
          }
        })
        .catch(error => console.error('Error submitting team:', error));
    }
  };

  return (
    <div>
      <h1>Edit Team Page</h1>
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
            <li key={pokemon.id}>
              {pokemon.name}
              <button onClick={() => handleRemoveFromTeam(pokemon.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <form onSubmit={handleSubmitTeam}>
          <label>
            Team Name:
            <input type="text" value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)} />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      </div>
      <div>
        <button onClick={() => navigate("/main-page")}>Back</button>
      </div>
    </div>
  );
}

export default EditTeams;
