import { describe, it, expect } from 'vitest';
import type { Task } from '../e2e/data/task-factory';

// Helper-Funktionen für Task-Filterlogik
const filterTasks = (
  tasks: Task[],
  priorityFilter: string,
  statusFilter: string
): Task[] => {
  return tasks.filter((task) => {
    const priorityMatch =
      priorityFilter === 'all' || task.priority === priorityFilter;
    const statusMatch =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && task.completed) ||
      (statusFilter === 'active' && !task.completed);
    return priorityMatch && statusMatch;
  });
};

describe('Task List Logic', () => {
  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Hoch Priorität Aktiv',
      priority: 'high',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Mittel Priorität Erledigt',
      priority: 'medium',
      completed: true,
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Niedrig Priorität Aktiv',
      priority: 'low',
      completed: false,
      createdAt: new Date(),
    },
  ];

  it('soll alle Aufgaben anzeigen bei "all" Filter', () => {
    const filtered = filterTasks(mockTasks, 'all', 'all');
    expect(filtered).toHaveLength(3);
  });

  it('soll nur hoch-priorisierte Aufgaben anzeigen', () => {
    const filtered = filterTasks(mockTasks, 'high', 'all');
    expect(filtered).toHaveLength(1);
    expect(filtered[0].priority).toBe('high');
  });

  it('soll nur erledigte Aufgaben anzeigen', () => {
    const filtered = filterTasks(mockTasks, 'all', 'completed');
    expect(filtered).toHaveLength(1);
    expect(filtered[0].completed).toBe(true);
  });

  it('soll nur aktive Aufgaben anzeigen', () => {
    const filtered = filterTasks(mockTasks, 'all', 'active');
    expect(filtered).toHaveLength(2);
    expect(filtered.every((task) => !task.completed)).toBe(true);
  });

  it('soll nach Prioriät und Status kombinieren', () => {
    const filtered = filterTasks(mockTasks, 'high', 'active');
    expect(filtered).toHaveLength(1);
    expect(filtered[0].priority).toBe('high');
    expect(filtered[0].completed).toBe(false);
  });

  it('soll leeres Array zurückgeben bei keinen Matches', () => {
    const filtered = filterTasks(mockTasks, 'high', 'completed');
    expect(filtered).toHaveLength(0);
  });
});

