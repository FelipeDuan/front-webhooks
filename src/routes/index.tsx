import { createFileRoute } from "@tanstack/react-router";
import { WebhookNotSelected } from "../components/webhook-not-selected";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <WebhookNotSelected />;
}
