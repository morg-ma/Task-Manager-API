import express, { Router } from "express"; 
import { toNodeHandler } from 'better-auth/node';
import { auth } from "../config/auth.config";
import * as authHandler from '../handlers/auth.handler';
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.all('/api/auth/*', toNodeHandler(auth));
router.use(express.json());

// GET
router.get("/api/login", authHandler.signIn);
router.get("/api/protected", isAuthenticated, authHandler.helloAuth);
router.get("/api/auth/callback/google",authHandler.callbackGoogle);
router.get("/api/session", authHandler.getSession);

// POST
router.post("/api/logout", authHandler.logOut);
router.post("/api/verifyPhone", authHandler.verifyPhone);

export default router;