.PHONY: dev
dev:
	$(call _info, "\nНакатывание миграций");
	migrate -database postgresql://postgres:secret@localhost:5432/stage?sslmode=disable -path ./schema/ up
	$(call _info, "\nСтарт сервера");
	go run server.go

drop:
	$(call _warning, "\nДроп миграций");
	migrate -database postgresql://postgres:secret@localhost:5432/stage?sslmode=disable -path ./schema/ drop

gen:
	$(call _info, "\nГенерация GraphQL типов");
	go run github.com/99designs/gqlgen generate.

define _info
	$(call _echoColor, $1, 6)
endef

define _warning
	$(call _echoColor, $1, 1)
endef

define _echoColor
	@tput setaf $2
	@echo $1
	@tput sgr0
endef

