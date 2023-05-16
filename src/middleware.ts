import { NextFunction, Request, Response } from "express";


export async function autenticador(
    
    requeste: Request,
    response: Response,
    next: NextFunction
    
    ) {
    const token = requeste.headers.authorization;

    if(!token) {
        return response.status(401).send();
    }

    const [, user] = token.split("");

    if (user == "admin") {
        return next();
    }

    return response.status(401).send();
}