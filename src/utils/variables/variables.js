const PROJECT_PATH = {
    AUTH_PATH: "/auth/*",
    AUTH_LOGIN: "/auth/login",
    HOME_PATH: "/*",
};

const AUTH_STATUS = {
    CHECKING: "checking",
    AUTHENTICATE: "authenticated",
    NOT_AUTHENTICATED: "not_authenticated",
};

export const { AUTH_PATH, AUTH_LOGIN, HOME_PATH } = PROJECT_PATH;
export const { CHECKING, AUTHENTICATE, NOT_AUTHENTICATED } = AUTH_STATUS;
