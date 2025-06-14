import React from 'react';
import { Link } from 'react-router-dom';

const RecommendedStretches = ({ painAreas }) => {
  // 実際のアプリケーションでは、痛みのある部位に基づいて推奨ストレッチを取得する
  // 仮データを使用
  const getRecommendedStretches = () => {
    const recommendations = {
      '肩': [
        { id: 1, name: '肩回しストレッチ', duration: '5分', imageUrl: '/api/placeholder/300/200' },
        { id: 5, name: '胸を開くストレッチ', duration: '3分', imageUrl: '/api/placeholder/300/200' }
      ],
      '腰': [
        { id: 2, name: '腰ひねりストレッチ', duration: '8分', imageUrl: '/api/placeholder/300/200' },
        { id: 6, name: '猫のポーズ', duration: '5分', imageUrl: '/api/placeholder/300/200' }
      ],
      '首': [
        { id: 7, name: '首回しストレッチ', duration: '3分', imageUrl: '/api/placeholder/300/200' },
        { id: 8, name: '首の側屈ストレッチ', duration: '4分', imageUrl: '/api/placeholder/300/200' }
      ],
      '膝': [
        { id: 9, name: '膝の曲げ伸ばし', duration: '5分', imageUrl: '/api/placeholder/300/200' },
        { id: 10, name: '太腿前面のストレッチ', duration: '6分', imageUrl: '/api/placeholder/300/200' }
      ]
    };

    let recommended = [];

    if (painAreas && painAreas.length > 0) {
      painAreas.forEach(area => {
        if (recommendations[area]) {
          recommended = [...recommended, ...recommendations[area]];
        }
      });
    }

    // 推奨ストレッチがない場合は一般的なものを表示
    if (recommended.length === 0) {
      recommended = [
        { id: 1, name: '肩回しストレッチ', duration: '5分', imageUrl: '/api/placeholder/300/200' },
        { id: 2, name: '腰ひねりストレッチ', duration: '8分', imageUrl: '/api/placeholder/300/200' },
        { id: 3, name: '足首回しストレッチ', duration: '3分', imageUrl: '/api/placeholder/300/200' },
      ];
    }

    return recommended;
  };

  const recommendedStretches = getRecommendedStretches();

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">あなたにおすすめのストレッチ</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recommendedStretches.map(stretch => (
          <Link
            to={`/stretches/${stretch.id}`}
            key={stretch.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden"
          >
            <img
              src={stretch.imageUrl}
              alt={stretch.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{stretch.name}</h3>
              <p className="text-gray-600">{stretch.duration}</p>
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
