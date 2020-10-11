class Client < ApplicationRecord
  include Authenticatable

  has_and_belongs_to_many :organizations

  validates :full_name, :phone, presence: true
end
