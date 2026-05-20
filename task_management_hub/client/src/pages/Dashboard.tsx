import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchTasks,
  createTask,
  deleteTask,
} from "../features/tasks/taskSlice.ts";

import { setSearch } from "../features/tasks/taskSlice.ts";

import { selectFilteredTasks } from "../features/tasks/taskSelector.ts";

import { AppDispatch } from "../redux/store.ts";
import TaskForm from "../componenets/TaskForm.tsx";
import SearchBar from "../componenets/SearchBar.tsx";
import TaskList from "../componenets/TaskList.tsx";
import { ClipboardList } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce.ts";
import ErrorAlert from "../componenets/ErrorElert.tsx";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const tasks = useSelector(selectFilteredTasks);

  const search = useSelector(
    (state: { tasks: { search: string } }) => state.tasks.search,
  );

  const error = useSelector(
    (state: { tasks: { error: string | null } }) => state.tasks.error,
  );

  const [searchInput, setSearchInput] = useState(search);

  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearch(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex items-center gap-3 mb-6 text-center justify-center">
        <ClipboardList className="w-8 h-8 text-blue-600" />

        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Task Management Dashboard
        </h1>
      </div>
      <SearchBar
        value={searchInput}
        onChange={(value) => setSearchInput(value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <TaskForm onSubmit={(data) => dispatch(createTask(data))} />
        <ErrorAlert message={error || ""} />

        <TaskList tasks={tasks} onDelete={(id) => dispatch(deleteTask(id))} />
      </div>
    </div>
  );
};

export default Dashboard;
