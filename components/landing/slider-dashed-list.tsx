type SliderDashedListProps = {
  items: readonly string[];
  className?: string;
};

/** Список у слайдері з рисочкою на початку кожного пункту */
export function SliderDashedList({ items, className }: SliderDashedListProps) {
  return (
    <ul className={["mt-6 list-none space-y-1 p-0", className].filter(Boolean).join(" ")}>
      {items.map((item) => (
        <li key={item} className="flex gap-1.5 text-inherit">
          <span className="shrink-0 text-[#EAE7E1]/72" aria-hidden>
            -
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
