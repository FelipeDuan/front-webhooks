import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { WebhookDetails } from "../components/webhook-details";
import { WebhookNotSelected } from "../components/webhook-not-selected";

export const Route = createFileRoute("/webhooks/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return (
    <Suspense fallback={<p>Carregando...</p>}>
      {id ? <WebhookDetails id={id} /> : <WebhookNotSelected />}
    </Suspense>
  );
}
