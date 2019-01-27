import request from "supertest";
import { it, describe } from "mocha"; 
import { createApp } from "../../../app";

describe("Link integration", () => {
    it("HTTP POST /links should insert a link", (done) => {
        (async () => {
            const app = await createApp();

            const data = {
                url: "http://google.com/",
                title: "Google",
                user: { id: 1 }
            };

            request(app)
            .post("/api/v1/links")
            .send(data)
            .set('Content-Type', 'application/json')
            .set("x-auth-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ4NTk3MzMzfQ.g68RkBPmXJGBt3mczMzxfLc9YKfk-m3OGW458AKKkwE")
            .expect(200)
            .end(function (err) {
                if (err) throw err;
                done();
            });
        })();
    });
});