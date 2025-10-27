import { test as base } from '@playwright/test';
import { IndexPage } from '../pages/IndexPage';

type Fixtures = {
  indexPage: IndexPage;
};

export const test = base.extend<Fixtures>({
  indexPage: async ({ page }, use) => {
    const indexPage = new IndexPage(page);
    await use(indexPage);
  },
});

export { expect } from '@playwright/test';

