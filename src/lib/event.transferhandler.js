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
          offsetX: ev && ev.offsetX,
          offsetY: ev && ev.offsetY,
          theme: ev && ev.theme,
        },
        [],
      ];
    },
    deserialize(ev) {
      return ev;
    },
  });
}
