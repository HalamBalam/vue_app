class CreateEquipment < ActiveRecord::Migration[6.0]
  def change
    create_table :equipment do |t|
      t.string :name, null: false
      t.string :equipment_type, null: false
      t.string :serial_number, null: false
      t.belongs_to :organization

      t.timestamps
    end
  end
end
