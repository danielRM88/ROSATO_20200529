require 'rails_helper'

describe 'Requests for Videos', type: :request do
  let(:category) { create(:category) }
  let(:spec_files_path) { "#{Rails.root}/spec/support/files" }
  let(:spec_output_path) { "#{Rails.root}/spec/support/files/tests" }
  let(:title) { 'example_video' }
  let(:description) { 'example_description' }

  before(:each) do
    FileUtils.remove_dir(spec_output_path) if File.directory?(spec_output_path)
  end

  before(:each) do
    allow_any_instance_of(FileUploader).to receive(:store_dir).and_return(spec_output_path)
  end

  describe 'POST /videos' do
    context 'invalid file type that is not neither .mov or .mp4' do
      it 'returns 422' do
        post videos_path, params: {
          file: Rack::Test::UploadedFile.new("#{spec_files_path}/wrong_file_type.avi", 'video/avi'),
          category_id: category.id,
          title: title,
          description: description
        }

        expect(response).to be_unprocessable
      end
    end

    context 'file size is greater than 200 Mb' do
      it 'returns 422' do
        post videos_path, params: {
          file: Rack::Test::UploadedFile.new("#{spec_files_path}/size_too_big.mp4", 'video/mp4'),
          category_id: category.id,
          title: title,
          description: description
        }

        expect(response).to be_unprocessable
      end
    end

    context 'file is valid' do
      it 'returns 201' do
        post videos_path, params: {
          file: Rack::Test::UploadedFile.new("#{spec_files_path}/mp4_file.mp4", 'video/mp4'),
          category_id: category.id,
          title: title,
          description: description
        }

        expect(response).to be_created
      end

      it 'saves the file to public folder' do
        post videos_path, params: {
          file: Rack::Test::UploadedFile.new("#{spec_files_path}/mov_file.mov", 'video/mov'),
          category_id: category.id,
          title: title,
          description: description
        }

        expect(response).to be_created
        video = Video.last
        upload_path = "#{spec_output_path}/mov_file.mov"
        expect(File.exists?(upload_path)).to be_truthy
      end
    end

    context 'required params' do
      describe 'title not sent' do
        it 'returns 422' do
          post videos_path, params: {
            file: Rack::Test::UploadedFile.new("#{spec_files_path}/wrong_file_type.avi", 'video/avi'),
            category_id: category.id,
            description: description
          }

          expect(response).to be_unprocessable
        end
      end

      describe 'file not sent' do
        it 'returns 422' do
          post videos_path, params: {
            title: title,
            category_id: category.id,
            description: description
          }

          expect(response).to be_unprocessable
        end
      end

      describe 'category not sent' do
        it 'returns 422' do
          post videos_path, params: {
            file: Rack::Test::UploadedFile.new("#{spec_files_path}/wrong_file_type.avi", 'video/avi'),
            title: title,
            category_id: category.id,
            description: description
          }

          expect(response).to be_unprocessable
        end
      end
    end
  end

  describe 'GET /videos' do
    context 'there are videos' do
      before(:each) do
        Video.destroy_all
        create(:video, category: create(:category, name: 'C1'))
      end

      it 'returns a list of videos' do
        get videos_path

        expect(response).to be_ok
        json = JSON.parse(response.body)
        expect(json.count).to eq(1)
        expect(json).to match([{
          'title'=>'Tea Cup',
          'category_name'=>'C1',
          'file_path'=>Video.last.file.url,
          'description'=>'Tea Cup Video with Tag'
        }])
      end
    end

    context 'no videos uploaded' do
      it 'returns empty list' do
        get videos_path

        expect(response).to be_ok
        json = JSON.parse(response.body)
        expect(json.count).to eq(0)
      end
    end
  end
end
