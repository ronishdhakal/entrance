export default function ClassPricing({ data }) {
  return (
    <section className="grid md:grid-cols-2 gap-6">
      {data.is_online_available && (
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Online Class</h3>
          <p className="text-sm text-gray-600 mb-1">
            {data.online_location}
          </p>
          <p>
            {data.online_original_fee && (
              <span className="line-through text-gray-400 mr-2">
                {data.online_original_fee}
              </span>
            )}
            <span className="font-semibold text-green-600">
              {data.online_discounted_fee}
            </span>
          </p>
        </div>
      )}

      {data.is_physical_available && (
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Physical Class</h3>
          <p className="text-sm text-gray-600 mb-1">
            {data.physical_location}
          </p>
          <p>
            {data.physical_original_fee && (
              <span className="line-through text-gray-400 mr-2">
                {data.physical_original_fee}
              </span>
            )}
            <span className="font-semibold text-green-600">
              {data.physical_discounted_fee}
            </span>
          </p>
        </div>
      )}
    </section>
  )
}
