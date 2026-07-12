import { useEffect, useState } from "react";
import { getHistory } from "../services/urlService";
import AnalyticsChart from "../components/AnalyticsChart/AnalyticsChart";

const Analytics = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await getHistory();
        setUrls(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadAnalytics();
  }, []);

  const totalUrls = urls.length;

  const totalClicks = urls.reduce(
    (sum, item) => sum + item.clicks,
    0
  );

  const averageClicks =
    totalUrls === 0
      ? 0
      : (totalClicks / totalUrls).toFixed(1);

  const mostClicked =
    urls.length > 0
      ? urls.reduce((a, b) =>
          a.clicks > b.clicks ? a : b
        )
      : null;

  const latest =
    urls.length > 0 ? urls[0] : null;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold">
          Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Overview of your URL performance.
        </p>

        {/* Stats */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-gray-500">
              Total URLs
            </h3>

            <p className="text-4xl font-bold mt-2">
              {totalUrls}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-gray-500">
              Total Clicks
            </h3>

            <p className="text-4xl font-bold mt-2">
              {totalClicks}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-gray-500">
              Average Clicks
            </h3>

            <p className="text-4xl font-bold mt-2">
              {averageClicks}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-gray-500">
              Most Clicked
            </h3>

            <p className="font-semibold mt-2">
              {mostClicked
                ? mostClicked.short_url
                : "No Data"}
            </p>

            <p className="text-gray-500">
              {mostClicked
                ? `${mostClicked.clicks} Clicks`
                : ""}
            </p>
          </div>

        </div>

        {/* Latest URL */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Latest URL
          </h2>

          {latest ? (
            <>
              <p className="font-semibold">
                {latest.short_url}
              </p>

              <p className="text-gray-500 mt-2 break-all">
                {latest.full_url}
              </p>
            </>
          ) : (
            <p>No URLs Found</p>
          )}

        </div>

        {/* Chart */}

        <AnalyticsChart data={urls} />

      </div>
    </div>
  );
};

export default Analytics;