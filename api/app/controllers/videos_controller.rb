class VideosController < ApplicationController
  def index
    render json: Video.all, status: :ok
  end

  def create
    video = Video.new(video_params)

    if video.save
      render json: { message: 'video successfully uploaded' }, status: :created
    else
      render json: { errors: video.errors.full_messages }, status: :unprocessable_entity
    end
  end

private
  def video_params
    params.permit(:category_id, :title, :description, :file)
  end
end
