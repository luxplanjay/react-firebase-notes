export const getIsAuthenticated = state => state.auth.isAuthenticated;

export const getIsAuthenticating = state => state.auth.isAuthenticating;

export const getError = state => state.auth.error;

export const getUserId = state => state.auth.user.id;
