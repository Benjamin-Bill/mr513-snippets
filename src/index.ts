import express, {NextFunction, Response, Request} from 'express';
import 'dotenv/config'
import session from 'express-session';
import snippetsRoutes from './snippets/snippets.routes';
import languagesRoutes from "./languages/languages.routes";

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

app.use('/', snippetsRoutes);
app.use('/languages', languagesRoutes);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.render('error', { err });
});

app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});
