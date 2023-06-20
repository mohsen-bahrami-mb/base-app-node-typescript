// import controller
import { checkValidateErr } from "../controller";
// import modules
// import types
import Express from "express";

export default class {
    // make all route validator

    static async anyValidator(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void> {
        let err: string[] = [];
        if ("" !== "") err.push("");
        checkValidateErr(req, res, next, err, undefined);
    }
};