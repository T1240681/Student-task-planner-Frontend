import type { Priority } from "../types/Task";

type FilterStatus = "All" | "Completed" | "Not Completed";

type FilterBarProps = {
  statusFilter: FilterStatus;
  setStatusFilter: (value: FilterStatus) => void;
  priorityFilter: "All" | Priority;
  setPriorityFilter: (value: "All" | Priority) => void;
};

function FilterBar({
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
      >
        <option value="All">All Tasks</option>
        <option value="Completed">Completed</option>
        <option value="Not Completed">Not Completed</option>
      </select>

      <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value as "All" | Priority)}
      >
        <option value="All">All Priorities</option>
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>
    </div>
  );
}

export default FilterBar;