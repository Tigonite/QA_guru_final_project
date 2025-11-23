import { test } from '@playwright/test';
export class ChallengerService {
    constructor(request) {
        this.request = request;
    }

    async initialPost(testinfo) {
        return test.step ('post', async () => {
            const response = await this.request.post(`${testinfo.project.use.apiURL}/challenger`);
            return response
        }) 
        
    }
} 