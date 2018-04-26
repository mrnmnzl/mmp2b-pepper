class RenamePeppersId < ActiveRecord::Migration[5.1]
  def change
    rename_column :tasks, :peppers_id, :pepper_id
  end
end
