class Video < ApplicationRecord
  mount_uploader :file, FileAvatar
end
