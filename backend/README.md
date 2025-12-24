# Backend API（開発用）

BodyCare+ アプリのバックエンド API（開発用）です。
フロントエンド（bodycare+ / frontend）と組み合わせて、ローカル環境での動作確認を行うために使用します。

本番環境では、本APIは **BodyCare-plus-backend リポジトリ**として切り出され、Heroku にデプロイされています。

## 技術スタック
- Ruby on Rails（APIモード）
- MySQL
- JWT 認証
- Cloudinary（動画管理）

## 主な機能
- ユーザー認証（JWT）
- 身体状態診断の保存
- 診断結果に基づくストレッチ推薦 API

## セットアップ（ローカル）
```bash
bundle install
rails db:create db:migrate db:seed
rails server -p 3000
