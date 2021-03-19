build:
	cd backend && $(MAKE) build
	cd chirp && $(MAKE) build
	cd mediaserver && $(MAKE) build

run:
	docker-compose up

stop:
	docker-compose down