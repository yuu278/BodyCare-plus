import React, { useEffect } from 'react';

const PostureChecks = ({ selectedPostureHabits = '', onPostureHabitChange, onValidityChange }) => {
  const options = [
    { id: 'hunched_shoulders', label: '巻き肩' },
    { id: 'arched_waist', label: '反り腰' },
    { id: 'slouching', label: '猫背' },
    { id: 'straight_neck', label: 'ストレートネック' },
    { id: 'nothing', label: '該当項目なし' }
  ];

  useEffect(() => {
    if (onValidityChange) {
      onValidityChange(selectedPostureHabits !== '');
    }
  }, [selectedPostureHabits, onValidityChange]);

  const handleChange = (id) => {
    onPostureHabitChange(id);
    if (onValidityChange) {
      onValidityChange(id !== '');
    }
  };

  return (
    <div className="space-y-3">
      {options.map(opt => (
        <label key={opt.id} className="flex items-center">
          <input
            type="radio"
            name="posture"
            value={opt.id}
            checked={selectedPostureHabits === opt.id}
            onChange={() => handleChange(opt.id)}
            className="mr-2"
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
};

export default PostureChecks;
