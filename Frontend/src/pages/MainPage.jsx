import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { Button } from "../styles";
//import CreateTeam from "/src/pages/CreateTeam"

function TeamList() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("/teams")
      .then((r) => r.json())
      .then(setTeams);
  }, []);

  return (
    <div>
      {teams.length > 0 ? (
        teams.map((team) => (
          <Team key={team.id}>
            <Box>
              <h2>{team.title}</h2>
              <ReactMarkdown>{team.pokemon.name}</ReactMarkdown>
            </Box>
          </Team>
        ))
      ) : (
        <>
          <h2>No Teams Found</h2>
          <Button as={Link} to="/create-team">
            Build a New Team
          </Button>
        </>
      )}
    </div>
  );
}
// still needs a logout button
export default TeamList;