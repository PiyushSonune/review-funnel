export default function MetricCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-gray-500 text-sm mb-2">
        {title}
      </h3>

      <p className="text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}