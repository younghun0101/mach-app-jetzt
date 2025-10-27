import { useState } from "react";
import { TaskList } from "@/components/TaskList";
import { TaskForm } from "@/components/TaskForm";
import { PerformanceDashboard } from "@/components/PerformanceDashboard";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const addTask = (task: Omit<Task, "id" | "completed" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date() : undefined,
            }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const priorityMatch =
      filterPriority === "all" || task.priority === filterPriority;
    const statusMatch =
      filterStatus === "all" ||
      (filterStatus === "completed" && task.completed) ||
      (filterStatus === "active" && !task.completed);
    return priorityMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="tasks">Aufgaben</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-6">
            <TaskForm onAddTask={addTask} />
            <TaskList
              tasks={filteredTasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onUpdateTask={updateTask}
              filterPriority={filterPriority}
              filterStatus={filterStatus}
              onFilterPriorityChange={setFilterPriority}
              onFilterStatusChange={setFilterStatus}
            />
          </TabsContent>

          <TabsContent value="dashboard">
            <PerformanceDashboard tasks={tasks} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
