json.array! @items do |item|
  json.id item[:id]
  json.firstname item[:firstname]
  json.lastname item[:lastname]
  json.type item[:type]
end
