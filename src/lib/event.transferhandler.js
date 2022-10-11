import * as Comlink from "comlink";

export function initTransferHandler() {
  Comlink.transferHandlers.set("event", {
    canHandle(ev) {
      return ev instanceof Event;
    },
    serialize(ev) {
      return [
        {
          eventName: ev && ev.type,
          width: ev && ev.type === "resize" ? ev.target.innerWidth : undefined,
          height:
            ev && ev.type === "resize" ? ev.target.innerHeight : undefined,
          offsetX: ev && ev.offsetX,
          offsetY: ev && ev.offsetY,
          theme: ev && ev.theme,
          color: ev && ev.color,
        },
        [],
      ];
    },
    deserialize(ev) {
      return ev;
    },
  });
}
