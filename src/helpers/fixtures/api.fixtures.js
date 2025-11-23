import { test as base } from "@playwright/test";

import { ApiService } from '../../services/index';
export const test = base.extend({
    api: async ({ request }, use) => {
      await use(new ApiService(request));
    },
});