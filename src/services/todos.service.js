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

    async postExactIdTodo (token, testinfo, id, newTodo) {
        return test.step('полностью меняем todo с конкретным id', async () => {
            const response = await this.request.post(`${testinfo.project.use.apiURL}/todos/${id}`, {
            headers: {
                "x-challenger": token}, 
                data: newTodo,
            },
        );
        return response;
        })
    }

    async putExactId (token, testinfo, id, newTodo) {
        return test.step('меняем id конкретного todo', async () => {
            let response = await this.request.put(`${testinfo.project.use.apiURL}/todos/${id}`, {
            headers: {
                "x-challenger": token}, 
                data: newTodo,              
            },
        );
        return response;
        })
    }

    async delTodo (token, testinfo, id) {
        return test.step('удаляем конкретный todo', async () => {
            let response = await this.request.delete(`${testinfo.project.use.apiURL}/todos/${id}`, {
            headers: {
                "x-challenger": token}, 
            },
        );
        return response;
        })
    }

    async optionsTodo (token, testinfo) {
        return test.step('получаем варианты доступных методов', async () => {
            let response = await this.request.fetch(`${testinfo.project.use.apiURL}/todos`, {
            method: "OPTIONS",
            headers: {
                "x-challenger": token,},
            }
        );
        return response;
        })
    }

    async getXmlBody (token, testinfo) {
        return test.step('получаем ответ в формате xml', async () => {
            let response = await this.request.get(`${testinfo.project.use.apiURL}/todos`, {
            headers: {
                "x-challenger": token,
                accept: "application/xml",
            }, 
            },
        );
        return response;
        })
    }

    async getJsonBody (token, testinfo) {
        return test.step('получаем ответ в формате json', async () => {
            let response = await this.request.get(`${testinfo.project.use.apiURL}/todos`, {
            headers: {
                "x-challenger": token,
                accept: "application/json",
            }, 
            },
        );
        return response;
        })
    }

    async getAnyBody (token, testinfo) {
        return test.step('получаем ответ в формате json', async () => {
            let response = await this.request.get(`${testinfo.project.use.apiURL}/todos`, {
            headers: {
                "x-challenger": token,
                accept: "*/*",
            }, 
            },
        );
        return response;
        })
    }

    async getXmlPrefBody (token, testinfo) {
        return test.step('получаем ответ в приоритетном формате xml', async () => {
            let response = await this.request.get(`${testinfo.project.use.apiURL}/todos`, {
            headers: {
                "x-challenger": token,
                accept: "application/xml, application/json",
            }, 
            },
        );
        return response;
        })
    }

    async getInvalidFormat (token, testinfo) {
        return test.step('получаем ответ при неправильном формате', async () => {
            let response = await this.request.get(`${testinfo.project.use.apiURL}/todos`, {
            headers: {
                "x-challenger": token,
                accept: "application/gzip",
            }, 
            },
        );
        return response;
        })
    }

    async postXmlData (token, testinfo) {
        return test.step('передаем данные в формате xml', async () => {
            let response = await this.request.post(`${testinfo.project.use.apiURL}/todos`, {
            headers: {
                "x-challenger": token,
                "Content-Type": 'application/xml',
                "accept": "application/xml",
            },
            data: '<?xml version="1.0" encoding="UTF-8"?><todo><doneStatus>true</doneStatus><title>file paperwork today</title></todo>'
        });
        return response;
        })
    }

    async postJson (token, testinfo, newTodo) {
        return test.step('передаем данные в формате json', async () => {
            let response = await this.request.post(`${testinfo.project.use.apiURL}/todos`, {
            headers: {
                "x-challenger": token,
                "Content-Type": 'application/json',
                "accept": "application/json",
            },
            data: newTodo,
        });
        return response;
        })
    }

    async postInvalidFormat (token, testinfo, newTodo) {
        return test.step('передаем данные в невалидном формате', async () => {
            let response = await this.request.post(`${testinfo.project.use.apiURL}/todos`, {
            headers: {
                "x-challenger": token,
                "Content-Type": 'gzip',
                "accept": "application/json",
            },
            data: newTodo
        });
        return response;
        })
    }

    async delAllTodos (token, testinfo, id) {
        return test.step('удаляем все todo', async () => {
            let response = await this.request.delete(`${testinfo.project.use.apiURL}/todos/${id}`, {
            headers: {
                "x-challenger": token},
            });
        return response;
        })
    }

} 