class Stretch < ApplicationRecord
  has_many :user_stretches, dependent: :destroy
  has_many :users, through: :user_stretches

  validates :name, presence: true
  validates :description, presence: true
  validates :target_area, presence: true
  validates :difficulty, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }

  # 特定の体の部位に効果的なストレッチを検索するスコープ
  scope :for_area, ->(area) { where("target_area LIKE ?", "%#{area}%") }

  # 難易度でフィルタリングするスコープ
  scope :by_difficulty, ->(level) { where(difficulty: level) }
end
