import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_ACTIVITIES = gql`
  query GetActivities {
    activities {
      _id
      title
      scenarioText
      category
      choices {
        text
        isCorrect
        feedback
      }
    }
  }
`;

function Homepage() {
  const { loading, error, data } = useQuery(GET_ACTIVITIES);

  if (loading) return <p>Loading scenarios...</p>;
  if (error) return <p>Error loading scenarios.</p>;

  // ✅ Filter out broken / empty scenarios
  const scenarios = (data?.activities ?? []).filter(
    (s) => s.title && s.scenarioText
  );

  return (
    <main className="main">
      
      {/* 🟢 HERO SECTION */}
      <div className="hero">
        <h1 className="heroTitle">Moral Compass</h1>
        <p className="heroSubtitle">
          Build better habits through real-life ethical decisions
        </p>

        {scenarios.length > 0 && (
          <Link
            to={`/scenario/${scenarios[0]._id}`}
            className="heroBtn"
          >
            Start Learning
          </Link>
        )}
      </div>

      {/* 🟢 SCENARIO LIST */}
      <div className="homepageLayout">
        {scenarios.map((scenario) => (
          <div key={scenario._id} className="scenarioCard">
            <h2>{scenario.title}</h2>
            <p>{scenario.scenarioText}</p>

            <Link
              to={`/scenario/${scenario._id}`}
              className="startBtn"
            >
              Start
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Homepage;