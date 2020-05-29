build:
	docker-compose build

setup-db:
	docker-compose run api rake db:create db:migrate db:seed

up:
	docker-compose up

build-run: build setup-db up

stop:
	docker-compose stop

run: up