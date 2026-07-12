import { useEffect, useState } from "react";
import {
  FaLink,
  FaArrowTrendUp,
  FaChartLine,
} from "react-icons/fa6";

import History from "../components/History/History";
import { getHistory } from "../services/urlService";
import useAuth from "../context/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalUrls: 0,
    totalClicks: 0,
    averageClicks: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const urls = await getHistory();

        const totalUrls = urls.length;

        const totalClicks = urls.reduce(
          (sum, url) => sum + url.clicks,
          0
        );

        const averageClicks =
          totalUrls === 0
            ? 0
            : (totalClicks / totalUrls).toFixed(1);

        setStats({
          totalUrls,
          totalClicks,
          averageClicks,
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Welcome Back{user ? `, ${user.name}` : ""} 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all your shortened URLs from one place.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Total URLs */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Total URLs</p>
                <h2 className="text-4xl font-bold mt-2">
                  {stats.totalUrls}
                </h2>
              </div>

              <div className="bg-blue-100 p-4 rounded-full">
                <FaLink className="text-3xl text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Clicks */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Total Clicks</p>
                <h2 className="text-4xl font-bold mt-2">
                  {stats.totalClicks}
                </h2>
              </div>

              <div className="bg-green-100 p-4 rounded-full">
                <FaArrowTrendUp className="text-3xl text-green-600" />
              </div>
            </div>
          </div>

          {/* Average Clicks */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Average Clicks</p>
                <h2 className="text-4xl font-bold mt-2">
                  {stats.averageClicks}
                </h2>
              </div>

              <div className="bg-purple-100 p-4 rounded-full">
                <FaChartLine className="text-3xl text-purple-600" />
              </div>
            </div>
          </div>

        </div>

        {/* History */}
        <div className="mt-12">
          <History />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;