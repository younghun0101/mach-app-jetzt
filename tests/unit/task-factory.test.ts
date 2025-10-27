import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createTask, createCompletedTask, createHighPriorityTask } from '../e2e/data/task-factory';

describe('Task Factory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createTask', () => {
    it('soll eine Standardaufgabe erstellen', () => {
      const task = createTask();
      expect(task.id).toBeDefined();
      expect(task.title).toBe('Test Aufgabe');
      expect(task.priority).toBe('medium');
      expect(task.completed).toBe(false);
    });

    it('soll Aufgabe mit Overrides erstellen', () => {
      const task = createTask({ title: 'Custom Title', priority: 'high' });
      expect(task.title).toBe('Custom Title');
      expect(task.priority).toBe('high');
    });
  });

  describe('createCompletedTask', () => {
    it('soll eine erledigte Aufgabe erstellen', () => {
      const task = createCompletedTask();
      expect(task.completed).toBe(true);
      expect(task.completedAt).toBeDefined();
    });

    it('soll erledigte Aufgabe mit Overrides erstellen', () => {
      const task = createCompletedTask({ title: 'Erledigte Aufgabe' });
      expect(task.completed).toBe(true);
      expect(task.title).toBe('Erledigte Aufgabe');
    });
  });

  describe('createHighPriorityTask', () => {
    it('soll eine hoch-priorisierte Aufgabe erstellen', () => {
      const task = createHighPriorityTask();
      expect(task.priority).toBe('high');
    });

    it('soll hoch-priorisierte Aufgabe mit Overrides erstellen', () => {
      const task = createHighPriorityTask({ title: 'Wichtige Aufgabe' });
      expect(task.priority).toBe('high');
      expect(task.title).toBe('Wichtige Aufgabe');
    });
  });
});

