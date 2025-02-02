export type TextFieldName = "contract_number" | "contract_date"

export const textFields = [
  {
    name: "contract_number",
    label: "Номер договора",
    placeholder: "Номер добавляемого договора",
  },
  {
    name: "contract_date",
    label: "Дата договора",
    placeholder: "Дата в формате DD.MM.YYYY (Пример: 01.01.2020)",
  },
]
