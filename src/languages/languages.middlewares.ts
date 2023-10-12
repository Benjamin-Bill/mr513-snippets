import {prisma} from "../services/prima";

export async function languageValidator(languageId: string): Promise<boolean> {
    const language = await prisma.language.findUnique({where: {id: parseInt(languageId)}}).then((language) => { return language } );
    if (!language) {
        throw new Error('Language not present in database');
    }
    return true;
}
