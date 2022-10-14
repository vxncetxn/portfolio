import { useEffect } from "react";
import { useObservable } from "@legendapp/state/react";
import { Text } from "./Text";

export function ClockWidget() {
  const time = useObservable(
    new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZone: "Asia/Singapore",
    })
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      time.set(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          timeZone: "Asia/Singapore",
        })
      );
    }, 15000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <Text size="small" className="tabular-nums">
      {time} (GMT+8)
    </Text>
  );
}
