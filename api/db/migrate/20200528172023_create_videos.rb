class CreateVideos < ActiveRecord::Migration[6.0]
  def change
    create_table :videos do |t|
      t.references :category, null: false
      t.string     :title, null: false
      t.text       :description
      t.string     :file, null: false

      t.timestamps
    end
  end
end
