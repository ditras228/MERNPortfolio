package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"portfolio/container"
	"portfolio/graph/generated"
	"portfolio/graph/model"
)

func (r *mutationResolver) UpdateInfo(ctx context.Context, input model.UpdateInfoInput) (*model.GetInfo, error) {
	upd, err := container.InfoRepository.UpdateInfo(ctx, input)
	if err != nil {
		return nil, err
	}
	return &upd, nil
}

func (r *mutationResolver) UpdateWork(ctx context.Context, input model.UpdateWorkInput) (*model.GetWork, error) {
	work, err := container.WorkRepository.UpdateWork(ctx, input)
	if err != nil {
		return nil, err
	}
	return &work, nil
}

func (r *mutationResolver) DeleteWork(ctx context.Context, input model.DeleteWorkInput) (*model.GetWork, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) Auth(ctx context.Context, input model.UserInput) (model.UserOutput, error) {
	user, err := container.UserRepository.Auth(context.TODO(), input)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (r *queryResolver) GetInfo(ctx context.Context) (*model.GetInfo, error) {
	one, err := container.InfoRepository.FindOne(context.TODO())
	if err != nil {
		return nil, nil
	}
	return &one, nil
}

func (r *queryResolver) GetWorks(ctx context.Context) ([]*model.GetWork, error) {
	works, err := container.WorkRepository.FindAll(context.TODO())
	if err != nil {
		return nil, err
	}
	return works, nil
}

func (r *queryResolver) GetTags(ctx context.Context) ([]*model.GetTag, error) {
	tags, err := container.TagRepository.FindAll(ctx)
	if err != nil {
		return nil, err
	}
	return tags, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
