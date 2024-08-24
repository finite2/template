import {
  ReactNode,
  RefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

import { logger } from "src/base/logger";

import { NotificationEngine } from "src/base/NotificationEngine";

export const EventContext = createContext<RefObject<HTMLDivElement> | null>(null);

export const useEventContext = () => useContext(EventContext);

export const useSpyEvent = (eventName: string) => {
  const eventHandler = useEventContext();

  useEffect(() => {
    if (!eventHandler || !eventHandler.current) {
      logger.error(`useSpyEvent: eventHandler is null`);
      return;
    }
    const elementRef = eventHandler.current;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const spy = (e: any) => logger.log(`spy on event: ${eventName}`, e);

    elementRef.addEventListener(eventName, spy);

    return () => elementRef && elementRef.removeEventListener(eventName, spy);
  }, [eventHandler, eventName]);

  return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEventListener = (eventName: string, callback: (e: any) => void) => {
  const eventHandler = useEventContext();

  useEffect(() => {
    if (!eventHandler || !eventHandler.current) {
      logger.error(`useSpyEvent: eventHandler is null`);
      return;
    }

    const elementRef = eventHandler.current;

    elementRef.addEventListener(eventName, callback);

    return () => elementRef && elementRef.removeEventListener(eventName, callback);
  }, [eventHandler, eventName, callback]);

  return null;
};

// This is the non typesafe event dispatcher
export const useDispatchEvent = () => {
  const eventHandler = useEventContext();

  const dispatcher = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (name: string, payload: any = null) => {
      eventHandler?.current?.dispatchEvent(new CustomEvent(name, { detail: payload }));
    },
    [eventHandler]
  );

  return dispatcher;
};

export const EventContextProvider = ({
  children,
  notifications = false,
}: {
  children: ReactNode;
  notifications?: boolean;
}) => {
  const eventAnchor = useRef<HTMLDivElement>(null);

  return (
    <EventContext.Provider value={eventAnchor}>
      <div id="#event-provider" ref={eventAnchor}></div>
      {notifications && <NotificationEngine />}
      {children}
    </EventContext.Provider>
  );
};
