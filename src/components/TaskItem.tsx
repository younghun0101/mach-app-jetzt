import { Task } from "@/pages/Index";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Calendar, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
}

const priorityConfig = {
  high: {
    label: "Hoch",
    className: "bg-warning-light text-warning border-warning",
  },
  medium: {
    label: "Mittel",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  low: {
    label: "Niedrig",
    className: "bg-muted text-muted-foreground border-border",
  },
};

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const priorityStyle = priorityConfig[task.priority];
  const isOverdue =
    task.deadline && !task.completed && new Date(task.deadline) < new Date();

  return (
    <Card
      data-testid={`task-${task.id}`}
      className={cn(
        "transition-all hover:shadow-md",
        task.completed && "opacity-60"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="pt-1">
            <Checkbox
              data-testid={`task-${task.id}-checkbox`}
              checked={task.completed}
              onCheckedChange={() => onToggle(task.id)}
              className={cn(
                "w-5 h-5",
                task.completed && "data-[state=checked]:bg-success"
              )}
            />
          </div>

          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start justify-between gap-4">
              <h3
                data-task-title={task.title}
                className={cn(
                  "font-semibold text-foreground",
                  task.completed && "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </h3>
              <Button
                data-testid={`task-${task.id}-delete`}
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.id)}
                className="text-muted-foreground hover:text-destructive shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            {task.description && (
              <p className="text-sm text-muted-foreground">
                {task.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={priorityStyle.className}>
                {priorityStyle.label}
              </Badge>

              {task.deadline && (
                <Badge
                  variant="outline"
                  className={cn(
                    "gap-1",
                    isOverdue &&
                      "bg-destructive/10 text-destructive border-destructive/20"
                  )}
                >
                  {isOverdue && <AlertCircle className="w-3 h-3" />}
                  <Calendar className="w-3 h-3" />
                  {format(new Date(task.deadline), "dd. MMM yyyy", {
                    locale: de,
                  })}
                </Badge>
              )}

              {task.completed && task.completedAt && (
                <Badge variant="outline" className="bg-success-light text-success border-success/20">
                  Erledigt am{" "}
                  {format(new Date(task.completedAt), "dd. MMM yyyy", {
                    locale: de,
                  })}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
