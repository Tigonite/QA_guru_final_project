import { test } from '@playwright/test';
export class TodoService {
    constructor (request) {
        this.request = request;
    }

    async getTodoList (token, testinfo) {
        return test.step ('get', async () => {
            const response = await this.request.get(`${testinfo.project.use.apiURL}/todo`, {
            headers: {
                "x-challenger": token
            }},
        );
        return response;
        }) 
    }
}