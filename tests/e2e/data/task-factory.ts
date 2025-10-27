// Task type definition (duplicated from src/pages/Index.tsx)
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "high" | "medium" | "low";
  deadline?: Date;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
}

export const createTask = (overrides?: Partial<Task>): Task => {
  const defaultTask: Task = {
    id: Date.now().toString(),
    title: "Test Aufgabe",
    priority: "medium" as const,
    completed: false,
    createdAt: new Date(),
  };

  return { ...defaultTask, ...overrides };
};

export const createCompletedTask = (overrides?: Partial<Task>): Task => {
  return createTask({
    completed: true,
    completedAt: new Date(),
    ...overrides,
  });
};

export const createHighPriorityTask = (overrides?: Partial<Task>): Task => {
  return createTask({ priority: "high", ...overrides });
};

export const createTaskWithDeadline = (
  deadline: Date,
  overrides?: Partial<Task>
): Task => {
  return createTask({ deadline, ...overrides });
};

