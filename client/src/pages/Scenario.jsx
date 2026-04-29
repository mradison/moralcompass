import { gql, useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const GET_ACTIVITIES = gql`
  query GetActivities {
    activities {
      _id
      title
      scenarioText
      choices {
        text
        isCorrect
        feedback
      }
    }
  }
`;

function Scenario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_ACTIVITIES);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);

  // ✅ Persistent XP + streak
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem("xp")) || 0);
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem("streak")) || 0);

  useEffect(() => {
    localStorage.setItem("xp", xp);
  }, [xp]);

  useEffect(() => {
    localStorage.setItem("streak", streak);
  }, [streak]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading scenarios</p>;

  const scenarios = data.activities;

  // ✅ Sync URL with scenario index
  useEffect(() => {
    const index = scenarios.findIndex((s) => s._id === id);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [id, scenarios]);

  const scenario = scenarios[currentIndex];

  const handleChoice = (choice) => {
    setSelected(choice);

    if (choice.isCorrect) {
      setXp((prev) => prev + 10);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setSelected(null);

    if (currentIndex < scenarios.length - 1) {
      const next = scenarios[currentIndex + 1];
      navigate(`/scenario/${next._id}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="scenarioPage">

      {/* ✅ Progress Bar */}
      <div className="progressBar">
        <div
          className="progressFill"
          style={{
            width: `${((currentIndex + 1) / scenarios.length) * 100}%`
          }}
        />
      </div>

      <h2>{scenario.title}</h2>
      <p>{scenario.scenarioText}</p>

      {/* ✅ Stats */}
      <div className="stats">
        <h3>XP: {xp}</h3>
        <h3>🔥 Streak: {streak}</h3>
      </div>

      {/* ✅ Choices */}
      <div className="choices">
        {scenario.choices.map((choice, index) => {
          let className = "choiceBtn";

          if (selected) {
            if (choice.isCorrect) className += " correct";
            else if (choice === selected) className += " wrong";
            else className += " disabled";
          }

          return (
            <button
              key={index}
              onClick={() => handleChoice(choice)}
              disabled={selected !== null}
              className={className}
            >
              {choice.text}
            </button>
          );
        })}
      </div>

      {/* ✅ Feedback */}
      {selected && (
        <div className="feedback">
          <h3>
            {selected.isCorrect ? "✅ Correct!" : "❌ Not quite"}
          </h3>
          <p>{selected.feedback}</p>

          <button onClick={handleNext} className="nextBtn">
            {currentIndex === scenarios.length - 1
              ? "Finish"
              : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Scenario;