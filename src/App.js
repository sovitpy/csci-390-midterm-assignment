import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Reminder from './components/Reminder';
// TODO: import the Reminder component
// TODO: import the Header component

function App() {
  // this is the object to define the properties of a reminder
  const initialReminder = { title: '', completed: false, id: 0 };

  // state variables for a reminder
  const [reminder, setReminder] = useState(initialReminder);

  // state variable that stores the list of reminders
  const [reminders, setReminders] = useState([]);

  // state variable used to toggle between displaying the oustanding or completed reminders on the page
  const [showCompletedReminders, setShowCompletedReminders] = useState(false);

  // Helper Functions

  function setNewReminder(e) {
    const newReminder = {
      title: e.target.value,
      completed: false,
      id: Math.floor(Math.random() * 1000),
    };
    setReminder(newReminder);
  }

  function addReminder() {
    if (reminder.title) {
      setReminders((prev) => [...prev, reminder]);
      setReminder(initialReminder);
    }
  }

  function completeReminder(id) {
    const newReminders = reminders.map((reminder) => {
      if (reminder.id === id) {
        reminder.completed = true;
      }
      return reminder;
    });
    setReminders(newReminders);
  }

  function displayedReminders() {
    const completedList = reminders.filter((e) => e.completed === true);
    const incompleteList = reminders.filter((e) => e.completed === false);
    return showCompletedReminders ? completedList : incompleteList;
  }

  function deleteReminder(id) {
    const newReminders = reminders.filter((e) => e.id !== id);
    setReminders(newReminders);
  }

  // Main part of app
  return (
    <div className="app">
      <Header />
      <input
        type="text"
        placeholder="Add a new reminder.."
        value={reminder.title}
        onChange={(e) => setNewReminder(e)}
      />
      <button onClick={addReminder}>Add Reminder</button>

      <div>
        <p>
          Showing : {showCompletedReminders ? 'Completed' : 'Outstanding'}{' '}
          reminders
        </p>
        <p>
          Click to{' '}
          <button
            onClick={() =>
              setShowCompletedReminders((showCompleted) => !showCompleted)
            }
          >
            Show {showCompletedReminders ? 'outstanding' : 'completed'}{' '}
            reminders
          </button>
        </p>
      </div>

      {displayedReminders().map((reminder, idx) => (
        <div key={idx}>
          <Reminder
            showCompletedReminders={showCompletedReminders}
            reminder={reminder}
          />{' '}
          {!reminder.completed && (
            <button
              onClick={() => completeReminder(reminder.id)}
              className="my-button"
            >
              Complete ✅
            </button>
          )}
          <button
            onClick={() => deleteReminder(reminder.id)}
            className="my-button"
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
