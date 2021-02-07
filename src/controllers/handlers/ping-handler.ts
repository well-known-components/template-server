// handlers arguments only type what they need, to make unit testing easier
export async function pingHandler(context: { url: URL }) {
  const { url } = context

  return {
    body: url.pathname,
  }
}
