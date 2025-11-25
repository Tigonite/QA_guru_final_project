import { test, expect } from "@playwright/test";
import { ChallengerService, ChallengesService, TodosService, TodoService, HeartbeatService } from "../../src/services/index";
import { BuilderTodo } from "../../src/helpers/builders/api.builder";

test.describe("Tests for APIchallenge", () => {
    let token

    test.beforeAll(async ( { request }, testinfo ) => {
        const challenger = new ChallengerService(request);
        let response = await challenger.initialPost(testinfo);
        let headers = response.headers();
        token = headers["x-challenger"];
        console.log(`Значение токена: ${token}`);

        expect(response.status()).toBe(201);
    });

    test("02 GET /challenges (200) @challenges", async ( { request }, testinfo ) => {
        const challenges = new ChallengesService(request);
        let response = await challenges.getChallengesList(token, testinfo);
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(200);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.challenges.length).toBe(59)

    });

    test("03 GET /todos (200) @todos", async ( { request }, testinfo ) => {
        const todos = new TodosService(request);
        let response = await todos.getTodosList(token, testinfo);
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(200);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.todos.length).toBe(10)
    });

    test("04 GET /todo (404) @todo", async ( { request }, testinfo ) => {
        const todo = new TodoService(request);
        let response = await todo.getTodoList(token, testinfo);
        let headers = response.headers();

        expect(response.status()).toBe(404);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    });

    test("05 GET /todos/{id} (200) @todos", async ( { request }, testinfo ) => {
        const todo_id = new BuilderTodo().validTodoId;
        const todos = new TodosService(request);

        let response = await todos.getExactTodo(token, testinfo, todo_id);
        let body = await response.json();
        let headers = response.headers();
        
        expect(response.status()).toBe(200);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.todos.length).toBe(1);
    });

    test("06 GET /todos/{id} (404) @todos", async ( { request }, testinfo ) => {
        const todo_id = new BuilderTodo().invalidTodoId;
        const todos = new TodosService(request);
        let response = await todos.getExactTodo(token, testinfo, todo_id);
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(404);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.todos).toBe(undefined);
    });

    test("07 GET /todos (200) ?filter @todos", async ( { request }, testinfo ) => {
        const todos = new TodosService(request);
        let response = await todos.getFilteredTodo(token, testinfo);
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(200);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.todos[0].doneStatus).toBe(false);
    });

    test("08 HEAD /todos (200) @todos", async ( { request }, testinfo ) => {
        const todos = new TodosService(request);
        let response = await todos.headTodos(token, testinfo);
        let headers = response.headers();

        expect(response.status()).toBe(200);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    });

    test("09 POST /todos (201) @todos", async ( { request }, testinfo ) => {
        const createTodo = new BuilderTodo()
        .addDoneStatus(true)
        .addTitle()
        .addDescription()
        .generate()
        const todos = new TodosService(request);
        let response = await todos.postTodos(token, testinfo, createTodo);
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(201);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.doneStatus).toEqual(true);
        expect(body.title).toBe('one two three');
        expect(body.description).toBe('just bla bla bla');
    });

    test("10 POST /todos (400) @todos", async ( { request }, testinfo ) => {
        const createTodo = new BuilderTodo()
        .addDoneStatus("true")
        .addTitle()
        .addDescription()
        .generate()
        const todos = new TodosService(request);
        let response = await todos.postTodos(token, testinfo, createTodo);
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(400);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.errorMessages[0]).toContain("Failed Validation: doneStatus should be BOOLEAN");
    });

    test("11 POST /todos (400) title too long @todos", async ( { request }, testinfo ) => {
        const createTodo = new BuilderTodo()
        .addDoneStatus()
        .addLongTitle()
        .addDescription()
        .generate()
        const todos = new TodosService(request);
        let response = await todos.postTodos(token, testinfo, createTodo);
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(400);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.errorMessages[0]).toContain("Failed Validation: Maximum allowable length exceeded for title - maximum allowed is 50");
    });

    test("12 POST /todos (400) description too long @todos", async ( { request }, testinfo ) => {
        const createTodo = new BuilderTodo()
        .addDoneStatus()
        .addTitle()
        .addLongDescription()
        .generate()
        const todos = new TodosService(request);
        let response = await todos.postTodos(token, testinfo, createTodo);
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(400);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.errorMessages[0]).toContain("Failed Validation: Maximum allowable length exceeded for description - maximum allowed is 200");
    });

    test("13 POST /todos (201) max out content @todos", async ( { request }, testinfo ) => {
        const createTodo = new BuilderTodo()
        .addDoneStatus()
        .addMaxTitle()
        .addMaxDescription()
        .generate()
        const todos = new TodosService(request);
        let response = await todos.postTodos(token, testinfo, createTodo);
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(201);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.doneStatus).toEqual(false);
        expect(body.title.length).toBe(50);
        expect(body.description.length).toBe(200);
    });

    test("14 POST /todos (413) content too long @todos", async ( { request }, testinfo ) => {
        const createTodo = new BuilderTodo()
        .addDoneStatus()
        .addTitle()
        .addOverDescription()
        .generate()
        const todos = new TodosService(request);
        let response = await todos.postTodos(token, testinfo, createTodo);
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(413);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.errorMessages[0]).toContain("Error: Request body too large, max allowed is 5000 bytes");
    });

    test("15 POST /todos (400) extra @todos", async ( { request }, testinfo ) => {
        const createTodo = new BuilderTodo()
        .addDoneStatus()
        .addTitle()
        .addDescription()
        .addPriority()
        .generate()
        const todos = new TodosService(request);
        let response = await todos.postTodos(token, testinfo, createTodo);
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(400);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.errorMessages[0]).toContain('Could not find field: priority');
    });

    test("16 PUT /todos/{id} (400) @todos", async ( { request }, testinfo ) => {
        const todo_id = new BuilderTodo().invalidTodoId;
        const createTodo = new BuilderTodo()
        .addDoneStatus()
        .addTitle()
        .addDescription()
        .generate()
        const todos = new TodosService(request);
        let response = await todos.putExactIdTodo(token, testinfo, todo_id, createTodo);
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(400);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.errorMessages[0]).toContain('Cannot create todo with PUT due to Auto fields id');
    });

    test("17 POST /todos/{id} (200) @todos", async ( { request }, testinfo ) => {
        const todo_id = new BuilderTodo().validTodoId;
        const createTodo = new BuilderTodo()
        .addTitle()
        .generate()
        const todos = new TodosService(request);
        let response = await todos.putExactIdTodo(token, testinfo, todo_id, createTodo);
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(200);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.title).toBe('one two three');
    });

    test("18 POST /todos/{id} (404) @todos", async ( { request }, testinfo ) => {
        const todo_id = new BuilderTodo().invalidTodoId;
        const createTodo = new BuilderTodo()
        .addTitle()
        .generate()
        const todos = new TodosService(request);
        let response = await todos.postExactIdTodo(token, testinfo, todo_id, createTodo);
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(404);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.errorMessages[0]).toContain('No such todo entity instance with id');
    });

    test("19 PUT /todos/{id} full (200) @todos", async ( { request }, testinfo ) => {
        const todo_id = new BuilderTodo().validTodoId;
        const createTodo = new BuilderTodo()
        .addDoneStatus(true)
        .addTitle()
        .addDescription("bla")
        .generate()
        const todos = new TodosService(request);
        let response = await todos.putExactIdTodo(token, testinfo, todo_id, createTodo);
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(200);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.doneStatus).toBe(true);
        expect(body.title).toBe('one two three');
        expect(body.description).toBe('bla');
    });

    test("20 PUT /todos/{id} full (200) @todos", async ( { request }, testinfo ) => {
        const todo_id = new BuilderTodo().validTodoId;
        const createTodo = new BuilderTodo()
        .addTitle()
        .generate()
        const todos = new TodosService(request);
        let response = await todos.putExactIdTodo(token, testinfo, todo_id, createTodo);
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(200);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.title).toBe('one two three');
    });

    test("21 PUT /todos/{id} no title (400) @todos", async ( { request }, testinfo ) => {
        const todo_id = new BuilderTodo().validTodoId;
        const createTodo = new BuilderTodo()
        .addTitle(null)
        .generate()
        const todos = new TodosService(request);
        let response = await todos.putExactIdTodo(token, testinfo, todo_id, createTodo);
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(400);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.errorMessages[0]).toContain('title : field is mandatory');
    });

    test("22 PUT /todos/{id} no amend id (400) @todos", async ( { request }, testinfo ) => {
        const todo_id = new BuilderTodo().validTodoId;
        const createTodo = new BuilderTodo()
        .addInvalidTodoId()
        .addDoneStatus(true)
        .addTitle()
        .addDescription()
        .generate()
        const todos = new TodosService(request);
        let response = await todos.putExactId(token, testinfo, todo_id, createTodo);
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(400);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.errorMessages[0]).toContain('Can not amend id from');
        
    });

    test("23 DELETE /todos/{id} (200) @todos", async ( { request }, testinfo ) => {
        const todo_id = new BuilderTodo().validTodoId;
        const todos = new TodosService(request);
        let response = await todos.delTodo(token, testinfo, todo_id)
        let re_response = await todos.getExactTodo (token, testinfo, todo_id)
        let body = await re_response.json();
        let headers = re_response.headers();

        expect(response.status()).toBe(200);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.errorMessages[0]).toContain('Could not find an instance with');
    });

    test("24 OPTIONS /todos (200) @todos", async ({ request }, testinfo) => {
        const todos = new TodosService(request);
        const response = await todos.optionsTodo(token, testinfo)
        let headers = response.headers();

        expect(response.status()).toBe(200);
        expect(headers["allow"]).toContain("OPTIONS");
        expect(headers["allow"]).toContain("GET");
        expect(headers["allow"]).toContain("POST");
        expect(headers["allow"]).toContain("HEAD");
        expect(headers["allow"]).not.toContain("PUT");
        expect(headers["allow"]).not.toContain("DELETE");
        expect(headers["allow"]).not.toContain("PATCH");
    });

    test("25 GET /todos (200) XML @todos", async ( { request }, testinfo ) => {
        const todos = new TodosService(request);
        const response = await todos.getXmlBody(token, testinfo);
        let headers = response.headers();

        expect(response.status()).toBe(200);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(headers["content-type"]).toContain("application/xml");
    });

    test("26 GET /todos (200) JSON @todos", async ( { request }, testinfo ) => {
        const todos = new TodosService(request);
        const response = await todos.getJsonBody(token, testinfo);
        let headers = response.headers();

        expect(response.status()).toBe(200);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(headers["content-type"]).toContain("application/json");
    });

    test("27 GET /todos (200) ANY @todos", async ( { request }, testinfo ) => {
        const todos = new TodosService(request);
        const response = await todos.getAnyBody(token, testinfo);
        let headers = response.headers();

        expect(response.status()).toBe(200);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(headers["content-type"]).toContain("application/json");
    });

    test("28 GET /todos (200) XML pref @todos", async ( { request }, testinfo ) => {
        const todos = new TodosService(request);
        const response = await todos.getXmlPrefBody(token, testinfo);
        let headers = response.headers();

        expect(response.status()).toBe(200);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(headers["content-type"]).toContain("application/xml");
    });

    test("29 GET /todos (200) no accept @todos", async ( { request }, testinfo ) => {
        const todos = new TodosService(request);
        const response = await todos.getTodosList(token, testinfo);
        let headers = response.headers();

        expect(response.status()).toBe(200);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(headers["content-type"]).toContain("application/json");
    });

    test("30 GET /todos (406) @todos", async ( { request }, testinfo ) => {
        const todos = new TodosService(request);
        const response = await todos.getInvalidFormat(token, testinfo);
        let headers = response.headers();

        expect(response.status()).toBe(406);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(headers["content-type"]).toContain("application/json");
    });

    test("31 POST /todos XML @todos", async ( { request }, testinfo ) => {
        const todos = new TodosService(request);
        const response = await todos.postXmlData(token, testinfo);
        let headers = response.headers();

        expect(response.status()).toBe(201);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(headers["content-type"]).toContain("application/xml");
    });

    test("32 POST /todos JSON @todos", async ( { request }, testinfo ) => {
        const createTodo = new BuilderTodo()
        .addDoneStatus()
        .addTitle()
        .addDescription()
        .generate();
        const todos = new TodosService(request);
        const response = await todos.postJson(token, testinfo, createTodo);
        let headers = response.headers();

        expect(response.status()).toBe(201);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(headers["content-type"]).toContain("application/json");
    });

    test("33 POST /todos (415) @todos", async ( { request }, testinfo ) => {
        const createTodo = new BuilderTodo()
        .addDoneStatus()
        .addTitle()
        .addDescription()
        .generate();
        const todos = new TodosService(request);
        const response = await todos.postInvalidFormat(token, testinfo, createTodo);
        let headers = response.headers();

        expect(response.status()).toBe(415);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(headers["content-type"]).toContain("application/json");
    });

    test("41 DELETE /heartbeat (405) @heartbeat", async ( { request }, testinfo ) => {
        const createTodo = new BuilderTodo()
        .addDoneStatus()
        .addTitle()
        .addDescription()
        .generate();
        const heartbeat = new HeartbeatService(request);
        const response = await heartbeat.deleteHeartbeat(token, testinfo, createTodo);
        let headers = response.headers();

        expect(response.status()).toBe(405);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(headers["content-type"]).toContain("application/json");
    });

    test("42 PATCH /heartbeat @heartbeat", async ( { request }, testinfo ) => {
        const createTodo = new BuilderTodo()
        .addDoneStatus()
        .addTitle()
        .addDescription()
        .generate();
        const heartbeat = new HeartbeatService(request);
        const response = await heartbeat.patchHeartbeat(token, testinfo, createTodo);
        let headers = response.headers();

        expect(response.status()).toBe(500);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(headers["content-type"]).toContain("application/json");
    });

    test("58 DELETE /todos/{id} (200) all @todos", async ( { request }, testinfo ) => {
        let todo_id = 1;
        let response
        const todos = new TodosService(request);
        while (todo_id <= 10) {
            response = await todos.delAllTodos(token, testinfo, todo_id);
            todo_id += 1;
        };
        let headers = response.headers();

        expect(response.status()).toBe(200);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    });

});