import React, { useEffect, useState } from "react";
import "./index.css";
import TaskList from "./components/TaskList";
import Headers from "./components/Header";
import Footer from "./components/Footer";
import TaskModal from "./components/TaskModel";
import DeleteModal from "./components/DeleteModel";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isTaskModalOpen, setIsTasksModalOpen] = useState(false);
  const [taskModalMode, setTaskModalmode] = useState("create");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (text) => {
    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    await response.json();
    fetchTasks();
    setIsTasksModalOpen(false);
  };

  const updateTask = async (id, updatedText) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newText }),
    });
    fetchTasks();
    setIsTasksModalOpen(false);
    setSelectedTask(null);
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
    setIsDeleteOpen(false);
    setSelectedTask(null);
  };

  const openCreate = () => {
    setTaskModalmode("create");
    setSelectedTask(null);
    setIsTasksModalOpen(true);
  };

  const openEdit = (task) => {
    setTaskModalmode("edit");
    setSelectedTask(task);
    setIsTasksModalOpen(true);
  };
  
  const openDelete = (task) => {
    setSelectedTask(task);
    setIsDeleteOpen(true);
  };

  const closeAll = () => {
    setIsTasksModalOpen(false);
    setIsDeleteOpen(false);
    setSelectedTask(null);
  };

  return (
    <>
      <div className="app">
        <Headers />
        <div className="container">
          <button className="createBtn" onClick={openCreate}>
            + Create Task
          </button>

          <div className="cards">
            <TaskList tasks = {tasks} onEdit={openEdit} onDelete={openDelete}/>
          </div>
        </div>
        <Footer />

        <TaskModal
          isOpen={isTaskModalOpen}
          mode={taskModalMode}
          initialValue={selectedTask ? selectedTask.text : ""}
          onClose={closeAll}
          onSubmit={(value) => {
            if(taskModalMode === "create") createTask(value);
            else updateTask(selectedTask._id, value);
          }}
        />

        {/* Delete Modal */}
        <DeleteModal
          isOpen={isDeleteOpen}
          onClose={closeAll}
          onDelete={() => selectedTask && deleteTask(selectedTask._id)}
        />
      </div>
    </>
  )
};

export default App;


