import express from 'express';
import {SnippetsController} from "./snippets.controller";
import expressAsyncHandler from "express-async-handler";
import {query} from "express-validator";
import {languageValidator} from "../languages/languages.middlewares";
const router = express.Router();

router.get('/', query('lang').notEmpty().isInt().custom(async value => {await languageValidator(value)}),expressAsyncHandler(SnippetsController.list));

export default router;
