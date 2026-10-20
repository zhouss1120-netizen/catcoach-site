// Pages exposes the API on the same domain through a private Worker service binding.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      url.pathname = url.pathname.slice(4);
      return env.CATCOACH_API.fetch(new Request(url, request));
    }
    return env.ASSETS.fetch(request);
  },
};
