import { useEffect } from "react";
import { useObservable } from "@legendapp/state/react";
import { Text } from "./Text";

export function ClockWidget() {
  const time = useObservable(new Date().toLocaleTimeString("en-US"));

  useEffect(() => {
    const timerId = setInterval(() => {
      time.set(new Date().toLocaleTimeString("en-US"));
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <Text size="small" className="ml-12 tabular-nums">
      {time} (GMT+8)
    </Text>
  );
}
