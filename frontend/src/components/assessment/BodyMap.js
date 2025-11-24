import React from 'react';

const BodyMap = ({ selectedArea, onSelectArea }) => {
  const bodyParts = [
    { id: 'neck_shoulder', name: '首・肩' },
    { id: 'waist_back', name: '腰・背中' },
    { id: 'hip', name: '股関節' },
    { id: 'legs', name: '脚' }
  ];

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {bodyParts.map((part) => (
        <button
          key={part.id}
          type="button"
          className={`p-2 border rounded ${
            selectedArea === part.id ? 'bg-blue-500 text-white' : 'bg-gray-100'
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
