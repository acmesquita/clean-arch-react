export const makeApiUrlFactory = (path: string): string => `process.env.API_URL${path}`
