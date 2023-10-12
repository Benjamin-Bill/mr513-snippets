import express from 'express';
import expressAsyncHandler from "express-async-handler";
import {LanguagesController} from "./languages.controller";
const router = express.Router();

router.get('/',expressAsyncHandler(LanguagesController.list));

export default router;
