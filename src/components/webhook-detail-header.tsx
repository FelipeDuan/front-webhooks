import { Badge } from "./ui/badge";

interface WebhookDetailHeaderProps {
  webhook: {
    method: string;
    pathname: string;
    ip: string;
    createdAt: Date;
  };
}

export function WebhookDetailHeader({ webhook }: WebhookDetailHeaderProps) {
  return (
    <div className="space-y-4 border-b border-zinc-700 p-6">
      <div className="flex items-center gap-3">
        <Badge>{webhook.method}</Badge>
        <span className="text-lg font-medium text-zinc-300">
          {webhook.pathname}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-sm text-zinc-400">
          <span>De IP:</span>
          <span className="font-mono underline underline-offset-4">
            {webhook.ip}
          </span>
        </div>
        <span className="w-px h-4 bg-zinc-700" />
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>em</span>
          <span>{webhook.createdAt.toLocaleString("pt-BR")}</span>
        </div>
      </div>
    </div>
  );
}
