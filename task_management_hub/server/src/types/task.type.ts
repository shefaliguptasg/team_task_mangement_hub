export interface Task extends CreateTaskDto {
  id: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE";
}
