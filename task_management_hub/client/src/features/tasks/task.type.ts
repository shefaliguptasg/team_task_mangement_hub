export type Priority = "LOW" | "MEDIUM" | "HIGH";

export type Status = "TODO" | "IN_PROGRESS" | "DONE";

export interface Task extends newTask {
  id: string;
}


export interface newTask {
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  search: string;
}

export type a ={
    name : string;
}
export type a = {
    age:number
}