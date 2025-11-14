import * as Dialog from "@radix-ui/react-dialog";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Loader2, Wand2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { webhookListSchema } from "../http/schemas/webhooks";
import { CodeBlock } from "./ui/code-block";
import { WebhooksListItem } from "./webhooks-list-item";

export function WebhooksList() {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>(null);

  const [checkedWebhookIds, setCheckedWebhookIds] = useState<string[]>([]);
  const [generetedHandlerCode, setGeneretedHandlerCode] = useState<
    string | null
  >(null);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ["webhooks"],
      queryFn: async ({ pageParam }) => {
        const url = new URL("http://localhost:3100/api/webhooks");

        if (pageParam) {
          url.searchParams.set("cursor", pageParam);
        }

        const response = await fetch(url);
        const data = await response.json();

        return webhookListSchema.parse(data);
      },
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor ?? undefined;
      },
      initialPageParam: undefined as string | undefined,
    });

  const webhooks = data.pages.flatMap((page) => page.webhooks);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  function handleCheckWebhook(checkedWebhookId: string) {
    if (checkedWebhookIds.includes(checkedWebhookId)) {
      setCheckedWebhookIds((state) => {
        return state.filter((webhookId) => webhookId !== checkedWebhookId);
      });
    } else {
      setCheckedWebhookIds((state) => [...state, checkedWebhookId]);
    }
  }

  async function handleGenerateHandler() {
    const response = await fetch("http://localhost:3100/api/generate", {
      method: "POST",
      body: JSON.stringify({ webhookIds: checkedWebhookIds }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    type GenerateResponse = { code: string };

    const data: GenerateResponse = await response.json();

    setGeneretedHandlerCode(data.code);
    return;
  }

  const hasAnyWebhookChecked = checkedWebhookIds.length > 0;

  return (
    <>
      <div className="flex-1 overflow-y-auto relative">
        <div className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/5 p-3 md:p-4 backdrop-blur-sm">
          <button
            type="button"
            disabled={!hasAnyWebhookChecked}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 py-3 md:py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98] touch-manipulation cursor-pointer"
            onClick={() => handleGenerateHandler()}
          >
            <Wand2 className="size-4" />
            {hasAnyWebhookChecked
              ? `Gerar handler (${checkedWebhookIds.length})`
              : "Selecione para gerar"}
          </button>
        </div>

        <div className="space-y-1 p-2">
          {webhooks.map((webhook) => (
            <WebhooksListItem
              webhook={webhook}
              key={webhook.id}
              onWebhookChecked={handleCheckWebhook}
              isWebhookChecked={checkedWebhookIds.includes(webhook.id)}
            />
          ))}

          {hasNextPage && (
            <div className="p-2" ref={loadMoreRef}>
              {isFetchingNextPage && (
                <div className="flex items-center justify-center py-2">
                  <Loader2 className="size-5 animate-spin text-zinc-500" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Dialog.Root
        open={!!generetedHandlerCode}
        onOpenChange={(open) => !open && setGeneretedHandlerCode(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-[90vw] md:w-full md:max-w-2xl max-h-[90vh] translate-x-[-50%] translate-y-[-50%] rounded-xl border border-zinc-800 bg-zinc-900 p-4 md:p-6 shadow-2xl duration-200 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] flex flex-col">
            <div className="flex items-center justify-between mb-4 shrink-0">
              <Dialog.Title className="text-lg font-semibold text-zinc-100">
                Handler Gerado
              </Dialog.Title>

              <Dialog.Close className="rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors focus:outline-none">
                <X className="size-5" />
              </Dialog.Close>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 rounded-lg border border-zinc-800 bg-zinc-950/50">
              <CodeBlock
                language="typescript"
                code={generetedHandlerCode || ""}
              />
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end shrink-0">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-md bg-zinc-700 px-4 py-3 sm:py-2 text-sm font-medium text-white hover:bg-zinc-600 transition-colors w-full sm:w-auto cursor-pointer"
                >
                  Fechar
                </button>
              </Dialog.Close>
              <button
                type="button"
                onClick={() =>
                  navigator.clipboard.writeText(generetedHandlerCode || "")
                }
                className="rounded-md bg-indigo-500 px-4 py-3 sm:py-2 text-sm font-medium text-white hover:bg-indigo-600 transition-colors w-full sm:w-auto cursor-pointer"
              >
                Copiar Código
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
