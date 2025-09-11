import { Link } from "react-router-dom";
import { useState } from "react";
import CommonFooter from "../../components/common-footer/commonFooter";
import ImageWithBasePath from "../../components/image-with-base-path";
import { all_routes } from "../../routes/all_routes";
import {
  Assignee,
  Priority,
  StatusTodo,
} from "../../core/json/selectOption";
import CommonSelect from "../../components/common-select/commonSelect";
import CommonDatePicker from "../../components/common-date-picker/commonDatePicker";
import Texteditor from "../../components/text-editor/texteditor";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  progress: number;
  status: string;
  assignees: string[];
  comments: number;
  attachments: number;
  progressColor: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const KanbanView = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
      tasks: [
        {
          id: "task-1",
          title: "Settings Page",
          description: "Implement the settings page to manage user preferences",
          priority: "Low",
          progress: 0,
          status: "todo",
          assignees: ["avatar-10.jpg", "avatar-08.jpg", "avatar-07.jpg", "avatar-02.jpg"],
          comments: 0,
          attachments: 0,
          progressColor: "bg-success"
        },
        {
          id: "task-2",
          title: "Applications Page",
          description: "Implement the Applications pages to manage tools for seamless productivity.",
          priority: "Medium",
          progress: 0,
          status: "todo",
          assignees: ["avatar-13.jpg", "avatar-14.jpg", "avatar-15.jpg"],
          comments: 0,
          attachments: 0,
          progressColor: "bg-warning"
        }
      ]
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: [
        {
          id: "task-3",
          title: "Error Pages",
          description: "Design and integrate custom error pages for user experience during issues.",
          priority: "Medium",
          progress: 40,
          status: "in-progress",
          assignees: ["avatar-10.jpg", "avatar-08.jpg", "avatar-07.jpg"],
          comments: 8,
          attachments: 3,
          progressColor: "bg-indigo"
        },
        {
          id: "task-4",
          title: "UI Pages",
          description: "Develop and refine UI pages to ensure a user-friendly and intuitive interface",
          priority: "Low",
          progress: 70,
          status: "in-progress",
          assignees: ["avatar-20.jpg", "avatar-21.jpg", "avatar-22.jpg"],
          comments: 10,
          attachments: 6,
          progressColor: "bg-orange"
        },
        {
          id: "task-5",
          title: "Customizer",
          description: "Build a customizer panel to allow users to personalize layout, theme, and UI settings",
          priority: "High",
          progress: 50,
          status: "in-progress",
          assignees: ["avatar-23.jpg", "avatar-24.jpg", "avatar-25.jpg"],
          comments: 12,
          attachments: 4,
          progressColor: "bg-info"
        }
      ]
    },
    {
      id: "completed",
      title: "Completed",
      tasks: [
        {
          id: "task-6",
          title: "Dashboard",
          description: "Create an interactive dashboard to display key metrics and system summaries",
          priority: "Low",
          progress: 100,
          status: "completed",
          assignees: ["avatar-10.jpg", "avatar-08.jpg", "avatar-07.jpg"],
          comments: 15,
          attachments: 12,
          progressColor: "bg-success"
        },
        {
          id: "task-7",
          title: "Authentication Pages",
          description: "Develop authentication pages including login, registration & password management",
          priority: "Medium",
          progress: 100,
          status: "completed",
          assignees: ["avatar-25.jpg", "avatar-26.jpg", "avatar-27.jpg"],
          comments: 10,
          attachments: 6,
          progressColor: "bg-success"
        }
      ]
    }
   
  ]);

  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedOverColumn, setDraggedOverColumn] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDraggedOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDraggedOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    if (!draggedTask) return;

    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      
      // Remove task from source column
      const sourceColumnIndex = newColumns.findIndex(col => 
        col.tasks.some(task => task.id === draggedTask.id)
      );
      
      if (sourceColumnIndex !== -1) {
        newColumns[sourceColumnIndex] = {
          ...newColumns[sourceColumnIndex],
          tasks: newColumns[sourceColumnIndex].tasks.filter(task => task.id !== draggedTask.id)
        };
      }

      // Add task to target column
      const targetColumnIndex = newColumns.findIndex(col => col.id === targetColumnId);
      if (targetColumnIndex !== -1) {
        const updatedTask = { ...draggedTask, status: targetColumnId };
        newColumns[targetColumnIndex] = {
          ...newColumns[targetColumnIndex],
          tasks: [...newColumns[targetColumnIndex].tasks, updatedTask]
        };
      }

      return newColumns;
    });

    setDraggedTask(null);
    setDraggedOverColumn(null);
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "High": return "bg-danger";
      case "Medium": return "bg-warning";
      case "Low": return "bg-success";
      default: return "bg-secondary";
    }
  };

  const renderTaskCard = (task: Task) => (
    <div
      key={task.id}
      className="card kanban-card mb-3"
      draggable
      onDragStart={(e) => handleDragStart(e, task)}
      style={{ cursor: "grab" }}
    >
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
          <div className="d-flex align-items-center">
            <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
              {task.priority}
            </span>
          </div>
          <div className="dropdown">
            <Link
              to="#"
              className="btn btn-icon btn-outline-light"
              data-bs-toggle="dropdown"
              aria-label="Lab result actions menu" 
              aria-haspopup="true" 
              aria-expanded="false"
            >
              <i className="ti ti-dots-vertical" aria-hidden="true" />
            </Link>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link
                  to="#"
                  className="dropdown-item rounded-1"
                  data-bs-toggle="modal"
                  data-bs-target="#edit_task"
                >
                  <i className="ti ti-edit me-1" />
                  Edit
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="dropdown-item rounded-1"
                  data-bs-toggle="modal"
                  data-bs-target="#delete_modal"
                >
                  <i className="ti ti-trash me-1" />
                  Delete
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <h6 className="mb-2">{task.title}</h6>
        <p className="mb-3">
          {task.description}
        </p>
        <span className="d-block mb-1">Progress : {task.progress}%</span>
        <div className="progress progress-sm flex-grow-1 mb-3">
          <div
            className={`progress-bar rounded ${task.progressColor}`}
            role="progressbar"
            aria-valuenow={task.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: `${task.progress}%` }}
          />
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="avatar-list-stacked avatar-group-sm me-3">
            {task.assignees.slice(0, 3).map((avatar, index) => (
              <span key={index} className="avatar avatar-rounded">
                <ImageWithBasePath
                  src={`assets/img/profiles/${avatar}`}
                  alt="img"
                />
              </span>
            ))}
            {task.assignees.length > 3 && (
              <Link
                to="#"
                className="avatar avatar-rounded bg-dark fs-12 text-white"
              >
                {task.assignees.length - 3}+
              </Link>
            )}
          </div>
          <div className="d-flex align-items-center gap-2">
            <Link
              to="#"
              className="d-flex align-items-center me-2"
            >
              <i className="ti ti-message me-1" />
              {task.comments}
            </Link>
            <Link to="#" className="d-flex align-items-center">
              <i className="ti ti-paperclip" />
              {task.attachments}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ========================
			Start Page Content
		========================= */}
      <div className="page-wrapper">
        {/* Start Content */}
        <div className="content">
          {/* Page Header */}
          <div className="d-flex align-items-center justify-content-between gap-2 mb-4 flex-wrap">
            <div className="breadcrumb-arrow">
              <h4 className="mb-1">Kanban</h4>
              <div className="text-end">
                <ol className="breadcrumb m-0 py-0">
                  <li className="breadcrumb-item">
                    <Link to={all_routes.dashboard}>Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Applications</Link>
                  </li>
                  <li className="breadcrumb-item active">Kanban</li>
                </ol>
              </div>
            </div>
            <div className="gap-2 d-flex align-items-center flex-wrap">
              <Link
                to="#"
                className="btn btn-icon btn-white"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Refresh"
                data-bs-original-title="Refresh"
              >
                <i className="ti ti-refresh" />
              </Link>
              <Link
                to="#"
                className="btn btn-icon btn-white"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Print"
                data-bs-original-title="Print"
              >
                <i className="ti ti-printer" />
              </Link>
              <Link
                to="#"
                className="btn btn-icon btn-white"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Download"
                data-bs-original-title="Download"
              >
                <i className="ti ti-cloud-download" />
              </Link>
            </div>
          </div>
          {/* End Page Header */}
          <div className="kanban-view">
            <div className="kanban-card-wrap mb-2">
              <div className="d-flex align-items-start overflow-auto project-status gap-3">
                {columns.map((column, index) => (
                  <div key={column.id} className={`card ${index < columns.length - 1 ? 'mb-0' : ''}`}>
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="mb-0 d-flex align-items-center">
                        {column.title}
                        <span className="badge ms-2 bg-danger rounded-circle count-circle">
                          {column.tasks.length}
                        </span>
                      </h5>
                      <Link to="#" className="btn btn-icon btn-light">
                        <i className="ti ti-plus" />
                      </Link>
                    </div>
                    <div 
                      className="card-body"
                      onDragOver={(e) => handleDragOver(e, column.id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, column.id)}
                      style={{
                        minHeight: "200px",
                        backgroundColor: draggedOverColumn === column.id ? "rgba(0,123,255,0.1)" : "transparent",
                        transition: "background-color 0.2s ease"
                      }}
                    >
                      <div className="kanban-drag" id={`drag-${column.id}`}>
                        {column.tasks.map(renderTaskCard)}
                      </div>
                      <div className="pt-2">
                        <Link
                          to="#"
                          className="btn btn-primary w-100"
                          data-bs-toggle="modal"
                          data-bs-target="#add-task"
                        >
                          <i className="ti ti-square-rounded-plus me-2" /> New Task
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* End Content */}
        {/* Start Footer */}
        <CommonFooter />
        {/* End Footer */}
      </div>
      {/* ========================
			End Page Content
		========================= */}
      {/* Add Todo */}
      <div className="modal fade" id="add-task">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Task</h5>
              <button
                type="button"
                className="btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-circle-x-filled" />
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Task Name</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <CommonSelect
                        options={StatusTodo}
                        className="select"
                        defaultValue={StatusTodo[0]}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Priority</label>
                      <CommonSelect
                        options={Priority}
                        className="select"
                        defaultValue={Priority[0]}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Created Date</label>
                      <div className=" w-auto input-group-flat">
                        <CommonDatePicker placeholder="dd/mm/yyyy" />
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Due Date</label>
                      <div className=" w-auto input-group-flat">
                        <CommonDatePicker placeholder="dd/mm/yyyy" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="form-label">Descriptions</label>
                      <div className="snow-editor">
                        <Texteditor/>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div>
                      <label className="form-label">Select Assignee</label>
                      <CommonSelect
                        options={Assignee}
                        className="select"
                        defaultValue={Assignee[0]}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-light me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add New
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Add Todo end */}
      {/* Edit Todo */}
      <div className="modal fade" id="edit_task">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Task</h5>
              <button
                type="button"
                className="btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-circle-x-filled" />
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="UI Pages"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <CommonSelect
                        options={StatusTodo}
                        className="select"
                        defaultValue={StatusTodo[1]}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Priority</label>
                      <CommonSelect
                        options={Priority}
                        className="select"
                        defaultValue={Priority[1]}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Created Date</label>
                      <div className=" w-auto input-group-flat">
                        <CommonDatePicker placeholder="dd/mm/yyyy" />
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Due Date</label>
                      <div className=" w-auto input-group-flat">
                        <CommonDatePicker placeholder="dd/mm/yyyy" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="form-label">Descriptions</label>
                      <div className="snow-editor">
                      <Texteditor/>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div>
                      <label className="form-label">Select Assignee</label>
                      <CommonSelect
                        options={Assignee}
                        className="select"
                        defaultValue={Assignee[1]}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-light me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Edit Todo end */}
      {/* Start Modal  */}
      <div className="modal fade" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-2">
                <span className="avatar avatar-md rounded-circle bg-danger">
                  <i className="ti ti-trash fs-24" />
                </span>
              </div>
              <h6 className="fs-16 mb-1">Confirm Deletion</h6>
              <p className="mb-3">Are you sure you want to delete this task?</p>
              <div className="d-flex justify-content-center gap-2">
                <Link
                  to="#"
                  className="btn btn-outline-light w-100"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </Link>
                <Link to={all_routes.kanbanView} className="btn btn-danger w-100">
                  Yes, Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Modal  */}
    </>
  );
};

export default KanbanView;
