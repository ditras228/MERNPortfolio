package container

import (
	"context"
	"portfolio/infrastructure/postgresql"
	config "portfolio/internal"
	desc "portfolio/internal/desc/db"
	info "portfolio/internal/info/db"
	tag "portfolio/internal/tag/db"
	user "portfolio/internal/user/db"
	work "portfolio/internal/work/db"
)

var cfg = config.GetConfig()
var client, _ = postgres.NewClient(context.TODO(), 3, cfg.Storage)

var InfoRepository = info.NewRepository(client)
var WorkRepository = work.NewRepository(client)
var UserRepository = user.NewRepository(client)
var TagRepository = tag.NewRepository(client)
var DescRepository = desc.NewRepository(client)
