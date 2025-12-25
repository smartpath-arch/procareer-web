.PHONY: help build up down logs restart clean dev-up dev-down prod-up prod-down auto-up auto-down

help:
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

auto-up: ## Auto-detect branch and start containers
	@bash docker.sh up -d --build

auto-down: ## Auto-detect branch and stop containers
	@bash docker.sh down

auto-logs: ## Auto-detect branch and view logs
	@bash docker.sh logs -f

auto-shell: ## Auto-detect branch and enter shell
	@bash docker.sh shell

build: ## Build production image
	docker compose build

up: ## Start production containers
	docker compose up -d

down: ## Stop production containers
	docker compose down

logs: ## View production logs
	docker compose logs -f

restart: ## Restart production containers
	docker compose restart

prod-up: ## Build and start production
	docker compose up -d --build

prod-down: ## Stop and remove production containers
	docker compose down -v

dev-up: ## Start development containers
	docker compose -f docker-compose.dev.yml up -d

dev-up-fg: ## Start development containers (foreground)
	docker compose -f docker-compose.dev.yml up

dev-down: ## Stop development containers
	docker compose -f docker-compose.dev.yml down

dev-logs: ## View development logs
	docker compose -f docker-compose.dev.yml logs -f

dev-restart: ## Restart development containers
	docker compose -f docker-compose.dev.yml restart

clean: ## Remove all containers, images, and volumes
	docker compose down -v --rmi all

prune: ## Remove unused Docker resources
	docker system prune -af --volumes

shell: ## Enter production container shell
	docker compose exec web sh

dev-shell: ## Enter development container shell
	docker compose -f docker-compose.dev.yml exec web sh

status: ## View container status
	docker compose ps

inspect: ## Show container details
	docker compose exec web node -v && docker compose exec web pnpm -v
