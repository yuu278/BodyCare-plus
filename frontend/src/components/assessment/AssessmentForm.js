import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/api';
import BodyMap from './BodyMap';
import PainScale from './PainScale';
import LifestyleChecks from './LifestyleChecks';
import CommentBox from './CommentBox';

const AssessmentForm = () => {
  // フォーム状態の管理
  const [painAreas, setPainAreas] = useState([]);
  const [painLevel, setPainLevel] = useState(5);
  const [painTypes, setPainTypes] = useState([]);
  const [selectedLifestyle, setSelectedLifestyle] = useState([]);
  const [symptoms, setSymptoms] = useState('');
  const [goals, setGoals] = useState('');
  const [duration, setDuration] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const totalSteps = 5;

  // フォーム送信処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // ユーザーが設定した痛みレベルを使用
      const assessmentData = {
        shoulder_score: painAreas.includes('肩') ? painLevel : 0,
        neck_score: painAreas.includes('首') ? painLevel : 0,
        back_score: painAreas.includes('背中') ? painLevel : 0,
        hip_score: painAreas.includes('腰') ? painLevel : 0,
        knee_score: painAreas.includes('膝') ? painLevel : 0,
        ankle_score: painAreas.includes('足首') ? painLevel : 0,
        // 追加のデータも送信
        pain_areas: painAreas,
        pain_types: painTypes,
        duration: duration,
        symptoms: symptoms,
        goals: goals,
        lifestyle_factors: selectedLifestyle
      };

      const response = await apiClient.post('/body_assessments', assessmentData);
      console.log('✅ POST成功:', response.data);
      alert('アセスメント送信成功！');
      navigate('/results');
    } catch (error) {
      console.error('❌ POST失敗:', error.response?.data || error.message);
      alert('アセスメント送信に失敗しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 次のステップに進む
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  // 前のステップに戻る
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 送信可能かチェック
  const canSubmit = () => {
    return painAreas.length > 0 && duration !== '';
  };

  // ステップのタイトルを取得
  const getStepTitle = (step) => {
    const titles = {
      1: '痛みのある箇所',
      2: '痛みのレベル',
      3: '生活習慣',
      4: '詳細情報',
      5: '確認・送信'
    };
    return titles[step];
  };

  // プログレスバーのコンポーネント
  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">
          ステップ {currentStep} / {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          {getStepTitle(currentStep)}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  // 確認画面の内容
  const ConfirmationStep = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">入力内容の確認</h3>

      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
        <div>
          <h4 className="font-medium text-gray-700 mb-2">痛みのある箇所</h4>
          <div className="flex flex-wrap gap-2">
            {painAreas.map((area) => (
              <span key={area} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {area}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">痛みのレベル</h4>
          <p className="text-gray-600">{painLevel} / 10</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">症状の期間</h4>
          <p className="text-gray-600">{duration}</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">生活習慣（{(selectedLifestyle || []).length}件選択）</h4>
          <div className="text-sm text-gray-600">
            {(selectedLifestyle || []).length > 0 ? '選択済み' : '未選択'}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">症状の詳細</h4>
          <p className="text-gray-600 text-sm">
            {symptoms ? `${symptoms.substring(0, 100)}...` : '未入力'}
          </p>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">改善目標</h4>
          <p className="text-gray-600 text-sm">
            {goals ? `${goals.substring(0, 100)}...` : '未入力'}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressBar />

      <form onSubmit={handleSubmit}>
        {/* ステップ1: 痛みのある箇所 */}
        {currentStep === 1 && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">痛みのある箇所を選択してください</h3>
            <BodyMap
              selectedAreas={painAreas}
              onSelectArea={(bodyPart) => {
                if (painAreas.includes(bodyPart)) {
                  setPainAreas(painAreas.filter(area => area !== bodyPart));
                } else {
                  setPainAreas([...painAreas, bodyPart]);
                }
              }}
            />

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">選択された部位: </span>
              {painAreas.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {painAreas.map((area) => (
                    <span key={area} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500 text-sm">なし</span>
              )}
            </div>
          </div>
        )}

        {/* ステップ2: 痛みのレベル */}
        {currentStep === 2 && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">痛みのレベルと期間</h3>
            <PainScale
              painLevel={painLevel}
              onPainLevelChange={setPainLevel}
              painTypes={painTypes}
              onPainTypesChange={setPainTypes}
            />
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-3">症状の期間</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
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
          </div>
        )}

        {/* ステップ3: 生活習慣 */}
        {currentStep === 3 && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">生活習慣について</h3>
            <LifestyleChecks
              selectedLifestyle={selectedLifestyle}
              onLifestyleChange={setSelectedLifestyle}
            />
          </div>
        )}

        {/* ステップ4: 詳細情報 */}
        {currentStep === 4 && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">詳細情報</h3>
            <CommentBox
              symptoms={symptoms}
              onSymptomsChange={setSymptoms}
              goals={goals}
              onGoalsChange={setGoals}
            />
          </div>
        )}

        {/* ステップ5: 確認・送信 */}
        {currentStep === 5 && <ConfirmationStep />}

        {/* ナビゲーションボタン */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            disabled={currentStep === 1}
          >
            前へ
          </button>

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className={`px-6 py-2 rounded-lg font-medium ${
                (currentStep === 1 && painAreas.length === 0) ||
                (currentStep === 2 && duration === '')
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              disabled={
                (currentStep === 1 && painAreas.length === 0) ||
                (currentStep === 2 && duration === '')
              }
            >
              次へ
            </button>
          ) : (
            <button
              type="submit"
              className={`px-8 py-2 rounded-lg font-medium ${
                !canSubmit() || isSubmitting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
              disabled={!canSubmit() || isSubmitting}
            >
              {isSubmitting ? '送信中...' : 'アセスメントを送信'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AssessmentForm;
