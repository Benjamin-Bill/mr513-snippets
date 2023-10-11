import {Request, Response, NextFunction} from "express";
import {prisma} from "../services/prima";

export class SnippetsController {
    static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        const snippets = prisma.snippet.findMany().then((snippets) => console.log(snippets));
        res.render('snippets/snippets_list', {snippets: snippets, title: 'Liste des snippets', async: true});
    }
}

