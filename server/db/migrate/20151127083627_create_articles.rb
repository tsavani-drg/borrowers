class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.belongs_to :friend, index: true
      t.string :description
      t.string :notes
      t.string :state, default: :borrowed

      t.timestamps null: false
    end
  end
end
