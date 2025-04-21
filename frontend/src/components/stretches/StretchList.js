import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StretchList = () => {
  const [stretches, setStretches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // ここで実際のAPIからデータを取得する
    // 仮データを使用
    const dummyStretches = [
      {
        id: 1,
        name: '肩回しストレッチ',
        targetArea: '肩',
        difficulty: '初級',
        duration: '5分',
        imageUrl: '/api/placeholder/400/300',
      },
      {
        id: 2,
        name: '腰ひねりストレッチ',
        targetArea: '腰',
        difficulty: '中級',
        duration: '8分',
        imageUrl: '/api/placeholder/400/300',
      },
      {
        id: 3,
        name: '足首回しストレッチ',
        targetArea: '足首',
        difficulty: '初級',
        duration: '3分',
        imageUrl: '/api/placeholder/400/300',
      },
      {
        id: 4,
        name: '背中伸ばしストレッチ',
        targetArea: '背中上部',
        difficulty: '上級',
        duration: '10分',
        imageUrl: '/api/placeholder/400/300',
      },
    ];

    setStretches(dummyStretches);
    setLoading(false);
  }, []);

  const filteredStretches = filter === 'all'
    ? stretches
    : stretches.filter(stretch => stretch.targetArea === filter);

  const targetAreas = [...new Set(stretches.map(stretch => stretch.targetArea))];

  if (loading) {
    return <div className="text-center p-8">読み込み中...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">ストレッチライブラリー</h2>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">部位でフィルター:</label>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('all')}
          >
            すべて
          </button>

          {targetAreas.map(area => (
            <button
              key={area}
              className={`px-4 py-2 rounded ${filter === area ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setFilter(area)}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStretches.map(stretch => (
          <Link
            to={`/stretches/${stretch.id}`}
            key={stretch.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={stretch.imageUrl}
              alt={stretch.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{stretch.name}</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {stretch.targetArea}
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  {stretch.difficulty}
                </span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                  {stretch.duration}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredStretches.length === 0 && (
        <div className="text-center p-8 bg-gray-100 rounded">
          <p>該当するストレッチが見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
};

export default StretchList;
