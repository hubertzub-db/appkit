import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { toJSONSchema } from "zod/v4/core";

/**
 * Workaround: @databricks/langchainjs@0.1.0 calls `schema.toJSONSchema()`
 * as a method, but zod v4 only exposes it as a standalone function.
 * Patch the schema so ChatDatabricks can convert it.
 */
function patchZodSchema<T extends z.ZodType>(schema: T): T {
  (schema as any).toJSONSchema = () => toJSONSchema(schema);
  return schema;
}

export const weatherTool = tool(
  async ({ location }) => {
    const conditions = ["sunny", "partly cloudy", "rainy", "windy"];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const temp = Math.floor(Math.random() * 30) + 50;
    return `Weather in ${location}: ${condition}, ${temp}°F`;
  },
  {
    name: "get_weather",
    description: "Get the current weather for a location",
    schema: patchZodSchema(
      z.object({
        location: z.string().describe("City name, e.g. 'San Francisco'"),
      }),
    ),
  },
);

export const timeTool = tool(
  async ({ timezone }) => {
    const tz = timezone ?? "UTC";
    return `Current time in ${tz}: ${new Date().toLocaleString("en-US", { timeZone: tz })}`;
  },
  {
    name: "get_current_time",
    description: "Get the current date and time in a timezone",
    schema: patchZodSchema(
      z.object({
        timezone: z
          .string()
          .optional()
          .describe("IANA timezone, e.g. 'America/New_York'. Defaults to UTC"),
      }),
    ),
  },
);

export const echoTool = tool(async ({ message }) => message, {
  name: "echo",
  description: "Echo back the given message (useful for testing)",
  schema: patchZodSchema(
    z.object({
      message: z.string().describe("The message to echo back"),
    }),
  ),
});

export const demoTools = [weatherTool, timeTool];
