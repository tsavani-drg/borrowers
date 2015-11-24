class CreateFriends < ActiveRecord::Migration
  def change
    create_table :friends do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :twitter
      t.integer :total_articles

      t.timestamps null: false
    end
  end
end
