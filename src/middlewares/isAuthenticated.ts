import { NextFunction, Request, Response } from "express";
import { auth } from "../utils/auth";
import { fromNodeHeaders } from "better-auth/node";

declare module "express" {
    interface Request {
        user?: any;
        session?: any;
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });

        if (!session) throw new Error("Not Authenticated!");

        if (session.session.createdAt && new Date(session.session.expiresAt) < new Date()) throw new Error("Session Expired!");

        if (!session.user.phoneNumberVerified) throw new Error("Phone number not verified!");

        req.user = session.user;
        req.session = session.session;

        next();

    } catch (err) {
        res.status(401).json(err);
    }
};