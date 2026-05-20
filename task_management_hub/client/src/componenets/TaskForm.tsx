import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { taskSchema, type TaskFormData } from "../schemas/task.schema.js";

interface Props {
  onSubmit: (data: TaskFormData) => void;
}

const TaskForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),

    defaultValues: {
      title: "",
      description: "",
      priority: "LOW",
      status: "TODO",
    },
  });

  const handleFormSubmit = (data: TaskFormData) => {
    onSubmit(data);

    reset();
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-2xl mx-auto">
      <h2 className="text-1xl font-bold text-gray-800 mb-2 text-center">
        Create New Task
      </h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Title
          </label>

          <input
            type="text"
            placeholder="Enter task title"
            {...register("title")}
            className={`w-full border rounded-xl px-2 py-3 outline-none transition
              ${
                errors.title
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-400"
              }`}
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>

          <textarea
            rows={2}
            placeholder="Enter task description"
            {...register("description")}
            className={`w-full border rounded-xl px-4 py-2 outline-none transition resize-none
              ${
                errors.description
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-400"
              }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>

            <select
              {...register("priority")}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="LOW">LOW</option>

              <option value="MEDIUM">MEDIUM</option>

              <option value="HIGH">HIGH</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>

            <select
              {...register("status")}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="TODO">TODO</option>

              <option value="IN_PROGRESS">IN PROGRESS</option>

              <option value="DONE">DONE</option>
            </select>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
