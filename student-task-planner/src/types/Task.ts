export type Priority = "Low" | "Medium" | "High";

export type Task = {
  id: string;
  title: string;
  module: string;
  deadline: string;
  priority: Priority;
  completed: boolean;
};