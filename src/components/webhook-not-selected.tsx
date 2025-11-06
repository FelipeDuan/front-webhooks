export function WebhookNotSelected() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
        <h3 className="text-lg font-semibold text-zinc-200">
          Nenhum webhook selecionado
        </h3>
        <p className="text-sm text-zinc-400 max-w-md">
          Selecione um webhook da lista para visualizar seus detalhes
        </p>
      </div>
    </div>
  );
}
