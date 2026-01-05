import React from 'react';

const ExerciseChecks = ({ selectedExerciseHabits = '', onExerciseHabitChange }) => {
  const options = [
    { id: 'no_exercise', label: '運動はほとんどしない' },
    { id: 'some_exercise', label: '少しは運動する' },
    { id: 'regular_exercise', label: '定期的に運動する' }
  ];

  const select = (id) => {
    onExerciseHabitChange(id);
  };

  return (
    <div className="space-y-3">
      {options.map(opt => (
        <label key={opt.id} className="flex items-center">
          <input
            type="radio"
            name="exerciseHabit"
            checked={selectedExerciseHabits === opt.id}
            onChange={() => select(opt.id)}
            className="mr-2"
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
};

export default ExerciseChecks;
