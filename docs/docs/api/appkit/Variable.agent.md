# Variable: agent

```ts
const agent: ToPlugin<typeof AgentPlugin, IAgentConfig, "agent">;
```

Plugin factory for the AppKit agent (LangChain/LangGraph). Use in `createApp({ plugins: [agent({ ... })] })`. Configuration: [`IAgentConfig`](Interface.IAgentConfig.md).

## Plugin API (runtime)

After `const appkit = await createApp({ plugins: [..., agent(config)] })`, `appkit.agent` exposes:

| Method | Description |
| ------ | ------ |
| `invoke(messages)` | Run the agent (non-streaming). Returns the assistant reply text. |
| `stream(messages)` | Run the agent with streaming. Yields [`ResponseStreamEvent`](TypeAlias.ResponseStreamEvent.md)s. |
| `addTools(tools)` | Add LangChain tools after app creation. Rebuilds the agent. **Only when not using `agentInstance`.** |
| `addMcpServers(servers)` | Add MCP servers after app creation. Rebuilds the agent and MCP client. **Only when not using `agentInstance`.** |

When the plugin is configured with `model` and optional `tools` / `mcpServers` (i.e. without `agentInstance`), you can call `appkit.agent.addTools([...])` and `appkit.agent.addMcpServers([...])` in the `.then()` of `createApp()` to register additional tools or MCP servers at runtime.
