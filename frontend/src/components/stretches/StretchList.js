import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/api';
import chestImage from '../assessment/muscles/chest.webp';
import neckImage from '../assessment/muscles/neck.webp';
import shoulderImage from '../assessment/muscles/shoulder.webp';
import shoulderBladeImage from '../assessment/muscles/shoulder_blade.webp';
import forearmImage from '../assessment/muscles/forearm.webp';
import innerShoulderImage from '../assessment/muscles/inner_shoulder.webp';
import backImage from '../assessment/muscles/back.webp';
import sideImage from '../assessment/muscles/side.webp';
import waistBackImage from '../assessment/muscles/waist_back.webp';
import abdomenImage from '../assessment/muscles/abdomen.webp';
import waistImage from '../assessment/muscles/waist.webp';
import hipImage from '../assessment/muscles/hip.webp';
import deepHipImage from '../assessment/muscles/deep_hip.webp';
import hipJointImage from '../assessment/muscles/hip_joint.webp';
import innerThighImage from '../assessment/muscles/inner_thigh.webp';
import tensorFasciaeLataeImage from '../assessment/muscles/tensor_fasciae_latae.webp';
import psoasImage from '../assessment/muscles/psoas.webp';
import hamstringImage from '../assessment/muscles/hamstring.webp';
import kneeImage from '../assessment/muscles/knee.webp';
import calfImage from '../assessment/muscles/calf.webp';
import ankleImage from '../assessment/muscles/ankle.webp';
import soleImage from '../assessment/muscles/sole.webp';

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

const AREA_LABELS = {
  neck_shoulder: '首・肩',
  waist_back: '腰・背中',
  hip: '股関節',
  legs: '脚',
};

const safe = (v) => (v ? v : '不明');

const StretchList = () => {
  const [stretches, setStretches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchStretches = async () => {
      try {
        const response = await apiClient.get('/stretches');
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.stretches || [];
        console.log("APIレスポンス:", data);
        const mappedStretches = data.map(stretch => ({
          id: stretch.id,
          name: safe(stretch.name),
          bodyPart: stretch.body_part && typeof stretch.body_part === 'string'
            ? stretch.body_part
            : Array.isArray(stretch.body_part)
              ? stretch.body_part[0]
              : 'unknown',
          targetArea: stretch.target_area,
          duration: Array.isArray(stretch.duration)
            ? stretch.duration.join('・')
            : safe(stretch.duration),
          imageUrl: stretch.image_url || '/api/placeholder/400/300',
        }));
        setStretches(mappedStretches);
      } catch (error) {
        console.error('ストレッチの取得に失敗しました:', error);
        setError('ストレッチ情報の取得に失敗しました。時間をおいて再試行してください。');
      } finally {
        setLoading(false);
      }
    };

    fetchStretches();
  }, []);

  const filteredStretches =
    filter === 'all'
      ? stretches
      : stretches.filter(stretch => stretch.bodyPart === filter);

  const bodyParts = [...new Set(stretches.map(stretch => stretch.bodyPart))];

  console.log("抽出された部位:", bodyParts);
  console.log("stretches:", stretches);

  if (loading) {
    return <div className="text-center p-8">読み込み中...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 p-8">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">ストレッチライブラリー</h2>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">部位でフィルター:</label>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded ${
              filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setFilter('all')}
          >
            すべて
          </button>

          {bodyParts.map(part => (
            <button
              key={part}
              className={`px-4 py-2 rounded ${
                filter === part ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setFilter(part)}
            >
              {AREA_LABELS[part] || part}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStretches.map(stretch => (
          <Link
            to={`/stretches/${stretch.id}`}
            key={stretch.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            {muscleImageMap[stretch.targetArea] && (
              <div className="flex justify-center my-2">
                <img
                  src={muscleImageMap[stretch.targetArea]}
                  alt={stretch.targetArea}
                  className="w-48 h-auto rounded-md shadow-md"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{stretch.name}</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {AREA_LABELS[stretch.bodyPart] || stretch.bodyPart}
                </span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                  {stretch.duration}
                </span>
              </div>

            </div>
          </Link>
        ))}
      </div>

      {filteredStretches.length === 0 && (
        <div className="text-center p-8 bg-gray-100 rounded">
          <p>該当するストレッチが見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
};

export default StretchList;
