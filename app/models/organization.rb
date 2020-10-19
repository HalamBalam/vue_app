class Organization < ApplicationRecord
  validates :name, :org_type, :inn, :ogrn, presence: true

  has_and_belongs_to_many :clients
end
