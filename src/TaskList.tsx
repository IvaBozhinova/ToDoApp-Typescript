import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Task } from "./types";
import { TaskItem } from "./TaskItem"; // 👉 внасяме TaskItem

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onReorder: (updated: Task[]) => void;
  onDelete?: (id: number) => void;
}

export function TaskList({ tasks, onToggle, onReorder, onDelete }: TaskListProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = [...tasks];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    onReorder(reordered);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskItem
                      task={task}
                      onToggle={onToggle}
                      onDelete={onDelete}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
