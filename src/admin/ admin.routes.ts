import express from 'express';
import expressAsyncHandler from "express-async-handler";
import {AdminController} from "./admin.controller";
import {isConnected} from "../auth/auth.middleware";
const router = express.Router();

router.get('/',isConnected, expressAsyncHandler(AdminController.index));

export default router;
