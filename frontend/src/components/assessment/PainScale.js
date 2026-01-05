import React from 'react';

const PainScale = ({ selectedPainType, onPainTypeChange }) => {
  const painTypeOptions = ['重だるさ', '痺れ', '痛み'];

  return (
    <div className="mb-6">
      {/* ▼ 悩みの種類（単一選択） */}
      <div className="mt-6">
        <label className="block text-gray-700 text-base font-medium mb-2">
          悩みの種類（1つ選択）
        </label>
        <div className="flex flex-wrap gap-4">
          {painTypeOptions.map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                name="painType"
                value={type}
                checked={selectedPainType === type}
                onChange={() => onPainTypeChange(type)}
                className="form-radio h-4 w-4 text-blue-600"
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
