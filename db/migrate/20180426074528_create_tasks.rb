class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.references :peppers, foreign_key: true
      t.string :name
      t.boolean :status

      t.timestamps
    end
  end
end
