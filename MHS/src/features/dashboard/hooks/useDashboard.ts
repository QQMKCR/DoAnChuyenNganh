//Kéo API, chuẩn hoá data, caching.
import { useState, useEffect } from 'react';
import { getDashboardStats, getRecentActivities } from '../api/dashboard.api';

export const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, activitiesData] = await Promise.all([
          getDashboardStats(),
          getRecentActivities()
        ]);
        setStats(statsData);
        setActivities(activitiesData);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { stats, activities, loading, error };
};