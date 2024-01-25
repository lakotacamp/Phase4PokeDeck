import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditTeams() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [team, setTeam] = useState([]);
  const [newTeamName, setNewTeamName] = useState('');
  const navigate = useNavigate();
  const { teamId } = useParams();

  useEffect(() => {
    fetch(`/api/teams/${teamId}`)
      .then((response) => response.json())
      .then((teamData) => {
        setNewTeamName(teamData.name);
        setTeam(teamData.poke_teams.map((pokeTeam) => pokeTeam.pokemon));
      })
      .catch((error) => {
        console.error('Error fetching team details:', error);
      });

    fetch("/api/pokemon")
      .then((response) => response.json())
      .then((response) => {
        setPokemonList(response);
      })
      .catch((error) => {
        console.error('Error fetching Pokémon:', error);
      });
  }, [teamId]);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleAddToTeam = () => {
    if (selectedPokemon && team.length < 6 && !team.some((p) => p.id === selectedPokemon.id)) {
      setTeam((prevTeam) => [...prevTeam, selectedPokemon]);
      setSelectedPokemon(null);
    }
  };

  const handleRemoveFromTeam = (pokemonId) => {
    setTeam((prevTeam) => prevTeam.filter((p) => p.id !== pokemonId));
  };

  const handleSubmitTeam = (e) => {
    e.preventDefault();
    if (newTeamName && team.length > 0 && team.length <= 6) {
      const data = {
        team_id: teamId, // Include the team ID in the data payload
        team_name: newTeamName,
        pokemon_names: team.map(pokemon => pokemon.name),
      };
  
      fetch(`/api/save-team`, {
        method: "PATCH", // Use PATCH method instead of POST
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
            throw new Error('Team update failed');
          }
        })
        .catch(error => console.error('Error updating team:', error));
    }
  };

//     const handleSubmitTeam = (e) => {
//     e.preventDefault();
//     if (newTeamName && team.length > 0 && team.length <= 6) {
//         const data = {
//             team_name: newTeamName,
//             pokemon_names: team.map(pokemon => pokemon.name),
//         };

//         fetch("/api/save-team", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         })
//             .then(response => {
//                 if (response.ok) {
//                     setNewTeamName('');
//                     setTeam([]);
//                     navigate("/main-page");
//                 } else {
//                     throw new Error('Team creation failed');
//                 }
//             })
//             .catch(error => console.error('Error submitting team:', error));
//     }
// };
  
  return (
    <div>
      <h1>Edit Team Page</h1>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id} onClick={() => handlePokemonClick(pokemon)}>
            {pokemon.name}
          </li>
        ))}
      </ul>
      <div>
        <h2>Selected Pokemon: {selectedPokemon ? selectedPokemon.name : 'None'}</h2>
        <button onClick={handleAddToTeam} disabled={!selectedPokemon || team.length === 6}>
          Add to Team
        </button>
      </div>
      <div>
        <h2>Selected Team:</h2>
        <ul>
          {team.map((pokemon) => (
            <li key={pokemon.id}>
              {pokemon.name}
              <button className="trashbutton" onClick={() => handleRemoveFromTeam(pokemon.id)}>🗑️</button>
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