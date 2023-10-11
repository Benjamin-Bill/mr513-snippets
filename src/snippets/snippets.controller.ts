import {Request, Response, NextFunction} from "express";

export class SnippetsController {
    static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Ceci est un message d'erreur");
    }
}

