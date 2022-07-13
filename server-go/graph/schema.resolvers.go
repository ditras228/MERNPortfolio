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

func (r *mutationResolver) UpdateInfo(ctx context.Context, input model.UpdateInfo) (*model.GetInfo, error) {
	one, err := container.InfoRepository.FindOne(context.TODO())
	if err != nil {
		fmt.Println(err)
		return nil, nil
	}
	one = model.GetInfo{
		Name:       input.Name,
		Desc:       input.Desc,
		Experience: input.Experience,
	}

	return &one, nil
}

func (r *mutationResolver) UpdateWork(ctx context.Context, input model.UpdateWork) (*model.GetWork, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) DeleteWork(ctx context.Context, input model.DeleteWork) (*model.GetWork, error) {
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
		fmt.Println(err)
		return nil, nil
	}
	fmt.Println(one.Job)
	return &one, nil
}

func (r *queryResolver) GetWorks(ctx context.Context) ([]*model.GetWork, error) {
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
