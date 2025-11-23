import { test } from '@playwright/test';
export class TodosService {
    constructor (request) {
        this.request = request;
    }

    async getTodosList (token, testinfo) {
        return test.step('получаем список todos', async () => {
            const response = await this.request.get(`${testinfo.project.use.apiURL}/todos`, {
            headers: {
                "x-challenger": token
            }},
        );
        return response;
        })
    }

    async getExactTodo (token, testinfo, id) {
        return test.step('получаем конкретный todo', async () => {
            const response = await this.request.get(`${testinfo.project.use.apiURL}/todos/${id}`, {
            headers: {
                "x-challenger": token
            }},
        );
        return response;
        })
    }

    async getFilteredTodo (token, testinfo) {
        return test.step('получаем отфильтрованные todo', async () => {
            const response = await this.request.get(`${testinfo.project.use.apiURL}/todos?doneStatus=false`, {
            headers: {
                "x-challenger": token
            }},
        );
        return response;
        })
    }

    async headTodos (token, testinfo) {
        return test.step('получаем хэдеры всех todo', async () => {
            const response = await this.request.head(`${testinfo.project.use.apiURL}/todos`, {
            headers: {
                "x-challenger": token
            }},
        );
        return response;
        })
    }

    async postTodos (token, testinfo, newTodo) {
        return test.step('создаем новый todo', async () => {
            const response = await this.request.post(`${testinfo.project.use.apiURL}/todos`, {
            headers: {
                "x-challenger": token}, 
            data: newTodo,
            },
        );
        return response;
        })
    }

    async putExactIdTodo (token, testinfo, id, newTodo) {
        return test.step('меняем todo с конкретным id', async () => {
            const response = await this.request.put(`${testinfo.project.use.apiURL}/todos/${id}`, {
            headers: {
                "x-challenger": token}, 
                data: newTodo,
            },
        );
        return response;
        })
    }
} 