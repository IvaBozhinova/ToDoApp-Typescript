import { Task } from "./types";

type Props = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete?: (id: number) => void;
};

export const TaskItem = ({ task, onToggle, onDelete }: Props) => {
  return (
    <li
      onClick={() => onToggle(task.id)}
      className="task-item"
      style={{
        textDecoration: task.status === "completed" ? "line-through" : "none",
        cursor: "pointer",
      }}
    >
      <span className="task-title">
        {task.status === "completed" ? "✅" : "🎯"} {task.title}
      </span>

      {onDelete && (
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation(); // важно!
            onDelete(task.id);
          }}
        >
          🗑
        </button>
      )}
    </li>
  );
};
