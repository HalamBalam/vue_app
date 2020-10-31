class Organization < ApplicationRecord
  has_and_belongs_to_many :clients
  has_many :equipments

  validates :name, :org_type, :inn, :ogrn, presence: true

  after_create :broadcast_after_create
  after_update :broadcast_after_update
  after_destroy :broadcast_after_destroy

  scope :paginate, ->(page, rows_per_page) { limit(rows_per_page).offset((page - 1) * rows_per_page) }

  private

  def broadcast_after_create
    ActionCable.server.broadcast('organizations', { created: self })
  end

  def broadcast_after_update
    ActionCable.server.broadcast('organizations', { updated: self })
  end

  def broadcast_after_destroy
    ActionCable.server.broadcast('organizations', { destroyed: self })
  end
end
