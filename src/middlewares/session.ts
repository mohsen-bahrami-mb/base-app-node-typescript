// import modules
import { publicRoute } from "../startup/checkRoute";
// import controllers
import { checkJwt, createSession, updateSession } from "../routes/controller";
// import types
import Express from "express";

/** This middleware check all session for all user. Even the  guest users. */
export default async function session(
    req: Express.Request, res: Express.Response, next: Express.NextFunction,
): Promise<void> {
    // check public routes
    let isPublicRoute = false;
    publicRoute.forEach((r: any) => { if (req.originalUrl.match(r)) isPublicRoute = true; });
    if (isPublicRoute) return next();
    // check token and session
    const token = await req.cookies["x-auth-token"];
    if (token) {
        const { session, clearCookie } = await checkJwt(token);
        if (clearCookie) res.cookie("x-auth-token", "", { maxAge: Date.now() });
        if (session) {
            await updateSession(req, res, session, true);
            next();
        } else {
            await createSession(req, res, true);
            next();
        }
    } else {
        await createSession(req, res, true);
        next();
    }
}