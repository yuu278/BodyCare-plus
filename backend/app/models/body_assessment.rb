class BodyAssessment < ApplicationRecord
  belongs_to :user

  validates :assessment_date, presence: true
  validates :shoulder_score, :neck_score, :back_score, :hip_score, :knee_score, :ankle_score,
            presence: true,
            numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 10 }

  def total_score
    shoulder_score + neck_score + back_score + hip_score + knee_score + ankle_score
  end

  def problem_areas
    areas = []
    areas << "shoulder" if shoulder_score > 5
    areas << "neck" if neck_score > 5
    areas << "back" if back_score > 5
    areas << "hip" if hip_score > 5
    areas << "knee" if knee_score > 5
    areas << "ankle" if ankle_score > 5
    areas
  end
end
