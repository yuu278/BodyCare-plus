import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

const StretchDetail = () => {
  const { id } = useParams();
  const [stretch, setStretch] = useState(null);

  useEffect(() => {
    apiClient.get(`/stretches/${id}`).then(res => setStretch(res.data));
  }, [id]);

  if (!stretch) return <div>読み込み中...</div>;

  return (
    <div className="flex flex-col items-center gap-8 p-6">
      <h1 className="text-3xl font-extrabold text-left w-full pl-6 text-blue-800">{stretch.name}</h1>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {muscleImageMap[stretch.target_area] && (
          <div className="w-97 h-64 flex justify-center items-center bg-gray-100 rounded-md shadow-md overflow-hidden">
            <img
              src={muscleImageMap[stretch.target_area]}
              alt={stretch.target_area}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        {stretch.video_url && (
          <div className="w-97 h-64 flex justify-center items-center bg-gray-100 rounded-md shadow-md overflow-hidden">
            <video
              src={stretch.video_url}
              controls
              playsInline
              preload="metadata"
              className="w-96 h-auto mx-auto my-4 rounded-md shadow-md"
            >
              お使いのブラウザは動画再生に対応していません。
            </video>
          </div>
        )}
      </div>

      {/* 改行付き説明 */}
      <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed mt-6 text-base max-w-2xl">
        {stretch.description}
      </pre>

      <div className="text-sm text-gray-500 mt-4">
        対象部位：{stretch.body_part}
      </div>
    </div>
  );
};

export default StretchDetail;
