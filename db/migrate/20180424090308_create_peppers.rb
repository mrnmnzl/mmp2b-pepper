class CreatePeppers < ActiveRecord::Migration[5.1]
  def change
    create_table :peppers do |t|
      t.string :name
      t.string :units
      t.integer :goal
      t.date :deadline
      t.boolean :done
      t.integer :currVal
      t.string :type
      t.boolean :positive
      t.timestamps
    end
  end
end
