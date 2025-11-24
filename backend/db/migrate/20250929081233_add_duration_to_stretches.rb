class AddDurationToStretches < ActiveRecord::Migration[7.1]
  def change
    add_column :stretches, :duration, :json
  end
end
