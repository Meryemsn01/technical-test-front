export default function KpiCard({ title, value, isLoading }: { title: string; value: string | number; isLoading?: boolean }) {
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