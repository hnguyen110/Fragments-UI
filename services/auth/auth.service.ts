import {Auth} from "aws-amplify";

export async function isAuthenticated() {
    try {
        const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();
        const username = currentAuthenticatedUser.username;
        const idToken = currentAuthenticatedUser.signInUserSession.idToken.jwtToken;
        const accessToken = currentAuthenticatedUser.signInUserSession.accessToken.jwtToken;

        return {
            username,
            idToken,
            accessToken,
            authorizationHeaders: (type = "application/json") => {
                const headers = {"Content-Type": type} as any;
                headers["Authorization"] = `Bearer ${idToken}`;
                return headers;
            },
        };
    } catch (e) {
        return null;
    }
}
