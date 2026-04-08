export function classifyFailure(errorMessage: string): {
  type: "LOCATOR" | "ASSERTION" | "TIMEOUT" | "NETWORK" | "UNKNOWN";
} {
  const error = errorMessage.toLowerCase();

  //  LOCATOR issues
  if (
    error.includes("locator") ||
    error.includes("waiting for selector") ||
    error.includes("element is not visible") ||
    error.includes("element is not attached") ||
    error.includes("strict mode violation") ||
    error.includes("resolved to") ||
    error.includes("no node found") ||
    error.includes("cannot find element")
  ) {
    return { type: "LOCATOR" };
  }

  // ASSERTION issues
  if (
    error.includes("expect(") ||
    error.includes("expected:") ||
    error.includes("received:") ||
    error.includes("tohave") ||
    error.includes("toequal") ||
    error.includes("matcher error")
  ) {
    return { type: "ASSERTION" };
  }

  // TIMEOUT issues
  if (
    error.includes("timeout") ||
    error.includes("timed out") ||
    error.includes("exceeded")
  ) {
    return { type: "TIMEOUT" };
  }

  // NETWORK issues (NEW - useful)
  if (
    error.includes("net::") ||
    error.includes("failed to fetch") ||
    error.includes("navigation failed") ||
    error.includes("connection refused")
  ) {
    return { type: "NETWORK" };
  }

  return { type: "UNKNOWN" };
}