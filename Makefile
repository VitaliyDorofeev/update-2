build:
	docker build -t pooling-pallet-return .

start:
	docker run --rm --name pooling-pallet-return -p 4202:80 pooling-pallet-return