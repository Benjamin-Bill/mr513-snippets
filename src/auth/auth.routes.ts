import express from 'express';
import expressAsyncHandler from "express-async-handler";
import {AuthController} from "./auth.controller";
const router = express.Router();

router.get('/',expressAsyncHandler(AuthController.loginForm));
router.get('/logout', AuthController.logout)
router.post('/login', expressAsyncHandler(AuthController.login));

export default router;
