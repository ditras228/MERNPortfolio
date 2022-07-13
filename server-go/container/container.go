package container

import (
	"context"
	"portfolio/infrastructure/postgresql"
	config "portfolio/internal"
	info "portfolio/internal/info/db"
	user "portfolio/internal/user/db"
	work "portfolio/internal/work/db"
)

var cfg = config.GetConfig()
var client, _ = postgres.NewClient(context.TODO(), 3, cfg.Storage)

var InfoRepository = info.NewRepository(client)
var WorkRepository = work.NewRepository(client)
var UserRepository = user.NewRepository(client)
