import { useState } from "react";
import { Task, Status } from "./types";
import { useEffect } from "react";
export function useTasks(initial: Task[] = []) {

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : initial;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const [filter, setFilter] = useState<Status | "all">("all");

  const reorderTasks = (updated: Task[]) => {
  setTasks(updated);
};

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      status: Status.Active,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === Status.Active
                  ? Status.Completed
                  : Status.Active,
            }
          : task
      )
    );
  };



  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : task.status === filter
  );


const deleteTask = (id: number) => {
  setTasks((prev) => prev.filter((task) => task.id !== id));
};

return {
  tasks,
  reorderTasks,
  addTask,
  toggleTask,
  deleteTask, // добавяме я тук
  setFilter,
  filter,
};


}
