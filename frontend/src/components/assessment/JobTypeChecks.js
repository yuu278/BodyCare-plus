import React from 'react';

const JobTypeChecks = ({ selectedJobType = '', onJobTypeChange }) => {
  const options = [
    { id: 'sitting_work', label: '座り仕事' },
    { id: 'standing_work', label: '立ち仕事' },
    { id: 'both', label: '立ち座りどちらもある' }
  ];

  const select = (id) => {
    onJobTypeChange(id);
  };

  return (
    <div className="space-y-3">
      {options.map(opt => (
        <label key={opt.id} className="flex items-center">
          <input
            type="radio"
            name="jobType"
            checked={selectedJobType === opt.id}
            onChange={() => select(opt.id)}
            className="mr-2"
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
};

export default JobTypeChecks;
