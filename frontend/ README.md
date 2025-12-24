# Frontend

BodyCare+ アプリのフロントエンドリポジトリです。
ユーザーの身体状態診断、ストレッチ一覧・動画表示などの UI を担当しています。

## 技術スタック
- React
- Tailwind CSS
- DaisyUI

## 構成について
本アプリは **フロントエンドとバックエンドを分離した構成**になっています。

- フロントエンド：Vercel にデプロイ
- バックエンド：Rails API（Heroku にデプロイ）
  - 別リポジトリ：BodyCare-plus-backend

フロントエンドは、バックエンドの API と通信することで動作します。

## セットアップ（ローカル開発）
```bash
npm install
npm start
