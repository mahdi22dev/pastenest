import { PastType } from "../../../../api/src/lib/types";

type Paste = PastType;
export async function getPasteAction(
  params: any,
  password: string | null
): Promise<(Paste & { unlocked: boolean }) | null> {
  try {
    const url = "/api/paste/" + params.pastId + "?password=" + password;
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
