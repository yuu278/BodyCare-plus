import React from 'react';

const BodyMap = ({ selectedAreas, onSelectArea }) => {
  const bodyParts = [
    { id: '首', name: '首' },
    { id: '肩', name: '肩' },
    { id: '背中', name: '背中' },
    { id: '腰', name: '腰' },
    { id: '膝', name: '膝' },
    { id: '足首', name: '足首' },
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
