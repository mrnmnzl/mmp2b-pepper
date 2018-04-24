class AddUserToPepper < ActiveRecord::Migration[5.1]
  def change
    add_reference :peppers, :user, foreign_key: true
  end
end
