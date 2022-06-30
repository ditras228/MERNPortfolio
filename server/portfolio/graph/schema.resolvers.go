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

func (r *mutationResolver) EditInfo(ctx context.Context, input model.EditInfo) (*model.Info, error) {
	one, err := container.InfoRepository.FindOne(context.TODO())
	if err != nil {
		fmt.Println(err)
		return nil, nil
	}
	one = model.Info(input)

	return &one, nil
}

func (r *queryResolver) GetInfo(ctx context.Context) (*model.Info, error) {
	one, err := container.InfoRepository.FindOne(context.TODO())
	if err != nil {
		fmt.Println(err)
		return nil, nil
	}
	fmt.Println(one.Job)
	return &one, nil
}

func (r *queryResolver) GetWorks(ctx context.Context) ([]*model.Work, error) {
	works, err := container.WorkRepository.FindAll(context.TODO())
	if err != nil {
		fmt.Println(err)
		return nil, nil
	}
	return works, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
