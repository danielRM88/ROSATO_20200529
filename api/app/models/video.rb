class Video < ApplicationRecord
  mount_uploader :file, FileUploader

  belongs_to :category

  validates :file, presence: true

  delegate :name, to: :category, prefix: true
end
