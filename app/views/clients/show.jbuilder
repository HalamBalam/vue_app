json.id @client.id
json.full_name @client.full_name
json.phone @client.phone
json.email @client.email

json.organizations @client.organizations do |organization|
  json.id organization[:id]
  json.name organization[:name]
end
