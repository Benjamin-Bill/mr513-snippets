import express from 'express';
import {SnippetsController} from "./snippets.controller";
import expressAsyncHandler from "express-async-handler";
import {body, query} from "express-validator";
import {languageValidator} from "../languages/languages.middlewares";
import {prisma} from "../services/prima";
import {isAuthoreConnected, isConnected} from "../auth/auth.middleware";
const router = express.Router();

router.get('/', query('lang').optional().notEmpty().isInt().custom(async value => {await languageValidator(value)}),expressAsyncHandler(SnippetsController.list));
router.get('/new',isConnected, expressAsyncHandler(SnippetsController.newForm));
router.get('/edit/:id',isConnected, isAuthoreConnected,expressAsyncHandler(SnippetsController.editForm));
router.get('/delete/:id', isConnected, isAuthoreConnected, expressAsyncHandler(SnippetsController.deleteSnippet));
router.post('/new',
    isConnected,
    express.urlencoded({ extended: true }),
        body('title').notEmpty().isString().isLength({ min: 5, max: 50 }).withMessage('Le titre doit contenir entre 5 et 50 caractères'),
        body('code').notEmpty().isLength({ min: 1, max: 1000 }).withMessage('Le code doit contenir entre 1 et 1000 caractères'),
        body('description').isString().isLength({ min: 0, max: 1000 }).withMessage('La description doit contenir au maximum 1000 caractères '),
    async (req, res, next) => {
        try {
            await prisma.language.findUnique({ where: { id: parseInt(req.body.languages) }});
            next();
        } catch (error) {
                next(error);
            }
        },
        expressAsyncHandler(SnippetsController.newSnippet)
    );
router.post('/edit/:id',
    isConnected,
  isAuthoreConnected,
  body('title').notEmpty().isString().isLength({ min: 5, max: 50 }).withMessage('Le titre doit contenir entre 5 et 50 caractères'),
  body('code').notEmpty().isLength({ min: 1, max: 1000 }).withMessage('Le code doit contenir entre 1 et 1000 caractères'),
  body('description').isString().isLength({ min: 0, max: 1000 }).withMessage('La description doit contenir au maximum 1000 caractères '),
  async (req, res, next) => {
    try {
      await prisma.snippet.findUnique({ where: { id: parseInt(req.params.id) }});
      next();
    } catch (error) {
      next(error);
    }
  },
  async (req, res, next) => {
    try {
      await prisma.language.findUnique({ where: { id: parseInt(req.body.languages) }});
      next();
    } catch (error) {
      next(error);
    }
  },
  expressAsyncHandler(SnippetsController.editSnippet)
);



export default router;
