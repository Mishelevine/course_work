export type TextFieldName = "doc_number" | "audience_id"
export type ComboboxFieldName = "status_type_id" | "responsible_user_id" | "building_id"

export type DataArray = {
  id: number
  value: string
}

export const textFields = [
  {
    name: "doc_number",
    label: "Номер документа",
    placeholder: "Номер документа для статуса",
  },
  {
    name: "audience_id",
    label: "Номер аудитории",
    placeholder: "Номер аудитории для статуса",
  }
]

export const comboboxFields = [
    {
      name: "status_type_id",
      label: "Статус",
      value_field: "value",
      id_field: "id",
      data: [] as DataArray[],
      frontText: "Выберите статус",
      inputPlaceholder: "Введите название...",
      emptyText: "Статусов не найдено"
    },
    {
      name: "responsible_user_id",
      label: "Ответственный",
      value_field: "value",
      id_field: "id",
      data: [] as DataArray[],
      frontText: "Выберите ответственного",
      inputPlaceholder: "Введите имя, должность или подразделение...",
      emptyText: "Ответственных не найдено"
    },
    {
      name: "building_id",
      label: "Адрес учебного корпуса",
      value_field: "value",
      id_field: "id",
      data: [] as DataArray[],
      frontText: "Выберите адрес учебного корпуса",
      inputPlaceholder: "Введите адрес...",
      emptyText: "Адрес не найден"
    }
]
