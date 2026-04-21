import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_ACTIVITIES = gql`
  query GetActivities {
    activities {
      _id
      title
      scenarioText
      category
    }
  }
`;

function Homepage() {
  const { loading, error, data } = useQuery(GET_ACTIVITIES);

  if (loading) return <p>Loading scenarios...</p>;
  if (error) return <p>Error loading scenarios.</p>;

  const scenarios = data?.activities ?? [];

  return (
    <main className="main">
      <h1>Moral Compass</h1>
      <h3>Choose a scenario to begin</h3>

      <div className="homepageLayout">
        {scenarios.map((scenario) => (
          <div key={scenario._id} className="scenarioCard">
            <h2>{scenario.title}</h2>
            <p>{scenario.scenarioText}</p>
            <Link to={`/scenario/${scenario._id}`} className="startBtn">
              Start
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Homepage;