import { useState } from "react";
import type { Priority, Task } from "../types/Task";

type TaskFormProps = {
  addTask: (task: Task) => void;
};

function TaskForm({ addTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [module, setModule] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !module.trim() || !deadline) {
      alert("Please fill in all fields.");
      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      module,
      deadline,
      priority,
      completed: false,
    };

    addTask(newTask);

    setTitle("");
    setModule("");
    setDeadline("");
    setPriority("Medium");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Module or course name"
        value={module}
        onChange={(e) => setModule(e.target.value)}
      />

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;