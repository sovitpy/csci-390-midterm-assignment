import React from 'react';

function Reminder(props) {
  return (
    <>
      {props.showCompletedReminders ? (
        <s>{props.reminder.title}</s>
      ) : (
        <span>{props.reminder.title}</span>
      )}
    </>
  );
}

export default Reminder;
