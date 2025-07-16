import React from 'react';

const PainScale = ({ painLevel, onPainLevelChange, painTypes = [], onPainTypesChange }) => {
  const painDescriptions = {
    1: '痛みなし',
    2: '軽微な痛み',
    3: '軽い痛み',
    4: '中程度の痛み',
    5: '普通の痛み',
    6: 'やや強い痛み',
    7: '強い痛み',
    8: 'とても強い痛み',
    9: '耐えがたい痛み',
    10: '想像しうる最悪の痛み'
  };

  const painTypeOptions = ['だるさ', '重さ', 'しびれ', '痛み'];

  // チェックを切り替えるトグル関数
  const togglePainType = (type) => {
    if (painTypes.includes(type)) {
      // すでにチェックされている → 外す
      onPainTypesChange(painTypes.filter(t => t !== type));
    } else {
      // まだチェックされていない → 追加
      onPainTypesChange([...painTypes, type]);
    }
  };

  const getPainColor = (level) => {
    if (level <= 3) return 'text-green-600';
    if (level <= 6) return 'text-yellow-600';
    if (level <= 8) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-lg font-medium mb-3">
        現在の痛みのレベル
      </label>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">痛みなし</span>
          <span className="text-sm text-gray-500">最悪の痛み</span>
        </div>

        <div className="relative">
          <input
            type="range"
            min="1"
            max="10"
            value={painLevel}
            onChange={(e) => onPainLevelChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-green-300 via-yellow-300 to-red-400 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <span key={num}>{num}</span>
            ))}
          </div>
        </div>

        <div className="text-center mt-4">
          <div className={`text-2xl font-bold ${getPainColor(painLevel)}`}>
            {painLevel}
          </div>
          <div className={`text-sm ${getPainColor(painLevel)}`}>
            {painDescriptions[painLevel]}
          </div>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-600">
        <p>1-3: 軽微 | 4-6: 中程度 | 7-10: 重度</p>
      </div>

      {/* ▼ 痛みの種類チェック項目 */}
      <div className="mt-6">
        <label className="block text-gray-700 text-base font-medium mb-2">
          痛みの種類（複数選択可）
        </label>
        <div className="flex flex-wrap gap-4">
          {painTypeOptions.map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={painTypes.includes(type)}
                onChange={() => togglePainType(type)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PainScale;