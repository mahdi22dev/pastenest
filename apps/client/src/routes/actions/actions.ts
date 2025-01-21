import { Paste } from ".pnpm/@prisma+client@5.19.0_prisma@5.19.0/node_modules/@prisma/client";

export async function getPasteAction(
  params: any,
  password: string | null
): Promise<(Paste & { unlocked: boolean }) | null> {
  try {
    const url = "api/paste/" + params.pastId + "?password=" + password;
    // implement caching using react cache
    const response = await fetch(url);
    const data = (await response.json()) as Paste & {
      unlocked: boolean;
      error?: string;
    };
    return data ? data : null;
  } catch (error) {
    throw error;
  }
}
