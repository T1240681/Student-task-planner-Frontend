import { useEffect, useMemo, useState } from "react";
import "./App.css";
import type { Priority, Task } from "./types/Task";
import TaskForm from "./components/TaskForm";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";

type FilterStatus = "All" | "Completed" | "Not Completed";

const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Presentation",
    module: "Project management",
    deadline: "2026-07-01",
    priority: "High",
    completed: false,
  },
  {
    id: "2",
    title: "Interview",
    module: "Career Preparation",
    deadline: "2026-06-25",
    priority: "Medium",
    completed: true,
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("studentTasks");
    return savedTasks ? JSON.parse(savedTasks) : sampleTasks;
  });

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("All");
  const [priorityFilter, setPriorityFilter] = useState<"All" | Priority>("All");

  useEffect(() => {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(task: Task) {
    setTasks([task, ...tasks]);
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleComplete(id: string) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function editTask(
    id: string,
    updatedTask: {
      title: string;
      module: string;
      deadline: string;
      priority: Priority;
    }
  ) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchText.toLowerCase()) ||
        task.module.toLowerCase().includes(searchText.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Completed" && task.completed) ||
        (statusFilter === "Not Completed" && !task.completed);

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchText, statusFilter, priorityFilter]);

  return (
    <main className="app-container">
      <section className="hero-section">
        <h1>Student Task Planner</h1>
        <p>
          Manage coursework and personal tasks with priority levels, filters,
          completion tracking, and browser storage.
        </p>
      </section>

      <section className="form-card">
        <h2>Add New Task</h2>
        <p className="section-description">
          Fill in the task details below and add it to your planner.
        </p>

        <TaskForm addTask={addTask} />
      </section>

      <section className="list-card">
        <div className="list-header">
          <div>
            <h2>My Tasks</h2>
            <p className="section-description">
              Search, filter, edit, complete, or delete your tasks.
            </p>
          </div>
        </div>

        <div className="tools-row">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
          <FilterBar
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />
        </div>

        <TaskList
          tasks={filteredTasks}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </section>
    </main>
  );
}

export default App;