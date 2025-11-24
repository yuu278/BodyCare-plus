class ChangeStretchAttributesToJson < ActiveRecord::Migration[7.1]
  def change
    change_column :stretches, :pain_type, :json
    change_column :stretches, :duration, :json
    change_column :stretches, :job_type, :json
    change_column :stretches, :exercise_habit, :json
    change_column :stretches, :posture_habit, :json
  end
end
