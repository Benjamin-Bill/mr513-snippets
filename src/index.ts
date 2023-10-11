import express, {NextFunction, Response, Request} from 'express';
import 'dotenv/config'
import session from 'express-session';
import snippets from './snippets/snippets.routes';

const app = express();
const port = process.env.PORT;

app.use(express.static('public'));

app.use(session({
    secret: process.env.SECRET || 'secret',
    saveUninitialized: false,
    resave: false
}));

declare module 'express-session' {
    interface SessionData {
    }
}

app.set('view engine', 'ejs');

app.use('/', snippets);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.render('error', { err });
});

app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});
