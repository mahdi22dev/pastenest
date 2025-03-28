import { Paste } from "pastenest-types";

export async function getPasteAction(
  params: any,
  password: string | null
): Promise<(Paste & { unlocked: boolean }) | null> {
  try {
    const url =
      process.env.NODE_ENV === "development"
        ? import.meta.env.VITE_LOCAL_SERVER_PATH
        : import.meta.env.VITE_SERVER_PATH;

    // implement caching using react cache
    const response = await fetch(
      url + "/api/paste/" + params.pastId + "?password=" + password
    );
    const data = (await response.json()) as Paste & {
      unlocked: boolean;
      error?: string;
    };
    return data ? data : null;
  } catch (error) {
    throw error;
  }
}
