import {Request, Response, NextFunction} from "express";
import {prisma} from "../services/prima";

export class LanguagesController {
    static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        const languages = await prisma.language.findMany({include: {snippets: true}}).then((languages) => {return languages});
        const user = req.session.user;
        res.render('languages/languages_list', {languages ,title: 'Liste des langages', section: 'Langages', user});
    }
}
