import React from 'react';

const CommentBox = ({ symptoms = '', onSymptomsChange, goals = '', onGoalsChange }) => {
  const symptomPrompts = [
    "いつから痛みや不調を感じていますか？",
    "どのような時に症状が悪化しますか？",
    "過去に怪我や手術の経験はありますか？",
    "現在治療中の疾患はありますか？"
  ];

  const goalPrompts = [
    "ストレッチで改善したいことは何ですか？",
    "どのような身体の状態を目指していますか？",
    "特に重点的に取り組みたい部位はありますか？"
  ];

  return (
    <div className="space-y-6">
      {/* 症状の詳細 */}
      <div>
        <label className="block text-gray-700 text-lg font-medium mb-3">
          症状の詳細
        </label>
        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-2">以下の点について教えてください：</p>
          <ul className="text-xs text-gray-500 list-disc list-inside space-y-1 mb-4">
            {symptomPrompts.map((prompt, index) => (
              <li key={index}>{prompt}</li>
            ))}
          </ul>
        </div>
        <textarea
          value={symptoms}
          onChange={(e) => onSymptomsChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows="5"
          placeholder="例：3ヶ月前から肩こりがひどく、デスクワーク後に特に痛みを感じます。以前に腰椎ヘルニアの治療を受けたことがあります..."
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-400">
            {(symptoms || '').length}/500文字
          </span>
          {(symptoms || '').length > 500 && (
            <span className="text-xs text-red-500">
              文字数制限を超えています
            </span>
          )}
        </div>
      </div>

      {/* 改善目標 */}
      <div>
        <label className="block text-gray-700 text-lg font-medium mb-3">
          改善目標・期待すること
        </label>
        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-2">ストレッチを通じて達成したい目標：</p>
          <ul className="text-xs text-gray-500 list-disc list-inside space-y-1 mb-4">
            {goalPrompts.map((prompt, index) => (
              <li key={index}>{prompt}</li>
            ))}
          </ul>
        </div>
        <textarea
          value={goals}
          onChange={(e) => onGoalsChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows="4"
          placeholder="例：肩こりを解消して集中力を向上させたい。柔軟性を高めて怪我を予防したい。姿勢を改善したい..."
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-400">
            {(goals || '').length}/300文字
          </span>
          {(goals || '').length > 300 && (
            <span className="text-xs text-red-500">
              文字数制限を超えています
            </span>
          )}
        </div>
      </div>

      {/* 追加情報 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">💡 より良い提案のために</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 具体的な症状や状況を記載いただくと、より適切なストレッチを提案できます</li>
          <li>• 医師から運動制限の指示がある場合は必ず記載してください</li>
          <li>• 過去の怪我や手術歴も重要な情報となります</li>
        </ul>
      </div>
    </div>
  );
};

export default CommentBox;
