import express from 'express';
import {SnippetsController} from "./snippets.controller";
import expressAsyncHandler from "express-async-handler";
const router = express.Router();

router.get('/',  expressAsyncHandler(SnippetsController.list));

export default router;
