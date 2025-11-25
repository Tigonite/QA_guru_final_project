import { test } from '@playwright/test';
export class HeartbeatService {
    constructor (request) {
        this.request = request;
    }

    async deleteHeartbeat (token, testinfo, newTodo) {
        return test.step ('удаляем сущность', async () => {
            const response = await this.request.delete(`${testinfo.project.use.apiURL}/heartbeat`, {
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

    async patchHeartbeat (token, testinfo, newTodo) {
        return test.step ('частично меняем сущность', async () => {
            const response = await this.request.patch(`${testinfo.project.use.apiURL}/heartbeat`, {
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
}