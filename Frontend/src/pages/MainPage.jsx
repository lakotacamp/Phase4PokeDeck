import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { Button } from "../styles";
//import CreateTeam from "/src/pages/CreateTeam"

function TeamList() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("/api/teams")
      .then((r) => r.json())
      .then(setTeams);
  }, []);

  return (
    <div>
      {teams.length > 0 ? (
            <ul>
              {teams.map(team => (
                <li>
                  {team.name}
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
  );
}
// still needs a logout button
export default TeamList;
