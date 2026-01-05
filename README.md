# BodyCare+ — あなた専用のストレッチ提案アプリ

<p align="left">
  <img src="https://img.shields.io/badge/Rails-D30001?logo=rubyonrails&style=flat">
  <img src="https://img.shields.io/badge/React-555?logo=react&style=popout">
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&style=flat">
  <img src="https://img.shields.io/badge/DaisyUI-5A0EF8?logo=daisyui&style=flat">
  <img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&style=flat">
  <img src="https://img.shields.io/badge/Heroku-430098?logo=heroku&style=flat">
  <img src="https://img.shields.io/badge/Vercel-000000?logo=vercel&style=flat">
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&style=flat">
  <img src="https://img.shields.io/badge/Docker-555?logo=docker&style=popout">
</p>

## 1.本番環境

**URL**: https://body-care-plus.vercel.app
ゲストログイン機能により、会員登録なしで全機能をお試しいただけます。

## 2.サービス概要

BodyCare+は、身体の痛みや不調に悩む方に向けて、6つの簡単な質問に答えるだけで最適なストレッチを提案するWebアプリケーションです。
デスクワークによる肩こりや腰痛、運動不足による身体の硬さなど、現代人が抱える身体の悩みに対して、
専門的な知識がなくても自分に合ったストレッチを見つけられることを目指して開発しました。

## 3.開発の背景

私自身が前職でストレッチトレーナーの仕事をしており、そこで課題に感じていた事をアプリにしました。
ストレッチを受けにきていただくお客様も根本の解決にはストレッチを習慣にしていかなければならず、
家でもできるストレッチを紹介するのですが、やり方を忘れたり教えたストレッチしかやらないという課題がありました。
そこで、誰でも簡単に自分の身体の状態に合わせたストレッチを見つけられて、
尚且つわからない時はいつでもやり方を見返せるサービスを作りたいと考え、このアプリを開発しました。
痛みの箇所だけでなく、職業や運動習慣、普段の姿勢なども考慮することで、
より個人に最適化されたストレッチを提案できる仕組みを実装しています。

## 4.主な機能

### ユーザー認証機能

![ログイン画面](https://github.com/user-attachments/assets/25bcd8f4-b32a-40ce-9ec2-6f740010752d)

- 新規登録・ログイン機能（JWT認証）
- ゲストログイン機能（会員登録不要で全機能を体験可能）

### ストレッチ診断機能

![診断画面](https://github.com/user-attachments/assets/bccf0e5d-b54c-48b7-8c91-d602db1ffbb7)

6つの質問に答えることで、あなたに最適なストレッチを提案します。

- 痛みのある箇所の選択（首・肩、腰・背中、股関節、脚）
- 痛みの種類（痛み・痺れ・こり・違和感）
- 痛みの期間（数日以内〜1ヶ月以上）
- 職業タイプ（デスクワーク・立ち仕事・両方）
- 運動習慣（なし・たまに・定期的）
- 姿勢の癖（猫背・反り腰など）

![診断フロー](https://github.com/user-attachments/assets/cf61a1a1-7391-450e-a7c0-865f11537a38)

### パーソナライズされた診断結果

![診断結果画面1](https://github.com/user-attachments/assets/8cec42d4-eb6f-4a84-8c63-405453c2cd0a)
![診断結果画面2](https://github.com/user-attachments/assets/14307757-5799-4563-aeae-0739d7aa28ed)

診断結果に基づき、以下の情報を表示します。

- ストレッチすべき筋肉の名称と解説(画像付き)
- 筋肉の役割と痛みの原因
- おすすめストレッチの動画（Cloudinary経由で配信）
- ストレッチの詳しい手順とポイント

### ストレッチライブラリ

![ストレッチライブラリ](https://github.com/user-attachments/assets/38a0c75a-92b3-4498-a893-21cb6676662c)

- 部位別（首・肩、腰・背中、股関節、脚）でフィルタリング可能
- 各ストレッチの詳細情報を閲覧
- 動画による分かりやすい解説

## 5.使用技術

### フロントエンド
| 技術 | 用途 |
|------|------|
| React 18.2.0 | UIライブラリ |
| React Router 6.x | ルーティング |
| Axios | API通信 |
| Formik & Yup | フォーム管理・バリデーション |
| Tailwind CSS | スタイリング |
| DaisyUI | UIコンポーネント |

### バックエンド
| 技術 | 用途 |
|------|------|
| Ruby on Rails 7.1.5 (APIモード) | APIサーバー |
| PostgreSQL | データベース（本番環境） |
| MySQL 8.0 | データベース（開発環境） |
| JWT | 認証トークン |
| RSpec | テストフレームワーク |

### インフラ・開発環境
| 技術 | 用途 |
|------|------|
| Vercel | フロントエンドホスティング |
| Heroku | バックエンドホスティング |
| Cloudinary | 動画ファイル配信 |
| Docker / Docker Compose | 開発環境 |
| GitHub | バージョン管理 |

## 6.ER図

本アプリのデータベース設計を示す ER 図です。

![ER図](https://github.com/user-attachments/assets/047d423c-bef4-419f-8a0c-e3ee89c1227b)

## 7. 今後の展望

今後は、以下の順序で機能拡張・改善を進めていく予定です。

### ① ストレッチ履歴管理・継続支援機能の追加
ストレッチ履歴や実施日数を可視化し、継続しやすい仕組みを提供します。

### ② ユーザーごとのカスタマイズ機能強化
お気に入りストレッチの登録や、実施できない動作の設定など、ユーザーの状態に合わせた提案精度を高めます。

### ③ 診断ロジックの高度化
痛みの強度や過去の診断結果を考慮し、よりパーソナライズされたストレッチ提案を行います。

### ④ ストレッチコンテンツの拡充
対象部位や症状のバリエーションを増やし、幅広い悩みに対応します。

### ⑤ モバイルファーストな UI / UX 改善
スマートフォンでの操作性・視認性を重視したデザイン改善を行います。

### ⑥ 将来的な発展構想
専門家監修コンテンツの追加や、会員プランの導入も検討しています。
