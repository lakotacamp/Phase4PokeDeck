import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateTeams() {
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

  const handleSubmitTeam = (e) => {
    e.preventDefault();
    if (newTeamName && team.length > 0 && team.length <= 6) {
      const data = {
        team_name: newTeamName,
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
      <h1 className='createTeams'>Create Teams Page</h1>
      <ul className = "pokemonList">
        {pokemonList.map(pokemon => (
          <li key={pokemon.id}style={{listStyleType:"None"}} onClick={() => handlePokemonClick(pokemon)}>
            {pokemon.name}
          </li>
        ))}
      </ul>
      <div className = "select">
        <h2 className='selectedPokemon'> Selected Pokemon: {selectedPokemon ? selectedPokemon.name : 'None'}</h2>
        <button className="addToTeam" onClick={handleAddToTeam} disabled={!selectedPokemon || team.length === 6}>
          Add to Team
        </button>
      </div>
      <div>
        <h2 className='selectedTeam'>Selected Team:</h2>
        <ul classname = "pokemon">
          {team.map(pokemon => (
            <li key={pokemon.id}>{pokemon.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <form onSubmit={handleSubmitTeam}>
          <label>
            New Team Name:
            <input type="text" value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)} />
          </label>
          <button type="submit">Save Team</button>
        </form>
      </div>
      <div>
        <button onClick={() => navigate("/main-page")}>Home</button>
      </div>
    </div>
  );
}

export default CreateTeams;
