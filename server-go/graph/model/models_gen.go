// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"fmt"
	"io"
	"strconv"
)

type CreateDescOutput interface {
	IsCreateDescOutput()
}

type DeleteDescOutput interface {
	IsDeleteDescOutput()
}

type DeleteWorkOutput interface {
	IsDeleteWorkOutput()
}

type GetDescOutput interface {
	IsGetDescOutput()
}

type ServiceErrorInterface interface {
	IsServiceErrorInterface()
}

type UpdateDescOutput interface {
	IsUpdateDescOutput()
}

type UpdateWorkOutput interface {
	IsUpdateWorkOutput()
}

type UserOutput interface {
	IsUserOutput()
}

type Contacts struct {
	TelegramTitle string `json:"telegramTitle"`
	TelegramLink  string `json:"telegramLink"`
	GithubTitle   string `json:"githubTitle"`
	GithubLink    string `json:"githubLink"`
}

type CreateDescInput struct {
	Text *UpdateTranslationInput `json:"text"`
	Img  string                  `json:"img"`
}

type CreateWorkInput struct {
	Name        *UpdateTranslationInput `json:"name"`
	Tags        []int                   `json:"tags"`
	Description *UpdateTranslationInput `json:"description"`
	Github      string                  `json:"github"`
	Demo        string                  `json:"demo"`
	Figma       *string                 `json:"figma"`
}

type DeleteDescInput struct {
	ID int `json:"id"`
}

type DeleteDescResult struct {
	ID int `json:"id"`
}

func (DeleteDescResult) IsDeleteDescOutput() {}

type DeleteWorkInput struct {
	ID int `json:"id"`
}

type DeleteWorkResult struct {
	ID int `json:"id"`
}

func (DeleteWorkResult) IsDeleteWorkOutput() {}

type GetDesc struct {
	ID   int              `json:"id"`
	Text *GetTranslations `json:"text"`
	Img  string           `json:"img"`
}

func (GetDesc) IsUpdateDescOutput() {}
func (GetDesc) IsCreateDescOutput() {}

type GetDescResult struct {
	Desc []*GetDesc `json:"desc"`
}

func (GetDescResult) IsGetDescOutput() {}

type GetInfo struct {
	Name       *GetTranslations `json:"name"`
	Img        string           `json:"img"`
	Job        string           `json:"job"`
	Desc       []*GetDesc       `json:"desc"`
	Experience *GetTranslations `json:"experience"`
	Contacts   *Contacts        `json:"contacts"`
}

type GetTag struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
}

type GetTranslations struct {
	Field        string         `json:"field"`
	Translations []*Translation `json:"translations"`
}

type GetWork struct {
	ID          int              `json:"id"`
	Name        *GetTranslations `json:"name"`
	Tags        []*GetTag        `json:"tags"`
	Description *GetTranslations `json:"description"`
	Github      string           `json:"github"`
	Demo        string           `json:"demo"`
	Figma       string           `json:"figma"`
}

func (GetWork) IsUpdateWorkOutput() {}

type GetWorkTag struct {
	ID     int `json:"id"`
	WorkID int `json:"workId"`
	TagID  int `json:"tagId"`
}

type NotFoundError struct {
	Message string `json:"message"`
	ID      int    `json:"id"`
}

func (NotFoundError) IsUpdateWorkOutput()      {}
func (NotFoundError) IsDeleteWorkOutput()      {}
func (NotFoundError) IsServiceErrorInterface() {}
func (NotFoundError) IsUserOutput()            {}
func (NotFoundError) IsDeleteDescOutput()      {}
func (NotFoundError) IsUpdateDescOutput()      {}
func (NotFoundError) IsGetDescOutput()         {}

type Translation struct {
	Locale int    `json:"locale"`
	Field  string `json:"field"`
}

type UpdateDescInput struct {
	ID   int                     `json:"id"`
	Text *UpdateTranslationInput `json:"text"`
	Img  string                  `json:"img"`
}

type UpdateInfoInput struct {
	Img           string                  `json:"img"`
	Name          *UpdateTranslationInput `json:"name"`
	Job           string                  `json:"job"`
	Experience    *UpdateTranslationInput `json:"experience"`
	TelegramTitle string                  `json:"telegramTitle"`
	TelegramLink  string                  `json:"telegramLink"`
	GithubTitle   string                  `json:"githubTitle"`
	GithubLink    string                  `json:"githubLink"`
}

type UpdateTranslationInput struct {
	Translations []*TranslationInput `json:"translations"`
}

type UpdateWorkInput struct {
	ID          int                     `json:"id"`
	Name        *UpdateTranslationInput `json:"name"`
	Tags        []int                   `json:"tags"`
	Description *UpdateTranslationInput `json:"description"`
	Github      string                  `json:"github"`
	Demo        string                  `json:"demo"`
	Figma       *string                 `json:"figma"`
}

type User struct {
	ID          int    `json:"id"`
	Login       string `json:"login"`
	Password    string `json:"password"`
	AccessToken string `json:"accessToken"`
	RoleID      int    `json:"roleId"`
	Role        Role   `json:"role"`
}

func (User) IsUserOutput() {}

type UserInput struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

type WrongPassword struct {
	Message string `json:"message"`
}

func (WrongPassword) IsServiceErrorInterface() {}
func (WrongPassword) IsUserOutput()            {}

type TranslationInput struct {
	Locale int    `json:"locale"`
	Field  string `json:"field"`
}

type Locales string

const (
	LocalesEn Locales = "EN"
	LocalesRu Locales = "RU"
)

var AllLocales = []Locales{
	LocalesEn,
	LocalesRu,
}

func (e Locales) IsValid() bool {
	switch e {
	case LocalesEn, LocalesRu:
		return true
	}
	return false
}

func (e Locales) String() string {
	return string(e)
}

func (e *Locales) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = Locales(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid Locales", str)
	}
	return nil
}

func (e Locales) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type Role string

const (
	RoleAdmin Role = "ADMIN"
	RoleUser  Role = "USER"
)

var AllRole = []Role{
	RoleAdmin,
	RoleUser,
}

func (e Role) IsValid() bool {
	switch e {
	case RoleAdmin, RoleUser:
		return true
	}
	return false
}

func (e Role) String() string {
	return string(e)
}

func (e *Role) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = Role(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid Role", str)
	}
	return nil
}

func (e Role) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type TranslationEntities string

const (
	TranslationEntitiesWork TranslationEntities = "WORK"
	TranslationEntitiesInfo TranslationEntities = "INFO"
)

var AllTranslationEntities = []TranslationEntities{
	TranslationEntitiesWork,
	TranslationEntitiesInfo,
}

func (e TranslationEntities) IsValid() bool {
	switch e {
	case TranslationEntitiesWork, TranslationEntitiesInfo:
		return true
	}
	return false
}

func (e TranslationEntities) String() string {
	return string(e)
}

func (e *TranslationEntities) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = TranslationEntities(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid TranslationEntities", str)
	}
	return nil
}

func (e TranslationEntities) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
