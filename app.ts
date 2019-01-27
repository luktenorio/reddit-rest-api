import express from "express";
import bodyParser from "body-parser";
import { createDbConnection } from "./db";
import { getAuthController } from "./src/backend/controllers/auth_controller";
import { getCommentController } from "./src/backend/controllers/comment_controller";
import { getLinkController } from "./src/backend/controllers/link_controller";
import { getUserController } from "./src/backend/controllers/user_controller";

export async function createApp() {
    // Create db connection
    await createDbConnection();

    // Creates app
    const app = express();

    // Server config to be able to send JSON
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Declare main path
    app.get("/", (req, res) => {
        res.send("This is the home page!");
    });

    // Declare controllers
    const authController = getAuthController();
    const commentsController = getCommentController();
    const linksController = getLinkController();
    const usersController = getUserController();
    app.use("/auth", authController);
    app.use("/comments", commentsController);
    app.use("/links", linksController);
    app.use("/users", usersController);

    interface Error {
        status?: number;
        message?: string;
    }  
  
    app.use((err:Error, req:express.Request, res:express.Response,next:express.NextFunction) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });

    return app;
};