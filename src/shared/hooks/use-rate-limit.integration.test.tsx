import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useRateLimit } from "./use-rate-limit";

// Mock del hook - necesitamos leer el archivo real primero
describe("useRateLimit in real scenarios", () => {
  let queryClient: QueryClient;

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  it("should integrate with mutation hooks", async () => {
    const mockMutation = vi.fn().mockResolvedValue({ success: true });

    // Simular un hook que usa rate limiting
    const { result } = renderHook(
      () => {
        const [callCount, setCallCount] = useState(0);
        const checkRateLimit = useRateLimit(3, 1000);

        const handleCall = () => {
          if (checkRateLimit(false)) {
            setCallCount((prev) => prev + 1);
            return mockMutation();
          }
          return Promise.reject(new Error("Rate limited"));
        };

        return { callCount, handleCall };
      },
      { wrapper },
    );

    // Primera llamada - debe funcionar
    await result.current.handleCall();
    await waitFor(() => {
      expect(result.current.callCount).toBe(1);
    });

    // Segunda llamada - debe funcionar
    await result.current.handleCall();
    await waitFor(() => {
      expect(result.current.callCount).toBe(2);
    });

    // Tercera llamada - debe funcionar
    await result.current.handleCall();
    await waitFor(() => {
      expect(result.current.callCount).toBe(3);
    });

    // Cuarta llamada - debe fallar
    await expect(result.current.handleCall()).rejects.toThrow("Rate limited");
    expect(result.current.callCount).toBe(3);
  });
});
