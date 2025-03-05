import { Request, Response, Router } from "express"; 
import { toNodeHandler } from 'better-auth/node';
import { auth } from "../utils/auth";

const router = Router();

router.all('/api/auth/*', toNodeHandler(auth));

router.get('/api/login', async (req: Request, res: Response) => {
    const response = await auth.api.signInSocial({
        body: {
            provider: 'google',
        },
    });

    if (response.url)
        return res.redirect(response.url);

    res.sendStatus(500);
});

router.get('/api/auth/google/callback', (req: Request, res: Response) => {
    res.status(200).send("Authenticated");    
});

export default router;