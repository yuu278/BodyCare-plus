import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/api';

const RecommendedStretches = () => {
  const [stretches, setStretches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStretches = async () => {
      try {
        const res = await apiClient.get('/user_stretches/recommended');
        setStretches(res.data);
      } catch (err) {
        console.error('❌ ストレッチ取得失敗:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStretches();
  }, []);

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (stretches.length === 0) {
    return <p>おすすめのストレッチが見つかりませんでした。</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">あなたにおすすめのストレッチ</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {stretches.map(stretch => (
          <Link
            to={`/stretches/${stretch.id}`}
            key={stretch.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="p-4">
              <h3 className="font-semibold text-lg">{stretch.name}</h3>
              <p className="text-gray-600">{stretch.description || '説明なし'}</p>
              <p className="text-sm text-gray-500">対象部位: {stretch.target_area}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link to="/stretches" className="btn btn-outline btn-primary">
          すべてのストレッチを見る
        </Link>
      </div>
    </div>
  );
};

export default RecommendedStretches;
