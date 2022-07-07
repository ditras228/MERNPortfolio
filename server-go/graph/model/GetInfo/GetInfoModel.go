package modeld

type GetInfoModel struct {
	Name       string `json:"name"`
	Job        string `json:"job"`
	Desc       string `json:"desc"`
	Experience string `json:"experience"`
	Telegram   string `json:"telegram"`
	Github     string `json:"github"`
}
