'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/lib/api';
import { getLocalOrders } from '@/lib/localOrders';
import { LocalOrder } from '@/context/CartContext';
import { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

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

  const [localOrders, setLocalOrders] = useState<LocalOrder[]>([]);
  useEffect(() => {
    setLocalOrders(getLocalOrders());
  }, []);

  const sevenDayStats = useMemo(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentOrders = localOrders.filter(order => new Date(order.date) > sevenDaysAgo);
    
    const revenue = recentOrders.reduce((acc, order) => acc + order.total, 0);

    const chartData = recentOrders.map(order => ({
        date: new Date(order.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
        revenu: order.total,
    })).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());


    return {
      orderCount: recentOrders.length,
      revenue: revenue.toFixed(2),
      chartData: chartData,
    };
  }, [localOrders]);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <KpiCard 
        title="Utilisateurs" 
        value={usersData?.total ?? '—'} 
        isLoading={isLoadingUsers}
      />
      <KpiCard title="Commandes (7j)" value={sevenDayStats.orderCount} />
      <KpiCard title="Revenu (7j)" value={`${sevenDayStats.revenue} €`} />

      <div className="card md:col-span-3">
        <div className="text-sm text-gray-600 dark:text-gray-300">Évolution des revenus (7 derniers jours)</div>
        <div className="h-48 mt-2">
            {sevenDayStats.chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sevenDayStats.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenu" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <div className="h-full flex items-center justify-center text-sm text-gray-400">
                    Pas de données de commande sur les 7 derniers jours.
                </div>
            )}
        </div>
      </div>
    </div>
  );
}