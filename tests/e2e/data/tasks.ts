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

export const TEST_TASKS = {
  complete: {
    title: "Komplette Aufgabe testen",
    description: "Das ist eine Testaufgabe zum Testen",
    priority: "high" as const,
    deadline: new Date("2024-12-31"),
  },
  minimal: {
    title: "Minimale Aufgabe",
    priority: "medium" as const,
  },
  lowPriority: {
    title: "Niedrige Priorität Aufgabe",
    description: "Diese Aufgabe hat niedrige Priorität",
    priority: "low" as const,
  },
};

export const createMockTask = (overrides?: Partial<Task>): Task => {
  const task = {
    id: Date.now().toString(),
    title: "Test Aufgabe",
    description: "Test Beschreibung",
    priority: "medium" as const,
    completed: false,
    createdAt: new Date(),
    ...overrides,
  };
  return task;
};

export const createMockTasks = (count: number): Task[] => {
  return Array.from({ length: count }, (_, i) => {
    let priority: "high" | "medium" | "low";
    if (i % 3 === 0) {
      priority = "high";
    } else if (i % 3 === 1) {
      priority = "medium";
    } else {
      priority = "low";
    }
    
    return createMockTask({
      id: `task-${i + 1}`,
      title: `Test Aufgabe ${i + 1}`,
      completed: i % 2 === 0,
      priority,
      createdAt: new Date(Date.now() - i * 86400000),
    });
  });
};

