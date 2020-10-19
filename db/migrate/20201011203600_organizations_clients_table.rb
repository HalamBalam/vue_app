class OrganizationsClientsTable < ActiveRecord::Migration[6.0]
  def change
    create_join_table :clients, :organizations
  end
end
