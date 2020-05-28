FactoryBot.define do
  factory :video do
    association :category
    title { 'Tea Cup' }
    description { 'Tea Cup Video with Tag' }
    file { File.open("#{Rails.root}/spec/support/files/mov_file.mov") }
  end
end
