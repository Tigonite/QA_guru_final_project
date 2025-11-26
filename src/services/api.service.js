import { ChallengerService, ChallengesService, HeartbeatService, TodoService, TodosService } from "./index";

export class Api {
    constructor(request) {
        this.request = request;
        this.challenger = new ChallengerService(request);
        this.challenges = new ChallengesService(request);
        this.todos = new TodosService(request);
        this.todo = new TodoService(request);
        this.heartbeat = new HeartbeatService(request);
    }
}