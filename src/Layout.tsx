import { Outlet } from "react-router-dom";

import { EventContextProvider } from "./base/EventContext";
import StoreProvider from "./store/react";

export const Layout = () => {
  return (
    <StoreProvider>
      <EventContextProvider notifications>
        <Outlet />
      </EventContextProvider>
    </StoreProvider>
  );
};
