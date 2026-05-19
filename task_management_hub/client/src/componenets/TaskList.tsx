import React from "react";
import { Trash2 } from "lucide-react";
import type { Task } from "../features/tasks/task.type.js";

type Props = {
  tasks: Task[];
  onDelete: (id: string) => void;
};

const TaskList: React.FC<Props> = ({ tasks, onDelete }) => {
  if (!tasks.length) {
    return <p>No tasks found</p>;
  }

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Description</th>
              <th className="text-left p-4">Priority</th>
              <th className="text-left p-4">Status</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">{task.title}</td>

                  <td className="p-4 text-gray-600">{task.description}</td>

                  <td className="p-4">{task.priority}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        task.status === "DONE"
                          ? "bg-green-100 text-green-700"
                          : task.status === "IN_PROGRESS"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => onDelete(task.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(TaskList);
