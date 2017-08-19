SITE_NAME = raghuvirkasturi.com
SSH_HOST = rk-one
BUILD_DIR = ./public
TAG = $(shell node -p "require('./package.json').version")
NAME = $(shell node -p "require('./package.json').name")

.PHONY : build clean deploy

build: clean
		@echo '--> Building artifact.'
		yarn install
		yarn build

clean:
		@echo '--> Cleaning up.'
		rm -rf $(BUILD_DIR)

deploy: build
		@echo '--> Cleaning up remote directory.'
		ssh $(SSH_HOST) 'rm -rf /var/www/$(SITE_NAME)/*;'
		@echo '--> Creating build $(NAME)-$(TAG).tar.gz.'
		tar -czf $(NAME)-$(TAG).tar.gz -C $(BUILD_DIR) .
		@echo '--> Copying $(NAME)-$(TAG).tar.gz to remote.'
		scp ./$(NAME)-$(TAG).tar.gz $(SSH_HOST):/var/www/$(SITE_NAME)
		@echo '--> Extracting and cleaning up.'
		ssh $(SSH_HOST) 'cd /var/www/$(SITE_NAME); tar -xzf $(NAME)-$(TAG).tar.gz; rm -rf $(NAME)-$(TAG).tar.gz;'
		rm -rf ./$(NAME)-$(TAG).tar.gz
