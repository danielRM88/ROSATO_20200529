class VideoSerializer < ActiveModel::Serializer
  attributes :title, :description

  attribute :category_name do
    object.category_name
  end

  attribute :file_path do
    object.file.url
  end
end
