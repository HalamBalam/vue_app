class Organization < ApplicationRecord
  has_and_belongs_to_many :clients
  has_many :equipments

  validates :name, :org_type, :inn, :ogrn, presence: true
end
