import { Request, Response } from "express";
import { auth } from "../config/auth.config";
import { fromNodeHeaders } from "better-auth/node";

export async function signIn(req: Request, res: Response) {
    const apiResponse = await auth.api.signInSocial({
        body: {
            provider: 'google',
        },
    });

    if (apiResponse.url) {
        return res.redirect(apiResponse.url);
    }
    res.status(400).json('Error signing in');
}

export async function callbackGoogle(req: Request, res: Response) {
    res.status(200).json('Authenticated');
}

export async function logOut(req: Request, res: Response) {
    try {
        await auth.api.signOut({
            headers: fromNodeHeaders(req.headers),
        });
        res.status(200).json('Logged out');
    } catch (error) {
        res.status(400).json('Already logged out');
    }
}

export async function getSession(req: Request, res: Response) {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });
    console.log(session?.user);
    if (!session) {
        res.status(401).json('Unauthorized');
        return;
    }
    res.status(200).json(session);
}

export async function verifyPhone(req: Request, res: Response) {
    try {

        const session = req.session;
        const { id, phoneNumber } = req.body;

        if (!id || !phoneNumber || !session) {
            res.status(400).json('Invalid request');
            return;
        }

        const user = await (await auth.$context).adapter.findOne({
            model: 'user',
            where: [ { field: 'id', value: id } ]
        });

        if (!user) {
            res.status(404).json("User not found");
            return; 
        }

        await (await auth.$context).adapter.update({
            model: 'user',
            where: [ { field: 'id', value: id } ],
            update: { phoneNumber: phoneNumber, phoneNumberVerified: true }
        });

        res.status(200).json('Phone Verified');
    } catch (err) {
        console.log(err);
        res.status(500).json('Error Verifying Phone');
        return;
    }
}

export async function helloAuth(req: Request, res: Response) {
    console.log(req.user);
    console.log(req.session);
    res.status(200).json('Hello Authenticated');
} 