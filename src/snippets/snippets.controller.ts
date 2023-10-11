import {Request, Response, NextFunction} from "express";
import {prisma} from "../services/prima";

export class SnippetsController {
    static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        const snippets = await prisma.snippet.findMany().then((snippets) => {return snippets});
        res.render('snippets/snippets_list', {snippets, title: 'Liste des snippets', section: 'Snippets' });
    }
}

