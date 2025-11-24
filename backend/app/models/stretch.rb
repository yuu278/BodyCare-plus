class Stretch < ApplicationRecord
  PAIN_TYPES = %w[重だるさ 痛み 痺れ].freeze
  DURATIONS = %w[数日以内 1ヶ月未満 1ヶ月以上].freeze
  JOB_TYPES = %w[sitting_work standing_work both].freeze
  EXERCISE_HABITS = %w[no_exercise some_exercise regular_exercise].freeze
  POSTURE_HABITS = %w[hunched_shoulders arched_waist slouching straight_neck straight_back nothing].freeze

  has_many :user_stretches, dependent: :destroy
  has_many :users, through: :user_stretches

  validates :name, :description, :target_area, presence: true

  scope :for_area, ->(area) { where("target_area LIKE ?", "%#{area}%") }

  scope :matching, -> (assessment) {
    stretches = all
    stretches = stretches.where(body_part: assessment.pain_area) if assessment.pain_area.present?
    stretches = stretches.where("JSON_CONTAINS(pain_type, ?)", assessment.pain_types.to_json) if assessment.pain_types.present?
    stretches = stretches.where("JSON_CONTAINS(duration, ?)", assessment.duration.to_json) if assessment.duration.present?
    stretches = stretches.where("JSON_CONTAINS(job_type, ?)", assessment.job_types.to_json) if assessment.job_types.present?
    stretches = stretches.where("JSON_CONTAINS(exercise_habit, ?)", assessment.exercise_habits.to_json) if assessment.exercise_habits.present?
    stretches = stretches.where("JSON_CONTAINS(posture_habit, ?)", assessment.posture_habits.to_json) if assessment.posture_habits.present?
    stretches
  }

  # 柔軟性マッチング（段階的検索）
  def self.flexible_matching(assessment)
    # body_partは常に固定（必須条件）
    base_scope = where(body_part: assessment.pain_area)

    # ヘルパー: 安全に配列化して JSON にする
    to_json_array = ->(v) { Array(v).to_json }

    # 1. 完全一致（すべての指定条件を考慮）
    step1 = base_scope
    step1 = step1.where("JSON_CONTAINS(pain_type, ?)", to_json_array.call(assessment.pain_types)) if assessment.pain_types.present?
    step1 = step1.where("JSON_CONTAINS(duration, ?)", to_json_array.call(assessment.duration)) if assessment.duration.present?
    step1 = step1.where("JSON_CONTAINS(job_type, ?)", to_json_array.call(assessment.job_types)) if assessment.job_types.present?
    step1 = step1.where("JSON_CONTAINS(exercise_habit, ?)", to_json_array.call(assessment.exercise_habits)) if assessment.exercise_habits.present?
    step1 = step1.where("JSON_CONTAINS(posture_habit, ?)", to_json_array.call(assessment.posture_habits)) if assessment.posture_habits.present?
    return step1 if step1.exists?

    # 2. duration 無視
    step2 = base_scope
    step2 = step2.where("JSON_CONTAINS(pain_type, ?)", to_json_array.call(assessment.pain_types)) if assessment.pain_types.present?
    step2 = step2.where("JSON_CONTAINS(job_type, ?)", to_json_array.call(assessment.job_types)) if assessment.job_types.present?
    step2 = step2.where("JSON_CONTAINS(exercise_habit, ?)", to_json_array.call(assessment.exercise_habits)) if assessment.exercise_habits.present?
    step2 = step2.where("JSON_CONTAINS(posture_habit, ?)", to_json_array.call(assessment.posture_habits)) if assessment.posture_habits.present?
    return step2 if step2.exists?

    # 3. duration + exercise_habit 無視
    step3 = base_scope
    step3 = step3.where("JSON_CONTAINS(pain_type, ?)", to_json_array.call(assessment.pain_types)) if assessment.pain_types.present?
    step3 = step3.where("JSON_CONTAINS(job_type, ?)", to_json_array.call(assessment.job_types)) if assessment.job_types.present?
    step3 = step3.where("JSON_CONTAINS(posture_habit, ?)", to_json_array.call(assessment.posture_habits)) if assessment.posture_habits.present?
    return step3 if step3.exists?

    # 4. duration + job_type + exercise_habit 無視
    step4 = base_scope
    step4 = step4.where("JSON_CONTAINS(pain_type, ?)", to_json_array.call(assessment.pain_types)) if assessment.pain_types.present?
    step4 = step4.where("JSON_CONTAINS(posture_habit, ?)", to_json_array.call(assessment.posture_habits)) if assessment.posture_habits.present?
    return step4 if step4.exists?

    # 5. pain_type のみ
    fallback = base_scope
    fallback = fallback.where("JSON_CONTAINS(pain_type, ?)", to_json_array.call(assessment.pain_types)) if assessment.pain_types.present?
    fallback
  end
end
