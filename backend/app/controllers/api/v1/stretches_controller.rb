class Api::V1::StretchesController < ApplicationController
  # 全ストレッチを取得
  def index
    stretches = Stretch.all

    # エリアでフィルタリング
    stretches = stretches.for_area(params[:area]) if params[:area].present?

    # 難易度でフィルタリング
    stretches = stretches.by_difficulty(params[:difficulty]) if params[:difficulty].present?

    render json: stretches
  end

  # 特定のストレッチを取得
  def show
    stretch = Stretch.find(params[:id])
    render json: stretch
  end
end
