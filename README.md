# ストレッチアシスタント

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

## サービス概要

身体の悩みに基づいて、パーソナライズされたストレッチを提案するWebアプリケーションです。
6つの簡単な質問に答えるだけで、あなたに最適なストレッチを動画付きで提案します。

本アプリは **フロントエンドとバックエンドを分離した構成**で開発しています。
フロントエンドは Vercel、バックエンドは Heroku にデプロイし、API通信によって連携しています。

## 本番環境

- フロントエンド（Vercel）
  https://bodycare-app-frontend.herokuapp.com

- バックエンド（Rails API / Heroku）
  ※ API専用のためブラウザからの直接アクセスは想定していません

## 主な機能一覧

- **新規登録**
- **ログイン**
- **ストレッチ診断**: 痛みの箇所・種類・期間・職業・運動習慣・姿勢から最適なストレッチを提案
- **パーソナライズ提案**: 対象筋肉の解説と具体的なストレッチ方法を動画で表示
- **ストレッチライブラリ**: 部位別にストレッチを検索・閲覧
- **ゲストログイン**: 会員登録不要でお試し利用可能

## 使い方

### 1. ホーム画面

ゲストユーザーとして使用する場合は、「ログイン」ボタン→「ゲストとしてログイン」ボタンの順で押すとゲストログインが出来ます。
(新規登録する場合は「始める」ボタンを押し、個人情報を書き、「登録」ボタンを押した後、ログイン処理をしていきます。)

![ホーム画面](https://github.com/yuu278/BodyCare-plus/blob/main/docs/images/home.gif?raw=true)

### 2. 診断フロー

ログイン後に「診断を受ける」ボタンを押すと診断が始まり、
痛みの箇所・悩みの種類と期間・職業タイプ・運動習慣・普段の姿勢について当てはまるものを選択していきます。

![診断フロー](https://github.com/yuu278/BodyCare-plus/blob/main/docs/videos/assessment-flow.gif?raw=true)

### 3. 診断結果とおすすめストレッチ

すべての診断に回答すると入力内容の確認画面が表示され、「この内容で送信する」ボタンを押すと診断結果画面に遷移します。
診断結果画面では、ストレッチするべき筋肉の名前・画像・説明と、
おすすめのストレッチの名前・動画・手順が記載されており、
より詳しく自分に合ったストレッチを確認する事ができます。

![診断結果](https://github.com/yuu278/BodyCare-plus/blob/main/docs/images/result.gif?raw=true)

## 技術スタック

### フロントエンド
- React
- React Router
- Tailwind CSS
- DaisyUI
- デプロイ：Vercel

### バックエンド
- Ruby on Rails（APIモード）
- JWT認証
- デプロイ：Heroku
- バックエンドリポジトリ
  https://github.com/yuu278/BodyCare-plus-backend

### データベース
- MySQL

### 開発環境
- Docker / Docker Compose

## ローカル環境での起動（フロント統合開発用）
```bash
# リポジトリをクローン
git clone https://github.com/yuu278/BodyCare-plus.git
cd BodyCare-plus

# Dockerコンテナを起動
docker compose up -d

# データベースをセットアップ
docker compose exec back rails db:create db:migrate db:seed

# アクセス
# フロントエンド: http://localhost:8000
# バックエンド: http://localhost:3000
```
※ 本番環境ではバックエンドは独立したリポジトリとして管理しています。
## リポジトリ構成

- bodycare+
  フロントエンド（React）およびローカル統合開発用構成
  https://github.com/yuu278/BodyCare-plus

- BodyCare-plus-backend
  バックエンド（Rails API）専用リポジトリ
  https://github.com/yuu278/BodyCare-plus-backend

## 技術的な工夫

- JWT認証による安全なユーザー管理
- 柔軟性マッチングアルゴリズムで多様な診断結果に対応
- Dockerによるローカル開発環境の統一
- RSpecによる包括的なテスト

## 作者

Yuichi Arioka - [@yuu278](https://github.com/yuu278)
