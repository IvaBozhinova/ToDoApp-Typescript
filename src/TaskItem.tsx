
import { Task } from "./types";

type Props = {
  task: Task;
  onToggle: (id: number) => void;
};

export const TaskItem = ({ task, onToggle }: Props) => {
  return (
    <li
      onClick={() => onToggle(task.id)}
      style={{
        textDecoration: task.status === "completed" ? "line-through" : "none",
        cursor: "pointer",
      }}
    >
      {task.title}
    </li>
  );
};
