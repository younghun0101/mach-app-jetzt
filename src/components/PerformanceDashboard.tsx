import { Task } from "@/pages/Index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { startOfWeek, endOfWeek, eachDayOfInterval, format, subWeeks } from "date-fns";
import { de } from "date-fns/locale";
import { TrendingUp, CheckCircle2, Target, Calendar } from "lucide-react";

interface PerformanceDashboardProps {
  tasks: Task[];
}

export const PerformanceDashboard = ({ tasks }: PerformanceDashboardProps) => {
  const now = new Date();
  const currentWeekStart = startOfWeek(now, { weekStartsOn: 1 });
  const currentWeekEnd = endOfWeek(now, { weekStartsOn: 1 });

  // Weekly completion rate for last 4 weeks
  const weeklyData = Array.from({ length: 4 }, (_, i) => {
    const weekStart = subWeeks(currentWeekStart, 3 - i);
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

    const weekTasks = tasks.filter((task) => {
      const createdAt = new Date(task.createdAt);
      return createdAt >= weekStart && createdAt <= weekEnd;
    });

    const completed = weekTasks.filter((t) => t.completed).length;
    const total = weekTasks.length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      week: `KW ${format(weekStart, "w", { locale: de })}`,
      rate,
      completed,
      total,
    };
  });

  // Daily completion for current week
  const dailyData = eachDayOfInterval({
    start: currentWeekStart,
    end: currentWeekEnd,
  }).map((day) => {
    const dayTasks = tasks.filter((task) => {
      const createdAt = new Date(task.createdAt);
      return (
        format(createdAt, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
      );
    });

    const completed = dayTasks.filter((t) => t.completed).length;

    return {
      day: format(day, "EEE", { locale: de }),
      completed,
      total: dayTasks.length,
    };
  });

  // Overall stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const overallRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const activeTasks = tasks.filter((t) => !t.completed).length;
  const highPriorityActive = tasks.filter(
    (t) => !t.completed && t.priority === "high"
  ).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gesamt Aufgaben</p>
                <p className="text-2xl font-bold text-foreground">{totalTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-success/10">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Erledigt</p>
                <p className="text-2xl font-bold text-foreground">{completedTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Abschlussrate</p>
                <p className="text-2xl font-bold text-foreground">{overallRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-warning/10">
                <Calendar className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hohe Priorität</p>
                <p className="text-2xl font-bold text-foreground">
                  {highPriorityActive} / {activeTasks}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Wöchentliche Abschlussrate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  formatter={(value: number, name: string) =>
                    name === "rate" ? `${value}%` : value
                  }
                />
                <Bar dataKey="rate" fill="hsl(var(--chart-primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tägliche Aufgaben (Diese Woche)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="hsl(var(--chart-success))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-success))" }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="hsl(var(--chart-muted))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-muted))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {totalTasks === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Erstellen Sie Aufgaben, um Ihre Leistungsstatistiken zu sehen.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
