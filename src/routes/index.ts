import express, { Router } from "express";
import { fromNodeHeaders, toNodeHandler } from 'better-auth/node';
import { auth } from "../utils/auth";
import authRouter from './auth';

const router = Router();


router.use(authRouter);

export default router;