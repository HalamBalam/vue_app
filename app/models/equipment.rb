class Equipment < ApplicationRecord
  has_one :organization

  validates :name, :equipment_type, :serial_number, presence: true
end
