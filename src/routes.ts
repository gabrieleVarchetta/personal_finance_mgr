/**
 * Array di routes accessibili senza essere autenticati
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * Array di routes utilizzate per l'autenticazione
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * Prefisso per le routes di autenticazione
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Route di default dopo autenticazione
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
