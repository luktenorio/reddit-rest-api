//POST USER
(async () => {
    const data = {
        email: "marcelo.vinicius1986@gmail.com",
        password: "password"
    };
    const response = await fetch(
        "http://localhost:8080/users/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    console.log(json);
})();

//GET USER
(async () => {
    const response = await fetch(
        "http://localhost:8080/users/1",
        {
            method: "GET"
        }
    );
    const json = await response.json();
    console.log(json);
})();

//AUTH - Get token
(async () => {
    const data = {
        email: "marcelo.vinicius1986@gmail.com",
        password: "password"
    };
    const response = await fetch(
        "http://localhost:8080/auth/login/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    console.log(json);
})();

//POST LINK
(async () => {
    const data = {
        url: "http://typeorm.io/",
        title: "TypeORM",
        user: { id: 1 }
    };
    const response = await fetch(
        "http://localhost:8080/links/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ4NTk3MzMzfQ.g68RkBPmXJGBt3mczMzxfLc9YKfk-m3OGW458AKKkwE"
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    console.log(json);
})();

//DELETE LINK
(async () => {
    const response = await fetch(
        "http://localhost:8080/links/7",
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ4NTk3MzMzfQ.g68RkBPmXJGBt3mczMzxfLc9YKfk-m3OGW458AKKkwE"
            }
        }
    );
    const json = await response.json();
    console.log(json);
})();

//POST UPVOTE LIKS
(async () => {
    const response = await fetch(
        "http://localhost:8080/links/2/upvote",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ4NTk3MzMzfQ.g68RkBPmXJGBt3mczMzxfLc9YKfk-m3OGW458AKKkwE"
            }
        }
    );
    const json = await response.json();
    console.log(json);
})();

//POST COMMENT
(async () => {
    const data = {
        content: "Nice link!",
        user: { id: 1 },
        link: { id: 2 }
    };
    const response = await fetch(
        "http://localhost:8080/comments/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ4NTk3MzMzfQ.g68RkBPmXJGBt3mczMzxfLc9YKfk-m3OGW458AKKkwE"
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    console.log(json);
})();

//PUT COMMENT
(async () => {
    const data = { content: "Thanks" };
    const response = await fetch(
        "http://localhost:8080/comments/1",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ4NTk3MzMzfQ.g68RkBPmXJGBt3mczMzxfLc9YKfk-m3OGW458AKKkwE"
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    console.log(json);
})();

//DELETE COMMENT
(async () => {
    const response = await fetch(
        "http://localhost:8080/comments/1",
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ4NTk3MzMzfQ.g68RkBPmXJGBt3mczMzxfLc9YKfk-m3OGW458AKKkwE"
            }
        }
    );
    const json = await response.json();
    console.log(json);
})();