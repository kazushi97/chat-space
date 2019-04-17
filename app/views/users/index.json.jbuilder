json.array! @users do |user|
  json.id user.id unless user.id == current_user.id
  json.name user.name unless user.name == current_user.name
end