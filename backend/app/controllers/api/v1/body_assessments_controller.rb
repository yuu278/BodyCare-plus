class Api::V1::BodyAssessmentsController < ApplicationController
  before_action :set_body_assessment, only: [:show, :update, :destroy]

  # 現在のユーザーの全アセスメントを取得
  def index
    assessments = current_user.body_assessments.order(assessment_date: :desc)
    render json: assessments
  end

  # 特定のアセスメントを取得
  def show
    render json: @body_assessment
  end

  # 新しいアセスメントを作成
  def create
    assessment = current_user.body_assessments.new(assessment_params)
    assessment.assessment_date = Time.current

    if assessment.save
      # アセスメント結果に基づいてストレッチを推奨
      recommend_stretches(assessment)
      render json: assessment, status: :created
    else
      render json: { errors: assessment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # アセスメントを更新
  def update
    if @body_assessment.update(assessment_params)
      render json: @body_assessment
    else
      render json: { errors: @body_assessment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # アセスメントを削除
  def destroy
    @body_assessment.destroy
    head :no_content
  end

  private

  def set_body_assessment
    @body_assessment = current_user.body_assessments.find(params[:id])
  end

  def assessment_params
    params.require(:body_assessment).permit(:shoulder_score, :neck_score, :back_score, :hip_score, :knee_score, :ankle_score)
  end

  # アセスメント結果に基づいて適切なストレッチを推奨
  def recommend_stretches(assessment)
    # 問題のある部位を特定
    problem_areas = assessment.problem_areas

    # 問題がある部位向けのストレッチを取得
    problem_areas.each do |area|
      stretches = Stretch.for_area(area).by_difficulty(1..3)

      # ユーザーに各ストレッチを推奨
      stretches.each do |stretch|
        UserStretch.create_or_find_by(
          user: current_user,
          stretch: stretch,
          recommended: true
        )
      end
    end
  end
end
