import React from 'react';

const BodyMap = ({ selectedAreas, onSelectArea }) => {
  const bodyParts = [
    { id: '首', name: '首' },
    { id: '肩', name: '肩' },
    { id: '上腕', name: '上腕' },
    { id: '肘', name: '肘' },
    { id: '前腕', name: '前腕' },
    { id: '手首', name: '手首' },
    { id: '手', name: '手' },
    { id: '胸部', name: '胸部' },
    { id: '腹部', name: '腹部' },
    { id: '背中上部', name: '背中上部' },
    { id: '背中下部', name: '背中下部' },
    { id: '腰', name: '腰' },
    { id: '臀部', name: '臀部' },
    { id: '太腿', name: '太腿' },
    { id: '膝', name: '膝' },
    { id: '下腿', name: '下腿' },
    { id: '足首', name: '足首' },
    { id: '足', name: '足' },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
      {bodyParts.map((part) => (
        <button
          key={part.id}
          type="button"
          className={`p-2 border rounded ${
            selectedAreas.includes(part.id) ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}
          onClick={() => onSelectArea(part.id)}
        >
          {part.name}
        </button>
      ))}
    </div>
  );
};

export default BodyMap;
