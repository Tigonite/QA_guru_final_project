import { test } from '@playwright/test';
export class ChallengesService {
    constructor (request) {
        this.request = request;
    }

    async getChallengesList(token, testinfo){
        return test.step('get', async () => {
            const response = await this.request.get(`${testinfo.project.use.apiURL}/challenges`, {
            headers: {
                "x-challenger": token
            }},
        );
        return response;
        })
    }
}