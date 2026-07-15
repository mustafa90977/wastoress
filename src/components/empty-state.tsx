interface Props {
  message?: string;
}

export default function EmptyState({ message = "لا توجد منتجات حاليًا" }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-outline-variant/50 bg-surface-container-lowest/50 py-24 text-outline">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-surface-container-low">
        <span className="material-symbols-outlined text-4xl">shopping_bag</span>
      </div>
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}
