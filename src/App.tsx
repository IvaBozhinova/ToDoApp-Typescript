import { useState } from "react";
import { useTasks } from "./useTasks";
import { TaskList } from "./TaskList";
import { ConfirmModal } from "./ConfirmModal";
import { Filter } from "./types";
import Calendar from "./Calendar"; // 🆕

export default function App() {
  const { tasks, reorderTasks, addTask, toggleTask, deleteTask } = useTasks();
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const [modalVisible, setModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  // 🆕 Нов state за календар задачи
  const [calendarTasks, setCalendarTasks] = useState<Record<string, string[]>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [calendarInput, setCalendarInput] = useState("");


  const [showAllCalendarTasks, setShowAllCalendarTasks] = useState(false);

  const handleCalendarTaskAdd = () => {
    if (!selectedDate || !calendarInput.trim()) return;
    setCalendarTasks((prev) => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), calendarInput],
    }));
    setCalendarInput("");
  };

  const handleAdd = () => {
    if (input.trim()) {
      addTask(input);
      setInput("");
    }
  };

  const handleDeleteClick = (id: number) => {
    setTaskToDelete(id);
    setModalVisible(true);
  };

  const confirmDelete = () => {
    if (taskToDelete !== null) {
      deleteTask(taskToDelete);
      setTaskToDelete(null);
    }
    setModalVisible(false);
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
    setModalVisible(false);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div className="page-wrapper">
      <p className="floating-text top-left">✨ Stay focused ✨</p>
      <p className="floating-text bottom-right">🚀 You got this!</p>
      <p className="floating-text top-right">📋 Plan. Do. Repeat.</p>

      <div className="container">
        <h1>ToDo List</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New task"
        />
        <button onClick={handleAdd}>Add</button>

        <div>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
        </div>

        <div className="stats-box">
          <p>📋 Total: {tasks.length}</p>
          <p>✅ Completed: {tasks.filter(t => t.status === "completed").length}</p>
          <p>🕓 Active: {tasks.filter(t => t.status === "active").length}</p>
        </div>

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={handleDeleteClick}
          onReorder={reorderTasks}
        />

        <ConfirmModal
          visible={modalVisible}
          message="Сигурен ли си, че искаш да изтриеш задачата?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      </div>

      {/* 🆕 СЕКЦИЯ ЗА КАЛЕНДАР */}
    <div className="calendar-section">
  <h2>📅 Daily Tasks</h2>
  <Calendar onSelectDate={(date) => setSelectedDate(date)} />

  {/* Бутонът се вижда винаги */}
  <div style={{ display: "flex", gap: "14px", marginTop: "10px", justifyContent: "center"}}>
    <button onClick={() => setShowAllCalendarTasks((prev) => !prev)}>
      {showAllCalendarTasks ? "Hide All Daily Tasks" : "Show All Daily Tasks"}
    </button>
  </div>

  {selectedDate && (
    <div className="calendar-task-box">
      <h3>Tasks for {selectedDate}</h3>
      <input
        type="text"
        placeholder="Add today's task"
        value={calendarInput}
        onChange={(e) => setCalendarInput(e.target.value)}
      />
      <div style={{ display: "flex", gap: "10px", marginTop: "10px",justifyContent: "center" }}>
        <button onClick={handleCalendarTaskAdd}>Add</button>
      </div>

      <ul>
        {(calendarTasks[selectedDate] || []).map((task, idx) => (
          <li key={idx}>
            {task} --- {selectedDate}
          </li>
        ))}
      </ul>
    </div>
  )}

  {showAllCalendarTasks && (
    <div className="all-calendar-tasks" >
      <h3>📆 All Daily Tasks</h3>
      {Object.keys(calendarTasks).length === 0 ? (
        <p>No tasks added.</p>
      ) : (
        <ul>
          {Object.entries(calendarTasks).map(([date, tasks]) => (
            <li key={date} style={{
    marginTop: "20px",
    backgroundColor: "#e6ccff", 
  
    borderRadius: "8px",
    textAlign: "center",
    color: "#4b0082",
    fontSize: "1rem" // тъмнолилав текст
  }}>
              <strong>{date}:</strong>
              <ul>
                {tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  )}
</div>
    </div>
  );
}