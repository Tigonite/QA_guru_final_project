import { expect } from "@playwright/test";
import { test } from "../../src/helpers/fixtures/index";
import { BuilderTodo } from "../../src/helpers/builders/api.builder";

test.describe("Tests for APIchallenge", () => {
    
    let token;

    test.beforeAll(async ( { api } ) => {
        token = await api.challenger.post();
        console.log(token);
    });

    test.describe("GET requests", () => {
        test("02 GET /challenges (200) @challenges", async ( { api } ) => {
            const result = await api.challenges.getChallenges(token, testinfo);

            await expect(result.response.status()).toBe(200);
            await expect(result.headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            await expect(result.body.challenges.length).toBe(59)
        });

        test("03 GET /todos (200) @todos", async ( { api },  testinfo) => {
            const result = await api.todos.getTodos(token, testinfo);
    
            await expect(response.status()).toBe(200);
            await expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            await expect(body.todos.length).toBe(10)
        });

        test("04 GET /todo (404) @todo",  async ( { api } ) => {
            const response = await api.todos.getNotFound(token);
            const headers = response.headers();

            await expect(response.status()).toBe(404);
            await expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        });

        test("05 GET /todos/{id} (200) @todos", async ( { api }, testinfo ) => {
            const todo_id = new BuilderTodo().validTodoId;
            let result = await api.todos.getTodosPositive(token, testinfo`${URL}/todos/${todo_id}`);
        
            expect(response.status()).toBe(200);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(body.todos.length).toBe(1);
        });

        test("06 GET /todos/{id} (404) @todos_id", async ( { request } ) => {
            const todo_id = new BuilderTodo().invalidTodoId;
            let response = await request.get(`${URL}/todos/${todo_id}`, {
            headers: {
                "x-challenger": token
            }},
        );
            let body = await response.json();
            let headers = response.headers();

            expect(response.status()).toBe(404);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(body.todos).toBe(undefined);
        });

        test("07 GET /todos (200) ?filter @todos", async ( { request } ) => {
            let response = await request.get(`${URL}/todos?doneStatus=false`, {
                headers: {
                "x-challenger": token
            }},
        );
            let body = await response.json();
            let headers = response.headers();

            expect(response.status()).toBe(200);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(body.todos[0].doneStatus).toBe(false);
        });

        test("25 GET /todos (200) XML @todos", async ( { request } ) => {
            let response = await request.get(`${URL}/todos`, {
                headers: {
                    "x-challenger": token,
                    accept: "application/xml",
                }, 
                },
            );

            let headers = response.headers();

            expect(response.status()).toBe(200);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(headers["content-type"]).toContain("application/xml");
        });

        test("26 GET /todos (200) JSON @todos", async ( { request } ) => {
            let response = await request.get(`${URL}/todos`, {
                headers: {
                    "x-challenger": token,
                    accept: "application/json",
                }, 
                },
            );

            let headers = response.headers();

            expect(response.status()).toBe(200);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(headers["content-type"]).toContain("application/json");
        });

        test("27 GET /todos (200) ANY @todos", async ( { request } ) => {
            let response = await request.get(`${URL}/todos`, {
                headers: {
                    "x-challenger": token,
                    accept: "*/*",
                }, 
                },
            );

            let headers = response.headers();

            expect(response.status()).toBe(200);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(headers["content-type"]).toContain("application/json");
        });

        test("28 GET /todos (200) XML pref @todos", async ( { request } ) => {
            let response = await request.get(`${URL}/todos`, {
                headers: {
                    "x-challenger": token,
                    accept: "application/xml, application/json",
                }, 
                },
            );

            let headers = response.headers();

            expect(response.status()).toBe(200);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(headers["content-type"]).toContain("application/xml");
        });

        test("29 GET /todos (200) no accept @todos", async ( { request } ) => {
            let response = await request.get(`${URL}/todos`, {
                headers: {
                    "x-challenger": token,
                }, 
                },
            );

            let headers = response.headers();

            expect(response.status()).toBe(200);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(headers["content-type"]).toContain("application/json");
        });

        test("30 GET /todos (406) @todos", async ( { request } ) => {
            let response = await request.get(`${URL}/todos`, {
                headers: {
                    "x-challenger": token,
                    accept: "application/gzip",
                }, 
                },
            );

            let headers = response.headers();

            expect(response.status()).toBe(406);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(headers["content-type"]).toContain("application/json");
        });

    })
    

    test.describe("HEAD requests", () => {   
        test("08 HEAD /todos (200) @todos", async ( { request } ) => {
            let response = await request.head(`${URL}/todos`, {
                headers: {
                    "x-challenger": token
                }},
            );
            let headers = response.headers();

            expect(response.status()).toBe(200);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        });
    })

    test.describe("POST requests", () => {
        test("09 POST /todos (201) @todos", async ( { request } ) => {
            const createTodo = new BuilderTodo()
            .addDoneStatus(true)
            .addTitle()
            .addDescription()
            .generate()
            let response = await request.post(`${URL}/todos`, {
                headers: {
                    "x-challenger": token}, 
                data: createTodo,
                },
            );
            let body = await response.json();
            let headers = response.headers();

            expect(response.status()).toBe(201);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(body.doneStatus).toEqual(true);
            expect(body.title).toBe('one two three');
            expect(body.description).toBe('just bla bla bla');
        });

        test("10 POST /todos (400) @todos", async ( { request } ) => {
            const createTodo = new BuilderTodo()
            .addDoneStatus("true")
            .addTitle()
            .addDescription()
            .generate()
            let response = await request.post(`${URL}/todos`, {
                headers: {
                    "x-challenger": token}, 
                data: createTodo,
                },
            );
            let body = await response.json();
            let headers = response.headers();

            expect(response.status()).toBe(400);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(body.errorMessages[0]).toContain("Failed Validation: doneStatus should be BOOLEAN");
        });

        test("11 POST /todos (400) title too long @todos", async ( { request } ) => {
            const createTodo = new BuilderTodo()
            .addDoneStatus()
            .addLongTitle()
            .addDescription()
            .generate()
            let response = await request.post(`${URL}/todos`, {
                headers: {
                    "x-challenger": token}, 
                    data: createTodo,
                },
            );
            let body = await response.json();
            let headers = response.headers();

            expect(response.status()).toBe(400);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(body.errorMessages[0]).toContain("Failed Validation: Maximum allowable length exceeded for title - maximum allowed is 50");
        });

        test("12 POST /todos (400) description too long @todos", async ( { request } ) => {
            const createTodo = new BuilderTodo()
            .addDoneStatus()
            .addTitle()
            .addLongDescription()
            .generate()
            let response = await request.post(`${URL}/todos`, {
                headers: {
                    "x-challenger": token}, 
                    data: createTodo,
                },
            );
            let body = await response.json();
            let headers = response.headers();

            expect(response.status()).toBe(400);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(body.errorMessages[0]).toContain("Failed Validation: Maximum allowable length exceeded for description - maximum allowed is 200");
        });

        test("13 POST /todos (201) max out content @todos", async ( { request } ) => {
            const createTodo = new BuilderTodo()
            .addDoneStatus()
            .addMaxTitle()
            .addMaxDescription()
            .generate()
            let response = await request.post(`${URL}/todos`, {
                headers: {
                    "x-challenger": token}, 
                    data: createTodo,
                },
            );
            let body = await response.json();
            let headers = response.headers();

            expect(response.status()).toBe(201);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(body.doneStatus).toEqual(false);
            expect(body.title.length).toBe(50);
            expect(body.description.length).toBe(200);
        });

        test("14 POST /todos (413) content too long @todos", async ( { request } ) => {
            const createTodo = new BuilderTodo()
            .addDoneStatus()
            .addTitle()
            .addOverDescription()
            .generate()
            let response = await request.post(`${URL}/todos`, {
                headers: {
                    "x-challenger": token}, 
                    data: createTodo,
                },
            );
            let body = await response.json();
            let headers = response.headers();

            expect(response.status()).toBe(413);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(body.errorMessages[0]).toContain("Error: Request body too large, max allowed is 5000 bytes");
        });

        test("15 POST /todos (400) extra @todos", async ( { request } ) => {
            const createTodo = new BuilderTodo()
            .addDoneStatus()
            .addTitle()
            .addDescription()
            .addPriority()
            .generate()
            let response = await request.post(`${URL}/todos`, {
                headers: {
                    "x-challenger": token}, 
                    data: createTodo,
                },
            );
            let body = await response.json();
            let headers = response.headers();

            expect(response.status()).toBe(400);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(body.errorMessages[0]).toContain('Could not find field: priority');
        });

        test("17 POST /todos/{id} (200) @todos_id", async ( { request } ) => {
            const todo_id = new BuilderTodo().validTodoId;
            const createTodo = new BuilderTodo()
            .addTitle()
            .generate()
            let response = await request.post(`${URL}/todos/${todo_id}`, {
                headers: {
                    "x-challenger": token}, 
                    data: createTodo,
                },
            );
            let body = await response.json();
            let headers = response.headers();

            expect(response.status()).toBe(200);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(body.title).toBe('one two three');
        });

        test("18 POST /todos/{id} (404) @todos_id", async ( { request } ) => {
            const todo_id = new BuilderTodo().invalidTodoId;
            const createTodo = new BuilderTodo()
            .addTitle()
            .generate()
            let response = await request.post(`${URL}/todos/${todo_id}`, {
                headers: {
                    "x-challenger": token}, 
                    data: {
                        data: createTodo,
                    }
                },
            );
            let body = await response.json();
            let headers = response.headers();

            expect(response.status()).toBe(404);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(body.errorMessages[0]).toContain('No such todo entity instance with id');
        });

        test("31 POST /todos XML @todos", async ( { request } ) => {
            let response = await request.post(`${URL}/todos`, {
                headers: {
                    "x-challenger": token,
                    "Content-Type": 'application/xml',
                    "accept": "application/xml",
                },
                data: '<?xml version="1.0" encoding="UTF-8"?><todo><doneStatus>true</doneStatus><title>file paperwork today</title></todo>'
                });

            let headers = response.headers();

            expect(response.status()).toBe(201);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(headers["content-type"]).toContain("application/xml");
        });

        test("32 POST /todos JSON @todos", async ( { request } ) => {
            const createTodo = new BuilderTodo()
            .addDoneStatus()
            .addTitle()
            .addDescription()
            .generate();
            let response = await request.post(`${URL}/todos`, {
                headers: {
                    "x-challenger": token,
                    "Content-Type": 'application/json',
                    "accept": "application/json",
                },
                data: createTodo,
                });

            let headers = response.headers();

            expect(response.status()).toBe(201);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(headers["content-type"]).toContain("application/json");
        });

        test("33 POST /todos (415) @todos", async ( { request } ) => {
            const createTodo = new BuilderTodo()
            .addDoneStatus()
            .addTitle()
            .addDescription()
            .generate();
            let response = await request.post(`${URL}/todos`, {
                headers: {
                    "x-challenger": token,
                    "Content-Type": 'gzip',
                    "accept": "application/json",
                },
                data: createTodo
            });

            let headers = response.headers();

            expect(response.status()).toBe(415);
            expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
            expect(headers["content-type"]).toContain("application/json");
        });

})
test.describe("PUT requests", () => {
    test("16 PUT /todos/{id} (400) @todos_id", async ( { request } ) => {
        const todo_id = new BuilderTodo().invalidTodoId;
        const createTodo = new BuilderTodo()
        .addDoneStatus()
        .addTitle()
        .addDescription()
        .generate()
        let response = await request.put(`${URL}/todos/${todo_id}`, {
            headers: {
                "x-challenger": token}, 
                data: createTodo,
            },
        );
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(400);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.errorMessages[0]).toContain('Cannot create todo with PUT due to Auto fields id');
    });

    test("19 PUT /todos/{id} full (200) @todos_id", async ( { request } ) => {
        const todo_id = new BuilderTodo().validTodoId;
        const createTodo = new BuilderTodo()
        .addDoneStatus(true)
        .addTitle()
        .addDescription("bla")
        .generate()
        let response = await request.put(`${URL}/todos/${todo_id}`, {
            headers: {
                "x-challenger": token}, 
                data: createTodo,
            },
        );
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(200);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.doneStatus).toBe(true);
        expect(body.title).toBe('one two three');
        expect(body.description).toBe('bla');
    });

    test("20 PUT /todos/{id} full (200) @todos_id", async ( { request } ) => {
        const todo_id = new BuilderTodo().validTodoId;
        const createTodo = new BuilderTodo()
        .addTitle()
        .generate()
        let response = await request.put(`${URL}/todos/${todo_id}`, {
            headers: {
                "x-challenger": token}, 
                data: createTodo,
            },
        );
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(200);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.title).toBe('one two three');
    });

    test("21 PUT /todos/{id} no title (400) @todos_id", async ( { request } ) => {
        const todo_id = new BuilderTodo().validTodoId;
        const createTodo = new BuilderTodo()
        .addTitle(null)
        .generate()
        let response = await request.put(`${URL}/todos/${todo_id}`, {
            headers: {
                "x-challenger": token}, 
                data: createTodo,
            },
        );
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(400);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.errorMessages[0]).toContain('title : field is mandatory');
    });

    test("22 PUT /todos/{id} no amend id (400) @todos_id", async ( { request } ) => {
        const todo_id = new BuilderTodo().validTodoId;
        const todo_wrong_id = new BuilderTodo().invalidTodoId;
        let response = await request.put(`${URL}/todos/${todo_id}`, {
            headers: {
                "x-challenger": token}, 
                data: {
                    id: todo_wrong_id,
                    doneStatus: true,
                    title: 'one two three',
                    description: 'bla',
                }
            },
        );
        let body = await response.json();
        let headers = response.headers();

        expect(response.status()).toBe(400);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(body.errorMessages[0]).toContain('Can not amend id from');
    });
})
    
test.describe("OPTIONS requests", () => {
    test("24 OPTIONS /todos (200) @todos", async ({ request }) => {
    let response = await request.fetch(`${URL}/todos`, {
      method: "OPTIONS",
      headers: {
        "x-challenger": token,
      },
    });
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

})

    /*test("41 DELETE /heartbeat (405) @todos", async ( { request } ) => {
        const createTodo = new BuilderTodo()
        .addDoneStatus()
        .addTitle()
        .addDescription()
        .generate();
        let response = await request.delete(`${URL}/heartbeat`, {
            headers: {
                "x-challenger": token,
                "Content-Type": 'application/json',
                "accept": "application/json",
            },
            data: createTodo,
            });

        let headers = response.headers();

        expect(response.status()).toBe(405);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(headers["content-type"]).toContain("application/json");
    });

    test("42 PATCH /heartbeat @hartbeat", async ( { request } ) => {
        const createTodo = new BuilderTodo()
        .addDoneStatus()
        .addTitle()
        .addDescription()
        .generate();
        let response = await request.patch(`${URL}/heartbeat`, {
            headers: {
                "x-challenger": token,
                "Content-Type": 'application/json',
                "accept": "application/json",
            },
            data: createTodo,
            });

        let headers = response.headers();

        expect(response.status()).toBe(500);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(headers["content-type"]).toContain("application/json");
    });*/

test.describe("DELETE requests", () => {

    test("23 DELETE /todos/{id} (200) @todos_id", async ( { request } ) => {
    const todo_id = new BuilderTodo().validTodoId;
    let response = await request.delete(`${URL}/todos/${todo_id}`, {
        headers: {
            "x-challenger": token}, 
        },
    );
    let re_response = await request.get(`${URL}/todos/${todo_id}`, {
        headers: {
            "x-challenger": token}, 
        },
    );

    let body = await re_response.json();
    let headers = re_response.headers();

    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(body.errorMessages[0]).toContain('Could not find an instance with');
    });
    
    test("41 DELETE /heartbeat (405)", {
        tag: ["@hartbeat"],}, async ( { api } ) => {
        const response = await api.heartbeat.deleteRequest(token);
        const headers = response.headers();
        console.log(`Токен: ${token}`);
        
        expect(response.status()).toBe(405);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
        expect(headers["content-type"]).toContain("application/json");
    });

    test("58 DELETE /todos/{id} (200) all @todos_id", {
        tag: ["@todos"],}, async ( { api } ) => {
        let todo_id = 1;
        let response
        while (todo_id <= 10) {
        response = await api.todos.delete(token);
        todo_id += 1;
            };
        const headers = response.headers();

        expect(response.status()).toBe(200);
        expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    });

});
})