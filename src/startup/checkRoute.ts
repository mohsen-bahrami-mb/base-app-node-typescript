// import modules
import debug from "debug";
// import controllers
import { createRoute } from "../routes/controller";

const mainDebug = debug("app:main");

export const publicRoute = [
    "/style.css", "/script.js", "/bootstrap@5.3.0/bootstrap.bundle.min.js",
    "/bootstrap@5.3.0/bootstrap.bundle.js", "/bootstrap@5.3.0/bootstrap.min.css", "/bootstrap@5.3.0/bootstrap.css"
];
export const mainRoute = [
    "",                                       /** html content: ""   */
    "",                                                         /** json content: "{}" */
    "",                                                         /** json content: "{}" */ /** It self is JSON, but it controls a route has HTML content*/
];
export const mainRouteProtect = [];
export const dynamicRouteProtect = [];

export default async function checkMainRoute(route: string[], is_protect_user: boolean) {
    const uniqueIndex = route.filter((v, i, arr) => v !== "" && arr.indexOf(v) === i);
    const checkMainRoute = await Promise.all(uniqueIndex.map(async (r) => {
        // const content = r === "/" ? "" : "{}";
        const content = "{}";
        console.log(uniqueIndex)
        return await createRoute(r, "main", content, is_protect_user);
    }));
    const failedRoute = checkMainRoute.filter(r => r.route === undefined);
    if (failedRoute.length) {
        const errMessage = failedRoute.map((f, i) => (i + " - " + f.message));
        mainDebug(errMessage);
    }
}