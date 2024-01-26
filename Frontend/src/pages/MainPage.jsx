import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../styles";

function TeamList({ user }) {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (user && user.team) {
      setTeams(user.team);
    }
  }, [user]);

  const deleteTeam = (teamId) => {
    fetch(`/api/teams/${teamId}`, {
      method: "DELETE",
    })
      .then(() => {
        setTeams((deletedTeams) =>
          deletedTeams.filter((team) => team.id !== teamId)
        );
      })
      .catch((error) => console.error("Error deleting team:", error));
  };

  console.log(user?.team);

  return (
    <div className="Wrapper">
      {/* <h1 className="Logo">PokeDecks</h1> */}
      <div>
        {user?.team?.length > 0 ? (
          <ul>
            {teams.map((team) => (
              <li key={team.id} className="Teamlist" style={{listStyleType:"None"}}>
                <span className="teamName">{team.name}</span>
                <button onClick={() => deleteTeam(team.id)} className="login" >🗑️</button>
                <Button className="view" as={Link} to={`/edit-team/${team.id}`}>
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
