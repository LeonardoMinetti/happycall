// Prefix public assets with the GitHub Pages base path when building for it.
export const asset = (p: string) => (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + p;
