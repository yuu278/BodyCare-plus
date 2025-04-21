class CreateBodyAssessments < ActiveRecord::Migration[7.1]
  def change
    create_table :body_assessments do |t|
      t.references :user, null: false, foreign_key: true
      t.datetime :assessment_date
      t.integer :shoulder_score
      t.integer :neck_score
      t.integer :back_score
      t.integer :hip_score
      t.integer :knee_score
      t.integer :ankle_score

      t.timestamps
    end
  end
end
