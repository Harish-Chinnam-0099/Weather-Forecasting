import {QueryClient} from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 5, // 5 minutes - garbage collect old cache
      staleTime: 1000 * 60 * 2, // 2 minutes - data is fresh for this duration
    },
  },
});