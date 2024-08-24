import { EndpointBuilder, FetchBaseQueryMeta, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";

export const validateResponse = <T extends z.ZodSchema>(
  outputSchema: T
): ((value: unknown, meta: FetchBaseQueryMeta | undefined) => z.infer<T>) => {
  return (value, meta) => {
    const res = outputSchema.safeParse(value);

    if (res.success) {
      return res.data;
    } else if (meta) {
      throw new Error(
        `"${meta.request.method} ${
          meta.request.url
        }" response did not match expected schema:\n ${JSON.stringify(res.error)}`
      );
    } else {
      throw new Error(`Failed to throw sensible error`);
    }
  };
};

export const postQuery = <T extends z.ZodSchema>(url: string, inputSchema: T) => {
  return (args: z.infer<T>) => {
    const res = inputSchema.safeParse(args);

    if (!res.success) {
      throw new Error(`"POST ${url}": failed to match input schema`);
    }

    return { method: "POST", url, body: res.data };
  };
};

export const postRequest = <T1 extends z.ZodSchema, T2 extends z.ZodSchema>(
  builder: EndpointBuilder<ReturnType<typeof fetchBaseQuery>, never, "api">,
  url: string,
  inputSchema: T1,
  outputSchema: T2
) => {
  return builder.mutation<z.infer<typeof outputSchema>, z.infer<typeof inputSchema>>({
    query: postQuery(url, inputSchema),
    transformResponse: validateResponse(outputSchema),
  });
};
