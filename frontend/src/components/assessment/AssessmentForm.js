import React, { useState } from 'react';
import BodyMap from './BodyMap';

const AssessmentForm = () => {
  const [painAreas, setPainAreas] = useState([]);
  const [painLevel, setPainLevel] = useState(5);
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ここでAPIリクエストを実行する
    try {
      // API呼び出しのダミーコード
      // await api.post('/assessments', { painAreas, painLevel, symptoms, duration });

      console.log('Assessment submitted:', { painAreas, painLevel, symptoms, duration });

      // 送信成功後、リザルトページへリダイレクト
      // history.push('/results');
    } catch (error) {
      console.error('Assessment submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBodyPartSelect = (bodyPart) => {
    if (painAreas.includes(bodyPart)) {
      setPainAreas(painAreas.filter(area => area !== bodyPart));
    } else {
      setPainAreas([...painAreas, bodyPart]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">身体の状態評価</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">痛みのある箇所を選択してください</label>
          <BodyMap selectedAreas={painAreas} onSelectArea={handleBodyPartSelect} />

          <div className="mt-2">
            <span>選択された部位: </span>
            {painAreas.length > 0 ? (
              painAreas.map((area, index) => (
                <span key={area} className="inline-block bg-blue-100 px-2 py-1 rounded mr-2 mb-2">
                  {area}
                </span>
              ))
            ) : (
              <span className="text-gray-500">なし</span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">痛みのレベル (1-10)</label>
          <div className="flex items-center">
            <input
              type="range"
              min="1"
              max="10"
              value={painLevel}
              onChange={(e) => setPainLevel(parseInt(e.target.value))}
              className="w-full"
            />
            <span className="ml-2 font-bold">{painLevel}</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">症状の詳細</label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="症状について詳しく教えてください..."
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">症状の期間</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">選択してください</option>
            <option value="1日以内">1日以内</option>
            <option value="数日">数日</option>
            <option value="1週間程度">1週間程度</option>
            <option value="1ヶ月程度">1ヶ月程度</option>
            <option value="数ヶ月">数ヶ月</option>
            <option value="1年以上">1年以上</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className={`btn btn-primary w-full ${isSubmitting && 'loading'}`}
            disabled={isSubmitting}
          >
            評価を送信
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssessmentForm;
