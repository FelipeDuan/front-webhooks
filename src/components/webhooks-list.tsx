import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Loader2, Wand2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { webhookListSchema } from "../http/schemas/webhooks";
import { WebhooksListItem } from "./webhooks-list-item";

export function WebhooksList() {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>(null);

  const [checkedWebhookIds, setCheckedWebhookIds] = useState<string[]>([]);

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

  function handleGenerateHandler() {
    console.log(checkedWebhookIds);
  }

  const hasAnyWebhookChecked = checkedWebhookIds.length > 0;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-1 p-2">
        <button
          type="button"
          disabled={!hasAnyWebhookChecked}
          className="bg-indigo-400 text-white w-full rounded-lg flex items-center justify-center font-semibold gap-3 text-sm py-2 disabled:opacity-50 transition duration-200 cursor-pointer disabled:pointer-events-none"
          onClick={() => handleGenerateHandler()}
        >
          <Wand2 className="size-4" />
          Gerar handler
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
  );
}
