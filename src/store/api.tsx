import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/", credentials: "include" }), // credentials: "include" handles passing cookie based credentials to all endpoints if it is available via login
  // baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getTeams: builder.query<void, void>({
      query: () => {
        return { url: "/api/teams", method: "GET" };
      },
    }),
    postTeam: builder.mutation<void, string>({
      query: (id) => {
        return { url: "/api/teams", body: { id }, method: "POST" };
      },
    }),
  }),
});

export const { usePostTeamMutation, useGetTeamsQuery } = api;
