class Api::V1::UserStretchesController < ApplicationController
end
class Api::V1::UserStretchesController < ApplicationController
  # ユーザーに推奨されているストレッチを取得
  def recommended
    recommended_stretches = current_user.user_stretches
                                        .where(recommended: true)
                                        .includes(:stretch)
                                        .map(&:stretch)

    render json: recommended_stretches
  end

  # ユーザーが完了したストレッチを取得
  def completed
    completed_stretches = current_user.user_stretches
                                      .where.not(completed_count: [nil, 0])
                                      .includes(:stretch)
                                      .order(last_completed_at: :desc)

    render json: completed_stretches.as_json(include: :stretch)
  end

  # ストレッチを完了としてマーク
  def mark_completed
    user_stretch = current_user.user_stretches.find_or_initialize_by(stretch_id: params[:stretch_id])

    user_stretch.mark_as_completed

    render json: user_stretch
  end
