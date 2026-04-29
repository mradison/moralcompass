import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const GET_ACTIVITIES = gql`
  query GetActivities {
    activities {
      _id
      title
      scenarioText
    }
  }
`;

const ADD_ACTIVITY = gql`
  mutation AddActivity($newActivity: inputactivityInfo) {
    addActivity(newActivity: $newActivity) {
      _id
      title
    }
  }
`;

const DELETE_ACTIVITY = gql`
  mutation DeleteActivity($activityid: ID!) {
    deleteActivity(activityid: $activityid) {
      _id
    }
  }
`;

function Admin() {
  const [formData, setFormData] = useState({
    title: "",
    scenarioText: "",
    choice1: "",
    choice2: "",
    correctChoice: "0",
    feedback1: "",
    feedback2: "",
  });

  const { data, refetch } = useQuery(GET_ACTIVITIES);
  const [addActivity] = useMutation(ADD_ACTIVITY);
  const [deleteActivity] = useMutation(DELETE_ACTIVITY);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const choices = [
        {
          text: formData.choice1,
          isCorrect: formData.correctChoice === "0",
          feedback: formData.feedback1,
        },
        {
          text: formData.choice2,
          isCorrect: formData.correctChoice === "1",
          feedback: formData.feedback2,
        },
      ];

      await addActivity({
        variables: {
          newActivity: {
            title: formData.title,
            scenarioText: formData.scenarioText,
            choices,
            order: Date.now(),
            xpReward: 10,
          },
        },
      });

      alert("Scenario added!");

      setFormData({
        title: "",
        scenarioText: "",
        choice1: "",
        choice2: "",
        correctChoice: "0",
        feedback1: "",
        feedback2: "",
      });

      refetch();
    } catch (err) {
      console.error(err);
      alert("Error adding scenario");
    }
  };

  return (
    <div className="scenarioPage">
      <h2>Admin Panel</h2>

      {/* ================= FORM ================= */}
      <h3>Add New Scenario</h3>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          name="scenarioText"
          placeholder="Scenario text"
          value={formData.scenarioText}
          onChange={handleChange}
        />

        <h4>Choices</h4>

        <input
          name="choice1"
          placeholder="Choice 1"
          value={formData.choice1}
          onChange={handleChange}
        />
        <input
          name="feedback1"
          placeholder="Feedback for choice 1"
          value={formData.feedback1}
          onChange={handleChange}
        />

        <input
          name="choice2"
          placeholder="Choice 2"
          value={formData.choice2}
          onChange={handleChange}
        />
        <input
          name="feedback2"
          placeholder="Feedback for choice 2"
          value={formData.feedback2}
          onChange={handleChange}
        />

        <label>Correct Choice:</label>
        <select
          name="correctChoice"
          value={formData.correctChoice}
          onChange={handleChange}
        >
          <option value="0">Choice 1</option>
          <option value="1">Choice 2</option>
        </select>

        <button type="submit">Add Scenario</button>
      </form>

      {/* ================= LIST ================= */}
      <h3 style={{ marginTop: "40px" }}>Existing Scenarios</h3>

      {data?.activities?.map((scenario) => (
        <div key={scenario._id} className="scenarioCard">
          <h4>{scenario.title}</h4>
          <p>{scenario.scenarioText}</p>

          <button
            style={{
              marginTop: "10px",
              background: "red",
              color: "white",
              padding: "8px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={async () => {
              await deleteActivity({
                variables: { activityid: scenario._id },
              });
              refetch();
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;