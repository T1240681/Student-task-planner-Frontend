import type { Priority, Task } from "../types/Task";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
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

function TaskList({
  tasks,
  toggleComplete,
  deleteTask,
  editTask,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="empty-message">No tasks found.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
}

export default TaskList;