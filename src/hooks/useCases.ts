import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCase,
  getCasesByOwner,
  exploreCases,
  createCase,
  updateCaseStatus,
  getRecentCasesNearby,
  caseMatchesExploreFilters,
} from '@/services/cases/caseService';
import { linkPetToLostCase } from '@/services/pets/petService';
import type { CreateCaseInput, ExploreFilters, Case } from '@/types';
import { useAuthStore } from '@/stores/authStore';
import { useExploreStore } from '@/stores/exploreStore';

export function useCase(caseId: string) {
  return useQuery({
    queryKey: ['case', caseId],
    queryFn: () => getCase(caseId),
    enabled: Boolean(caseId),
  });
}

export function useMyCases() {
  const ownerId = useAuthStore((s) => s.firebaseUser?.uid);

  return useQuery({
    queryKey: ['myCases', ownerId],
    queryFn: () => (ownerId ? getCasesByOwner(ownerId) : []),
    enabled: Boolean(ownerId),
  });
}

export function useExploreCases() {
  const activeTab = useExploreStore((s) => s.activeTab);
  const filters = useExploreStore((s) => s.filters);
  const searchQuery = useExploreStore((s) => s.searchQuery);

  const mergedFilters: ExploreFilters = {
    ...filters,
    caseType: activeTab,
    search: searchQuery || filters.search,
  };

  return useQuery({
    queryKey: ['exploreCases', mergedFilters],
    queryFn: () => exploreCases(mergedFilters),
  });
}

export function useNearbyCases() {
  return useQuery({
    queryKey: ['nearbyCases'],
    queryFn: () => getRecentCasesNearby(undefined, 5),
  });
}

export function useCreateCase() {
  const queryClient = useQueryClient();
  const ownerId = useAuthStore((s) => s.firebaseUser?.uid);

  return useMutation({
    mutationFn: async (input: CreateCaseInput) => {
      if (!ownerId) throw new Error('Not authenticated');
      const created = await createCase(ownerId, input);
      if (input.caseType === 'lost' && input.petId) {
        await linkPetToLostCase(input.petId, created.id, ownerId);
      }
      return created;
    },
    onSuccess: (created, input) => {
      queryClient.setQueriesData<Case[]>(
        {
          queryKey: ['exploreCases'],
          predicate: (query) => {
            const filters = query.queryKey[1] as ExploreFilters | undefined;
            return caseMatchesExploreFilters(created, filters ?? {});
          },
        },
        (old) => {
          if (!old) return [created];
          if (old.some((item) => item.id === created.id)) return old;
          return [created, ...old].slice(0, 50);
        }
      );

      void queryClient.refetchQueries({ queryKey: ['exploreCases'] });
      void queryClient.refetchQueries({ queryKey: ['myCases', ownerId] });
      void queryClient.refetchQueries({ queryKey: ['nearbyCases'] });

      if (input.caseType === 'lost' && input.petId) {
        queryClient.invalidateQueries({ queryKey: ['pet', input.petId] });
        queryClient.invalidateQueries({ queryKey: ['pets', ownerId] });
      }
    },
  });
}

export function useUpdateCaseStatus(caseId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: string) => updateCaseStatus(caseId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case', caseId] });
      queryClient.invalidateQueries({ queryKey: ['exploreCases'] });
    },
  });
}
