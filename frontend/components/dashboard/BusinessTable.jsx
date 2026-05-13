export default function BusinessTable({ businesses }) {

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Logo</th>
            <th className="p-4 text-left">Business</th>
            <th className="p-4 text-left">Slug</th>
          </tr>
        </thead>

        <tbody>

          {businesses.map((business) => (
            <tr key={business.id} className="border-b">

              <td className="p-4">
                <img
                  src={business.logo}
                  className="w-12 h-12 rounded-full"
                />
              </td>

              <td className="p-4">
                {business.name}
              </td>

              <td className="p-4">
                {business.slug}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}