import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/api';
import chestImage from '../components/assessment/muscles/chest.webp';
import neckImage from '../components/assessment/muscles/neck.webp';
import shoulderImage from '../components/assessment/muscles/shoulder.webp';
import shoulderBladeImage from '../components/assessment/muscles/shoulder_blade.webp';
import forearmImage from '../components/assessment/muscles/forearm.webp';
import innerShoulderImage from '../components/assessment/muscles/inner_shoulder.webp';
import backImage from '../components/assessment/muscles/back.webp';
import sideImage from '../components/assessment/muscles/side.webp';
import waistBackImage from '../components/assessment/muscles/waist_back.webp';
import abdomenImage from '../components/assessment/muscles/abdomen.webp';
import waistImage from '../components/assessment/muscles/waist.webp';
import hipImage from '../components/assessment/muscles/hip.webp';
import deepHipImage from '../components/assessment/muscles/deep_hip.webp';
import hipJointImage from '../components/assessment/muscles/hip_joint.webp';
import innerThighImage from '../components/assessment/muscles/inner_thigh.webp';
import tensorFasciaeLataeImage from '../components/assessment/muscles/tensor_fasciae_latae.webp';
import psoasImage from '../components/assessment/muscles/psoas.webp';
import hamstringImage from '../components/assessment/muscles/hamstring.webp';
import kneeImage from '../components/assessment/muscles/knee.webp';
import calfImage from '../components/assessment/muscles/calf.webp';
import ankleImage from '../components/assessment/muscles/ankle.webp';
import soleImage from '../components/assessment/muscles/sole.webp';

const targetAreaMap = {
  neck: '僧帽筋',
  shoulder: '三角筋',
  chest: '大胸筋',
  shoulder_blade: '菱形筋',
  forearm: '前腕屈筋群',
  inner_shoulder: 'ローテーターカフ',
  back: '広背筋',
  side: '腹斜筋',
  waist_back: '脊柱起立筋',
  abdomen: '腹直筋',
  waist: '腰方形筋',
  hip: '大臀筋',
  deep_hip: '梨状筋',
  hip_joint: '中臀筋',
  inner_thigh: '内転筋群',
  tensor_fasciae_latae: '大腿筋膜張筋',
  psoas: '腸腰筋',
  hamstring: 'ハムストリングス',
  knee: '大腿四頭筋',
  calf: '下腿三頭筋',
  ankle: '前脛骨筋',
  sole: '後脛骨筋',
};

const muscleImageMap = {
  chest: chestImage,
  neck: neckImage,
  shoulder: shoulderImage,
  shoulder_blade: shoulderBladeImage,
  forearm: forearmImage,
  inner_shoulder: innerShoulderImage,
  back: backImage,
  side: sideImage,
  waist_back: waistBackImage,
  abdomen: abdomenImage,
  waist: waistImage,
  hip: hipImage,
  deep_hip: deepHipImage,
  hip_joint: hipJointImage,
  inner_thigh: innerThighImage,
  tensor_fasciae_latae: tensorFasciaeLataeImage,
  psoas: psoasImage,
  hamstring: hamstringImage,
  knee: kneeImage,
  calf: calfImage,
  ankle: ankleImage,
  sole: soleImage,
};

const Results = () => {
  const [recommendedStretches, setRecommendedStretches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const mainStretch = recommendedStretches[0];

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/user_stretches/recommended');
      console.log('APIから取得したrecommendedStretches:', response.data);
      setRecommendedStretches(response.data);
    } catch (error) {
      console.error('データ取得エラー:', error);
      setError('ストレッチ情報の取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="alert alert-error">
          <span>{error}</span>
          <button onClick={fetchData} className="btn btn-sm btn-outline ml-4">
            再試行
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">診断結果</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          あなたがストレッチするべき筋肉は「
          <strong>{targetAreaMap[recommendedStretches[0]?.target_area] || recommendedStretches[0]?.target_area}</strong>
          」です！
        </h2>
        {muscleImageMap[recommendedStretches[0]?.target_area] && (
          <div className="flex justify-center my-4">
            <img
              src={muscleImageMap[recommendedStretches[0].target_area]}
              alt={targetAreaMap[recommendedStretches[0].target_area]}
              className="w-64 h-auto rounded-md shadow-md"
            />
          </div>
        )}
        <p
          className="text-gray-700 mb-4 leading-relaxed whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: recommendedStretches[0]?.muscle_info
              ? recommendedStretches[0].muscle_info.replace(/\\n/g, '<br />')
              : '※ここに筋肉の解剖学的な説明を表示します。',
          }}
        />
      </div>


      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6 text-blue-700">あなたにおすすめのストレッチ</h2>

        {recommendedStretches.length > 0 ? (
          <div className="space-y-4">
            {mainStretch ? (
              <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
                <h3 className="text-lg font-bold mb-3 text-left text-blue-800">
                  {mainStretch.name}
                </h3>

                {/* 動画を上に表示 */}
                {mainStretch.video_url && (
                  <video
                    src={mainStretch.video_url}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-96 h-auto mx-auto my-4 rounded-md shadow-md"
                  >
                    お使いのブラウザは動画再生に対応していません。
                  </video>
                )}

                {/* 改行を反映して説明を見やすく */}
                <p
                  className="text-base text-gray-700 mb-4 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: mainStretch.description.replace(/\n/g, '<br />'),
                  }}
                />

                <div className="text-xs text-gray-500 text-right">
                  対象部位: {targetAreaMap[mainStretch.target_area] || mainStretch.target_area}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                おすすめのストレッチがまだありません。
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500">おすすめのストレッチがまだありません。</div>
        )}
      </div>

      <div className="text-center mt-10">
        <p className="text-lg font-medium mb-4">毎日少しずつ続けて、体を整えていきましょう！</p>
        <Link to="/assessment" className="btn btn-outline btn-primary mr-4">
          再度診断する
        </Link>
        <Link to="/library" className="btn btn-primary">
          ストレッチ一覧を見る
        </Link>
      </div>
    </div>
  );
};

export default Results;
