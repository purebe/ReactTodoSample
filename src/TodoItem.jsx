import { useState } from 'react';

export function TodoItem({ task, deleteTask }) {
  const [done, setDone] = useState(task.done);
  const [text, setText] = useState(task.text);
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = (e) => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setText(e.currentTarget.value);
  };

  const handleToggleDone = (e) => {
    setDone(!done);
  };

  const decorator = {
    textDecorationLine: done ? 'line-through' : ''
  };

  return (
    <div style={{display:'flex', alignItems: 'center'}}>
      {isEditing || <div key={task.id} style={decorator}>{text}</div>}
      {isEditing && <input value={text} onChange={handleChange} />}
      <input type="checkbox" checked={done} onChange={handleToggleDone} />
      <button onClick={handleClick}>Edit</button>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
};
