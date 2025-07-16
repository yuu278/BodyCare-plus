import React from 'react';

const LifestyleChecks = ({ selectedLifestyle = [], onLifestyleChange }) => {
  const lifestyleCategories = [
    {
      title: '仕事・日常生活',
      items: [
        { id: 'desk_work', label: 'デスクワーク（1日6時間以上）' },
        { id: 'standing_work', label: '立ち仕事が多い' },
        { id: 'physical_work', label: '肉体労働・重いものを運ぶ' },
        { id: 'driving', label: '長時間の運転' },
        { id: 'smartphone_use', label: 'スマートフォンの長時間使用' }
      ]
    },
    {
      title: '運動習慣',
      items: [
        { id: 'no_exercise', label: '運動をほとんどしない' },
        { id: 'light_exercise', label: '軽い運動（週1-2回）' },
        { id: 'regular_exercise', label: '定期的な運動（週3回以上）' },
        { id: 'sports', label: 'スポーツをしている' },
        { id: 'gym', label: 'ジム・フィットネス通い' }
      ]
    },
    {
      title: '睡眠・ストレス',
      items: [
        { id: 'poor_sleep', label: '睡眠不足・睡眠の質が悪い' },
        { id: 'stress', label: 'ストレスを感じることが多い' },
        { id: 'irregular_schedule', label: '生活リズムが不規則' },
        { id: 'tired', label: '疲れがたまりやすい' }
      ]
    },
    {
      title: '身体の特徴',
      items: [
        { id: 'bad_posture', label: '姿勢が悪いと感じる' },
        { id: 'stiff', label: '身体が硬い' },
        { id: 'weak_muscles', label: '筋力不足を感じる' },
        { id: 'balance_poor', label: 'バランス感覚が悪い' },
        { id: 'cold', label: '冷え性・血行不良' }
      ]
    },
  ];

  const handleItemToggle = (itemId) => {
    const currentSelected = selectedLifestyle || [];
    if (currentSelected.includes(itemId)) {
      onLifestyleChange(currentSelected.filter(id => id !== itemId));
    } else {
      onLifestyleChange([...currentSelected, itemId]);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-lg font-medium mb-4">
        生活習慣・身体の特徴
      </label>
      <p className="text-sm text-gray-600 mb-4">
        当てはまるものをすべて選択してください（複数選択可）
      </p>

      <div className="space-y-6">
        {lifestyleCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3 border-b border-gray-200 pb-2">
              {category.title}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.items.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center cursor-pointer hover:bg-white p-2 rounded transition-colors duration-150"
                >
                  <input
                    type="checkbox"
                    checked={(selectedLifestyle || []).includes(item.id)}
                    onChange={() => handleItemToggle(item.id)}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {(selectedLifestyle || []).length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 font-medium mb-2">
            選択された項目 ({(selectedLifestyle || []).length}件)
          </p>
          <div className="flex flex-wrap gap-2">
            {(selectedLifestyle || []).map((itemId) => {
              const item = lifestyleCategories
                .flatMap(cat => cat.items)
                .find(item => item.id === itemId);
              return (
                <span
                  key={itemId}
                  className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {item?.label}
                  <button
                    type="button"
                    onClick={() => handleItemToggle(itemId)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LifestyleChecks;
