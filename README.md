# Video Uploader

## Build the project

Open a terminal and go to the root folder of the project.

Once there, run the following command:

`make build-run`

It should build all the containers and start both the api and the frontend applications.

Afterwards, open your favorite browser and go to

`localhost:3005`

## Design choices

The api was built using Rails 6.0.3 and ruby 2.7.1.

The frontend was built using React.js and create-react-app library.

For the video upload feature, a gem called carrierwave was used due to the
advantages that it adds to the project. It makes it easier to store and retrieve
videos and create thumbnails for them. It makes the code cleaner.

The public folder of the api was chosen as the storage location for the uploaded videos.
In a production application it would be better to store the files in a more scalable
destination such as an AWS S3 or GCP storage bucket. For this purpose it would be
relatively simple to adjust the application to use these options, just by changing
the method `store_dir` inside the FileUploader class to point to the storage bucket
would be enough.

The gem active model serializers was used to specify how models should be
translated to json. Makes the code cleaner and easier to maintain to have the
serialization specification and the model functionality separate.

## Further Improvements

Pagination should be added to the `GET /videos` endpoint.
