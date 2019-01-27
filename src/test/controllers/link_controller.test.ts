import { expect } from "chai";
import { it, describe } from "mocha";
import { getHandlers } from "../../backend/controllers/link_controller";
import { Link } from "../../backend/entities/Link";
import { User } from "../../backend/entities/User";
import { Vote } from "../../backend/entities/Vote";

describe("Link Controller", () => {
    it("Should be able to upvote a link", () => {
        const fakeUser = new User ();
        fakeUser.id = 1;
        const fakeLink = new Link();
        fakeLink.id = 1;
        const fakeVote = new Vote();
        fakeVote.positive = true;
        fakeVote.user = fakeUser;
        fakeVote.link = fakeLink;
        const fakeRequest: any = {
            params: {
                id: fakeLink.id
            },
            userId: fakeUser.id
        };
        const expectedOk = {
            ok: "ok"
        };
        const fakeVoteParam = {
            link: fakeLink,
            user: fakeUser
        };
        const fakeResponse: any = {
            json: (result: object) => {
                expect(result).to.deep.equals(expectedOk)
            }
        };
        const fakeLinkRepository: any = {
            findOne: (id: number) => {
                expect(id).to.eq(fakeLink.id);
                return Promise.resolve(fakeLink);
            }
        };
        const fakeVoteRepository: any = {
            findOne: (conditions: Vote) => {
                expect(conditions).to.deep.equal(fakeVoteParam);
                return Promise.resolve(null);
            },
            save: (vote: Vote) => {
                expect(vote).to.deep.equal(fakeVote);
                Promise.resolve();
            }
        };

        const handlers = getHandlers(fakeLinkRepository, fakeVoteRepository);
        handlers.postVote(fakeRequest, fakeResponse, fakeVote.positive);
    });
});