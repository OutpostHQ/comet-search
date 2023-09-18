/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Comet } from "outpostkit";
import { CometState } from ".";

export type CometRes = {
  conversationId: string;
  generations: string[];
  referencePaths: string[];
  referenceWithSources: {
    path: string;
    source_id: string;
  }[];
  sessionId: string;
  usage: { completion_tokens: number; prompt_tokens: number };
};

export type CometMessage = {
  from: "USER" | "COMET";
  conversationId?: string;
  sessionId?: string;
  text: string;
};

export async function promptComet(
  comet: Comet,
  cometConfig: Record<string, any>,
  cometState: CometState,
  input: string
) {
  cometState.error.message = null;
  cometState.stream.message = null;

  if (cometState.loading === true || cometState.disabled === true) return;

  cometState.messages.add({ from: "USER", text: input });
  cometState.disabled = true;
  cometState.loading = true;
  cometState.display.showLoading();

  try {
    const res = await comet.prompt(
      {
        input,
        ...(cometConfig as any),
        ...(cometState?.currentSession && {
          sessionId: cometState?.currentSession,
        }),
      },
      (data) => {
        if (cometState.loading) {
          cometState.display.hideLoading();
        }
        cometState.loading = false;
        cometState.disabled = true;

        cometState.stream.update(data);
      }
    );

    cometState.stream.deleteElem();

    cometState.messages.add({
      from: "COMET",
      text: res?.generations[0],
      conversationId: res?.conversationId,
      sessionId: res?.sessionId,
    });

    cometState.disabled = false;

    cometState.currentSession = res?.sessionId || null;
    return res;
  } catch (e) {
    cometState.error.message = e as string;
    cometState.error.showError(e as string);
    cometState.disabled = false;
    cometState.loading = false;
    cometState.display.hideLoading();
  }
}

export const handleCometMessages = () => {};
