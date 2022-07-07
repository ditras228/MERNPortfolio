package model

type GetInfoModel struct {
	Name       string         `json:"name"`
	Job        string         `json:"job"`
	Desc       string         `json:"desc"`
	Experience string         `json:"experience"`
	Contacts   *ContactsModel `json:"contacts"`
}

type ContactsModel struct {
	Telegram string `json:"telegram"`
	Github   string `json:"github"`
}
