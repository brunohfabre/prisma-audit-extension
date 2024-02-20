interface WithQueryContextData {
  userId: string
}

export function withQueryContext(
  args: any,
  queryContext: WithQueryContextData,
) {
  args.__queryContext = queryContext

  return args
}
