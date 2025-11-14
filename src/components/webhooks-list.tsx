import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Loader2, Wand2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { webhookListSchema } from "../http/schemas/webhooks";
import { DialogHandlersCode } from "./dialog-handlers-code";
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

      <DialogHandlersCode
        generetedHandlerCode={generetedHandlerCode}
        setGeneretedHandlerCode={setGeneretedHandlerCode}
      />
    </>
  );
}
