import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useIsMounted } from "usehooks-ts";

import { useTranslation } from "src/localisation";

import { useEventContext, useEventListener } from "./EventContext";
import { mergeClasses } from "src/base/mergeClasses";

export const NOTIFICATION_EVENT_NAME = "notification";

type NotificationDetail = {
  id: string;
  content: ReactNode;
  onClick?: () => void;
  flavor: "info" | "warning" | "danger";
  autoDismissAt?: number;
};

type NotifcationEvent = Event & { detail: NotificationDetail };

export const useDispatchNotification = () => {
  const eventHandler = useEventContext();

  const dispatcher = useCallback(
    (payload: NotificationDetail) => {
      eventHandler?.current?.dispatchEvent(
        new CustomEvent(NOTIFICATION_EVENT_NAME, { detail: payload })
      );
    },
    [eventHandler]
  );

  return dispatcher;
};

export const NotificationEngine = () => {
  const [, setRerender] = useState(0);
  const notificationsRef = useRef<NotificationDetail[]>([]);

  const onNotification = useCallback((e: NotifcationEvent) => {
    const index = notificationsRef.current.findIndex((n) => e.detail.id === n.id);

    if (index > -1) {
      notificationsRef.current[index] = e.detail;
    } else {
      notificationsRef.current.push(e.detail);
    }

    setRerender((s) => s + 1);
  }, []);

  useEventListener(NOTIFICATION_EVENT_NAME, onNotification);

  const onRemoveNotification = useCallback((id: string) => {
    const index = notificationsRef.current.findIndex((n) => n.id === id);

    if (index > -1) {
      notificationsRef.current.splice(index, 1);
      setRerender((s) => s + 1);
    }
  }, []);

  const onRemoveAllNotifications = useCallback(() => {
    notificationsRef.current = [];
    setRerender((s) => s + 1);
  }, []);

  return (
    <div
      className="fixed z-50 right-1 top-1 flex flex-col gap-1 lg:gap-2 w-72"
      data-testid="notification-container">
      {notificationsRef.current.length > 3 && (
        <ClearAllNotifications onClick={onRemoveAllNotifications} />
      )}
      {notificationsRef.current.map((n) => {
        return <Notification key={n.id} {...n} onRemoveNotification={onRemoveNotification} />;
      })}
    </div>
  );
};

const flavorToClasses = {
  info: "bg-lolime",
  warning: "bg-lopurple text-lowhite",
  danger: "bg-loorange",
} as const;

export const Notification = ({
  id,
  content,
  onClick,
  flavor,
  autoDismissAt,
  onRemoveNotification,
}: NotificationDetail & { onRemoveNotification: (id: string) => void }) => {
  const callback = useCallback(() => {
    if (onClick) return onClick;

    return onRemoveNotification(id);
  }, [onClick, id, onRemoveNotification]);

  const isMounted = useIsMounted();

  useEffect(() => {
    if (!autoDismissAt) return;

    const closeOnTimeOut = () => {
      if (isMounted()) {
        onRemoveNotification(id);
      }
    };

    const timeMs = Math.max(0, autoDismissAt - Date.now());

    const interval = setTimeout(closeOnTimeOut, timeMs);

    return () => clearTimeout(interval);
  }, [autoDismissAt]);

  return (
    <div
      data-testid={`notification-${id}`}
      className={mergeClasses(
        "w-full p-1 text-center rounded-md border-loblack border-2 cursor-pointer flex flex-col justify-center text-sm lg:text-base",
        flavorToClasses[flavor]
      )}
      onClick={callback}>
      {content}
    </div>
  );
};

const ClearAllNotifications = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation();

  return (
    <div
      className="w-full p-1 text-center rounded-md border-loblack border-2 cursor-pointer bg-loblack text-lowhite"
      onClick={onClick}
      data-testid="clear-notifications">
      {t("notifications.clear-all")}
    </div>
  );
};
