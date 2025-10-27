import { type Page, type Locator } from '@playwright/test';

export class IndexPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  private get tasksTab() {
    return this.page.getByRole('tab', { name: 'Aufgaben' });
  }
  private get dashboardTab() {
    return this.page.getByRole('tab', { name: 'Dashboard' });
  }
  private get titleInput() {
    return this.page.getByLabel('Titel');
  }
  private get descriptionInput() {
    return this.page.getByLabel('Beschreibung');
  }
  private get prioritySelect() {
    return this.page.locator('#priority').getByRole('combobox');
  }
  private get deadlineInput() {
    return this.page.getByLabel('Frist');
  }
  private get submitButton() {
    return this.page.getByRole('button', { name: /Aufgabe hinzufügen/i });
  }

  // Actions
  async goto() {
    await this.page.goto('/');
  }

  async switchToTasksTab() {
    await this.tasksTab.click();
  }

  async switchToDashboardTab() {
    await this.dashboardTab.click();
  }

  async fillTaskTitle(title: string) {
    await this.titleInput.fill(title);
  }

  async fillTaskDescription(description: string) {
    await this.descriptionInput.fill(description);
  }

  async selectPriority(priority: 'high' | 'medium' | 'low') {
    const priorityMap = { high: 'Hoch', medium: 'Mittel', low: 'Niedrig' };
    await this.page.locator('#priority').click();
    await this.page.getByRole('option', { name: priorityMap[priority] }).click();
  }

  async setDeadline(date: Date) {
    const dateStr = date.toISOString().split('T')[0];
    await this.deadlineInput.fill(dateStr);
  }

  async submitTask() {
    await this.submitButton.click();
  }

  async createTask(data: {
    title: string;
    description?: string;
    priority: 'high' | 'medium' | 'low';
    deadline?: Date;
  }) {
    await this.fillTaskTitle(data.title);
    if (data.description) {
      await this.descriptionInput.fill(data.description);
    }
    await this.selectPriority(data.priority);
    if (data.deadline) {
      await this.setDeadline(data.deadline);
    }
    await this.submitTask();
  }

  // Task List Locators
  getTaskByTitle(title: string): Locator {
    return this.page.getByText(title);
  }

  getToggleTaskButton(taskTitle: string): Locator {
    const card = this.page.locator(`[data-task-title="${taskTitle}"]`);
    return card.locator('input[type="checkbox"]').or(card.getByRole('checkbox'));
  }

  getDeleteTaskButton(taskTitle: string): Locator {
    const card = this.page.locator(`[data-task-title="${taskTitle}"]`);
    return card.getByTestId(/task-.*-delete/);
  }

  // Filter Locators
  getPriorityFilter(): Locator {
    return this.page.getByLabel('Priorität').first();
  }

  getStatusFilter(): Locator {
    return this.page.getByLabel('Status');
  }

  async filterByPriority(priority: 'all' | 'high' | 'medium' | 'low') {
    const priorityMap = {
      all: 'Alle',
      high: 'Hoch',
      medium: 'Mittel',
      low: 'Niedrig',
    };
    const trigger = this.page.getByLabel('Priorität').first();
    await trigger.click();
    await this.page.getByRole('option', { name: priorityMap[priority] }).click();
  }

  async filterByStatus(status: 'all' | 'active' | 'completed') {
    const statusMap = { all: 'Alle', active: 'Aktiv', completed: 'Erledigt' };
    const trigger = this.page.getByLabel('Status');
    await trigger.click();
    await this.page.getByRole('option', { name: statusMap[status] }).click();
  }
}

