class ArticleSerializer < ActiveModel::Serializer
  #attributes :id, :description, :notes, :state, :friend_id, :created_at
  attributes :id, :created_at, :description, :state, :notes
  embed :ids

  has_one :friend
end
