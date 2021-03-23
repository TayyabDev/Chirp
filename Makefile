buildandrun:
	# cd chirp && $(MAKE) build
	# cd backend && $(MAKE) build
	# cd mediaserver && $(MAKE) build
	# # cd nginx-media && $(MAKE) build
	docker-compose up --build

run:
	docker-compose up

stop:
	docker-compose down