import { useQuery } from "@tanstack/react-query";
import { generateHistoricalData } from "@/lib/mock-data/historical";

export function useLiveRates(baseCurrency) {
  return useQuery({
    queryKey: ["liveRates", baseCurrency],
    queryFn: async () => {
      const response = await fetch(`/api/exchange-rates?base=${baseCurrency}`);
      if (!response.ok) throw new Error("Failed to fetch rates");
      return response.json();
    },
    refetchInterval: 300000, // 5 minutes
    staleTime: 240000, // 4 minutes
  });
}

export function useHistoricalRates(baseCurrency, targetCurrency, days = 30) {
  return useQuery({
    queryKey: ["historicalRates", baseCurrency, targetCurrency, days],
    queryFn: () =>
      Promise.resolve(
        generateHistoricalData(baseCurrency, targetCurrency, days)
      ),
    staleTime: Infinity,
  });
}
