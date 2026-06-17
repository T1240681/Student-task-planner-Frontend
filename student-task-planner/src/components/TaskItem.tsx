import type { Priority, Task } from "../types/Task";

type TaskItemProps = {
  task: Task;
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (
    id: string,
    updatedTask: {
      title: string;
      module: string;
      deadline: string;
      priority: Priority;
    }
  ) => void;
};

function TaskItem({ task, toggleComplete, deleteTask, editTask }: TaskItemProps) {
  function handleEdit() {
    const newTitle = prompt("Edit task title:", task.title);
    const newModule = prompt("Edit module/course:", task.module);
    const newDeadline = prompt("Edit deadline YYYY-MM-DD:", task.deadline);
    const newPriority = prompt("Edit priority: Low, Medium, or High", task.priority);

    if (!newTitle || !newModule || !newDeadline || !newPriority) {
      return;
    }

    if (
      newPriority !== "Low" &&
      newPriority !== "Medium" &&
      newPriority !== "High"
    ) {
      alert("Priority must be Low, Medium, or High.");
      return;
    }

    editTask(task.id, {
      title: newTitle,
      module: newModule,
      deadline: newDeadline,
      priority: newPriority,
    });
  }

  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div>
        <h3>{task.title}</h3>
        <p><strong>Module:</strong> {task.module}</p>
        <p><strong>Deadline:</strong> {task.deadline}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Status:</strong> {task.completed ? "Completed" : "Not completed"}</p>
      </div>

      <div className="task-actions">
        <button onClick={() => toggleComplete(task.id)}>
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={handleEdit}>Edit</button>
        <button className="delete-btn" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;