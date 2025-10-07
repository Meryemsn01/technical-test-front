'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/lib/api';

function KpiCard({ title, value, isLoading }: { title: string; value: string | number; isLoading?: boolean }) {
  return (
    <div className="card">
      <div className="text-sm text-gray-600 dark:text-gray-300">{title}</div>
      {isLoading ? (
        <div className="skeleton h-8 w-1/2 mt-1" />
      ) : (
        <div className="text-2xl font-semibold">{value}</div>
      )}
    </div>
  );
}


export default function Metrics() {
  const { data: usersData, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <KpiCard 
        title="Utilisateurs" 
        value={usersData?.total ?? '—'} 
        isLoading={isLoadingUsers}
      />
      <KpiCard title="Commandes (7j, local)" value="—" />
      <KpiCard title="Revenu (7j, local)" value="—" />

      <div className="card md:col-span-3">
        <div className="text-sm text-gray-600 dark:text-gray-300">Évolution 7 jours</div>
        <div className="h-24 skeleton mt-2 flex items-center justify-center text-sm text-gray-400">
          (Graphique non implémenté)
        </div>
      </div>
    </div>
  );
}