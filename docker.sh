#!/bin/bash

# Auto-detect branch and use appropriate docker compose file

BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")
COMPOSE_FILE="docker-compose.yml"

if [ "$BRANCH" = "dev" ]; then
  COMPOSE_FILE="docker-compose.dev.yml"
  echo "🔵 Branch: dev → using docker-compose.dev.yml"
elif [ "$BRANCH" = "main" ]; then
  COMPOSE_FILE="docker-compose.yml"
  echo "🟢 Branch: main → using docker-compose.yml"
else
  echo "⚪ Branch: $BRANCH → using docker-compose.yml (default)"
fi

COMMAND=$1
shift

case "$COMMAND" in
  up)
    docker compose -f $COMPOSE_FILE up "$@"
    ;;
  down)
    docker compose -f $COMPOSE_FILE down "$@"
    ;;
  build)
    docker compose -f $COMPOSE_FILE build "$@"
    ;;
  logs)
    docker compose -f $COMPOSE_FILE logs "$@"
    ;;
  ps|status)
    docker compose -f $COMPOSE_FILE ps
    ;;
  restart)
    docker compose -f $COMPOSE_FILE restart "$@"
    ;;
  exec|shell)
    docker compose -f $COMPOSE_FILE exec web sh
    ;;
  *)
    echo "Usage: bash docker.sh {up|down|build|logs|ps|restart|shell} [options]"
    echo ""
    echo "Examples:"
    echo "  bash docker.sh up -d        # Start in detached mode"
    echo "  bash docker.sh down         # Stop containers"
    echo "  bash docker.sh build        # Build images"
    echo "  bash docker.sh logs -f      # Follow logs"
    echo "  bash docker.sh shell        # Enter container shell"
    exit 1
    ;;
esac
