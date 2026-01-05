import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/api';
import BodyMap from './BodyMap';
import PainScale from './PainScale';
import JobTypeChecks from './JobTypeChecks';
import ExerciseChecks from './ExerciseChecks';
import PostureChecks from './PostureChecks';

const AssessmentForm = () => {
  // フォーム状態の管理
  const [painArea, setPainArea] = useState('');
  const [painTypes, setPainTypes] = useState('');
  const [duration, setDuration] = useState('');
  const [jobTypes, setJobTypes] = useState('');
  const [exerciseHabits, setExerciseHabits] = useState('');
  const [postureHabits, setPostureHabits] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const totalSteps = 6;

  // フォーム送信処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // ユーザーが設定した痛みレベルを使用
      const assessmentData = {
        // 追加のデータも送信
        pain_area: painArea,
        pain_types: painTypes,
        duration: duration,
        job_types: jobTypes,
        exercise_habits: exerciseHabits,
        posture_habits: postureHabits
      };

      const response = await apiClient.post('/body_assessments', {
        body_assessment: assessmentData
      });
      console.log('✅ POST成功:', response.data);
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
    return painArea !== '' && duration !== '';
  };

  // ステップのタイトルを取得
  const getStepTitle = (step) => {
    const titles = {
      1: '痛みのある箇所',
      2: '悩みの種類と期間',
      3: '職業タイプ',
      4: '運動習慣',
      5: '姿勢習慣',
      6: '確認・送信'
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
            {painArea ? (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {painArea}
              </span>
            ) : (
              <span className="text-gray-500 text-sm">なし</span>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">悩みの種類</h4>
          <p className="text-gray-600">{painTypes || '未選択'}</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">症状の期間</h4>
          <p className="text-gray-600">{duration}</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">職業タイプ</h4>
          <div className="text-sm text-gray-600">
            {jobTypes ? '選択済み' : '未選択'}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">運動習慣</h4>
          <div className="text-sm text-gray-600">
            {exerciseHabits ? '選択済み' : '未選択'}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">普段の姿勢</h4>
          <div className="text-sm text-gray-600">
            {postureHabits ? '選択済み' : '未選択'}
          </div>
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
              selectedArea={painArea}
              onSelectArea={(bodyPart) => {
                setPainArea(bodyPart);
              }}
            />
          </div>
        )}

        {/* ステップ2: 悩みの種類と期間 */}
        {currentStep === 2 && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">悩みの種類と期間</h3>
            <PainScale
              selectedPainType={painTypes}
              onPainTypeChange={setPainTypes}
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
                <option value="数日以内">数日以内</option>
                <option value="1ヶ月未満">1ヶ月未満</option>
                <option value="1ヶ月以上">1ヶ月以上</option>
              </select>
            </div>
          </div>
        )}

        {/* ステップ3: 職業タイプ */}
        {currentStep === 3 && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">職業タイプについて選択してください</h3>
            <JobTypeChecks
              selectedJobType={jobTypes}
              onJobTypeChange={setJobTypes}
            />
          </div>
        )}

        {/* ステップ4: 運動習慣 */}
        {currentStep === 4 && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">運動習慣について選択してください</h3>
            <ExerciseChecks
              selectedExerciseHabits={exerciseHabits}
              onExerciseHabitChange={setExerciseHabits}
            />
          </div>
        )}

        {/* ステップ5: 姿勢習慣 */}
        {currentStep === 5 && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">普段の姿勢について選択してください</h3>
            <PostureChecks
              selectedPostureHabits={postureHabits}
              onPostureHabitChange={setPostureHabits}
            />
          </div>
        )}

        {/* ステップ6: 確認・送信 */}
        {currentStep === 6 && (
          <div>
            <ConfirmationStep />

            <div className="flex justify-between mt-8">
              {/* 修正する（戻る）ボタン */}
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                修正する
              </button>

              {/* 送信ボタン */}
              <button
                type="submit"
                className={`px-8 py-2 rounded-lg font-medium ${
                  !canSubmit() || isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
                disabled={!canSubmit() || isSubmitting}
              >
                {isSubmitting ? '送信中...' : 'この内容で送信する'}
              </button>
            </div>
          </div>
        )}

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

          {currentStep < totalSteps && (
            <button
              type="button"
              onClick={nextStep}
              className={`px-6 py-2 rounded-lg font-medium ${
                (currentStep === 1 && !painArea) ||
                (currentStep === 2 && (!painTypes || duration === '')) ||
                (currentStep === 3 && !jobTypes) ||
                (currentStep === 4 && !exerciseHabits) ||
                (currentStep === 5 && !postureHabits)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              disabled={
                (currentStep === 1 && !painArea) ||
                (currentStep === 2 && (!painTypes || duration === '')) ||
                (currentStep === 3 && !jobTypes) ||
                (currentStep === 4 && !exerciseHabits) ||
                (currentStep === 5 && !postureHabits)
              }
            >
              次へ
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AssessmentForm;
