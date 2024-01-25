import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../styles";

function TeamList({user}) {
  // const [teams, setTeams] = useState([]);

  // useEffect(() => {
  //   fetch(`/api/teams/${teamId}`)
  //     .then((r) => r.json())
  //     .then(setTeams);
  // }, []);

  const deleteTeam = (teamId) => {
    fetch(`/api/teams/${teamId}`, {
      method: "DELETE",
    }).then(() => {
      setTeams((deletedTeams) =>
        deletedTeams.filter((team) => team.id !== teamId)
      );
    });
  };
  console.log(user?.team)

  return (
    <div className="Wrapper">
      <h1 className="Logo">PokeDecks</h1>
      <div>
        {user?.team?.length > 0 ? (
          <ul>
            {user.team.map((team) => (
              <li key={team.id}>
                {team.name}
                <button onClick={() => deleteTeam(team.id)}>🗑️</button>
                <Button as={Link} to={`/edit-team/${team.id}`}>
                  View
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <h2>No Teams Found</h2>
          </>
        )}
        <Button as={Link} to="/create-team">
          Build a New Team
        </Button>
      </div>
    </div>
  );
}

export default TeamList;