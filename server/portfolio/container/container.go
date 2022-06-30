package container

import (
	"context"
	config "portfolio/internal"
	info "portfolio/internal/info/db"
	work "portfolio/internal/work/db"
	postgres "portfolio/postgresql"
)

var cfg = config.GetConfig()
var client, _ = postgres.NewClient(context.TODO(), 3, cfg.Storage)

var InfoRepository = info.NewRepository(client)
var WorkRepository = work.NewRepository(client)
