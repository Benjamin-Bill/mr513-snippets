import {Request, Response, NextFunction} from "express";
import {prisma} from "../services/prima";
import {validationResult} from "express-validator";

export class SnippetsController {
    static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        const result = validationResult(req);
        if (result.isEmpty()) {
            const snippets = req.query.lang ? await prisma.snippet.findMany({
                include: {Language: true, User: true},
                where: {languageId: parseInt(<string>req.query.lang)}
            }).then((snippets) => {
                return snippets
            }) : await prisma.snippet.findMany({include: {Language: true}}).then((snippets) => {
                return snippets
            });
            const user = req.session.user;
            res.render('snippets/snippets_list', {snippets, title: 'Liste des snippets', section: 'Snippets', user});
        } else {
            throw new Error(result.array()[0].msg);
        }
    }
}

