import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_ACTIVITY } from '../utils/queries';

const SingleActivity = () => {
  const { activityid } = useParams();

  const { loading, data, error } = useQuery(QUERY_SINGLE_ACTIVITY, {
    variables: { activityid },
  });

  const activity = data?.activity || null;

  if (loading) {
    return <div>Loading scenario...</div>;
  }

  if (error) {
    return <div>Something went wrong loading this scenario.</div>;
  }

  if (!activity) {
    return <div>Scenario not found.</div>;
  }

  return (
    <main style={{ padding: '20px' }}>
      <h1>{activity.title || 'Untitled Scenario'}</h1>

      <p style={{ marginTop: '15px' }}>
        {activity.scenarioText || activity.description || 'No scenario text yet.'}
      </p>

      {activity.category && (
        <p>
          <strong>Category:</strong> {activity.category}
        </p>
      )}

      <h2 style={{ marginTop: '25px' }}>Choices</h2>

      {activity.choices && activity.choices.length > 0 ? (
        <ul>
          {activity.choices.map((choice, index) => (
            <li key={index}>{choice}</li>
          ))}
        </ul>
      ) : (
        <p>No choices added yet.</p>
      )}

      {activity.explanation && (
        <div style={{ marginTop: '25px' }}>
          <h2>Explanation</h2>
          <p>{activity.explanation}</p>
        </div>
      )}
    </main>
  );
};

export default SingleActivity;