import { useEffect, useState } from "react";

// Guards against double-counting from React StrictMode's dev-only double
// mount — this flag survives across that remount since the module stays loaded.
let hasCounted = false;

const COUNTER_NAMESPACE = "tejas-sangale-portfolio";
const COUNTER_KEY = "visits";

export function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (hasCounted) return;
    hasCounted = true;

    fetch(`https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/${COUNTER_KEY}`)
      .then((res) => res.json())
      .then((data: { value: number }) => setCount(data.value))
      .catch(() => {
        // Counter is decorative; fail silently.
      });
  }, []);

  if (count === null) return null;

  return (
    <p className="text-sm text-muted-foreground">
      {count.toLocaleString()} visitor{count === 1 ? "" : "s"}
    </p>
  );
}
