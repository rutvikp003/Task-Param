import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty">
        No tasks yet - click <strong>Create tasks</strong> to add one
      </div>
    );
  }
  return (
    <>
      <div className="task-grid">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task)}
          />
        ))}
      </div>
    </>
  );
}
