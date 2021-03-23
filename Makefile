build:
	cd chirp && $(MAKE) build
	cd backend && $(MAKE) build
	# cd mediaserver && $(MAKE) build
	cd nginx-media && $(MAKE) build

run:
	docker-compose up

stop:
	docker-compose down