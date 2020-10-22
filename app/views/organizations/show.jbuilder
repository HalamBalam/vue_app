json.id @organization.id
json.name @organization.name
json.org_type @organization.org_type
json.inn @organization.inn
json.ogrn @organization.ogrn

json.clients @organization.clients do |client|
  json.id client[:id]
  json.full_name client[:full_name]
end

json.equipments @organization.equipments do |equipment|
  json.id equipment[:id]
  json.name equipment[:name]
end
