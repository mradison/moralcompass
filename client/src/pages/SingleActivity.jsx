import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { QUERY_SINGLE_ACTIVITY } from '../utils/queries';

const SingleActivity = () => {
  const { activityid } = useParams();
  const { loading, data, error } = useQuery(QUERY_SINGLE_ACTIVITY, {
    variables: { activityid },
  });

  const activity = data?.activity || {};
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(1);

  if (loading) return <p>Loading scenario...</p>;
  if (error) return <p>Could not load this scenario.</p>;

  const handleChoice = () => {
    if (showFeedback) return;
    setShowFeedback(true);
    setXp((prev) => prev + 10);
    setStreak((prev) => prev + 1);
  };

  return (
    <main className="main">
      <div className="gameHeader">
        <div className="gameStat">🔥 Streak: {streak}</div>
        <div className="gameStat">⭐ XP: {xp}</div>
      </div>

      <div className="progressWrap">
        <div className="progressBar">
          <div className="progressFill" />
        </div>
        <p className="progressText">Lesson 1 of 1</p>
      </div>

      <div className="scenarioCard scenarioCardGame">
        <h1>{activity.title || 'Untitled Scenario'}</h1>
        <p className="scenarioText">
          {activity.scenarioText || activity.description || 'No scenario text yet.'}
        </p>

        <h3>What would you do?</h3>

        <div className="choices">
          {activity.choices?.length > 0 ? (
            activity.choices.map((choice, index) => (
              <button
                key={index}
                className={`choiceBtn ${selectedChoice === choice ? 'choiceSelected' : ''}`}
                onClick={() => {
                  setSelectedChoice(choice);
                  handleChoice();
                }}
              >
                {choice}
              </button>
            ))
          ) : (
            <p>No choices added yet.</p>
          )}
        </div>

        {showFeedback && (
          <div className="explanationBox fadeIn">
            <h2>Nice work</h2>
            <p>{activity.explanation || 'Reflection helps you grow.'}</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default SingleActivity;