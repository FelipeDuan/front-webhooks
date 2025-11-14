import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { CodeBlock } from "./ui/code-block";

interface DialogHandlersCodeProps {
  generetedHandlerCode: string | null;
  setGeneretedHandlerCode: React.Dispatch<React.SetStateAction<string | null>>;
}

export function DialogHandlersCode({
  generetedHandlerCode,
  setGeneretedHandlerCode,
}: DialogHandlersCodeProps) {
  return (
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
  );
}
