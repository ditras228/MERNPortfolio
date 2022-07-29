package container

import (
	"context"
	"portfolio/infrastructure/postgresql"
	config "portfolio/internal"
	desc "portfolio/internal/desc/db"
	info "portfolio/internal/info/db"
	tag "portfolio/internal/tag/db"
	translation "portfolio/internal/translation/db"
	user "portfolio/internal/user/db"
	work "portfolio/internal/work/db"
)

var (
	cfg                 = config.GetConfig()
	client, _           = postgres.NewClient(context.TODO(), 3, cfg.Storage)
	TranslateRepository = translation.NewRepository(client)
	InfoRepository      = info.NewRepository(client, TranslateRepository, DescRepository)
	WorkRepository      = work.NewRepository(client, TranslateRepository)
	UserRepository      = user.NewRepository(client)
	TagRepository       = tag.NewRepository(client)
	DescRepository      = desc.NewRepository(client, TranslateRepository)
)
