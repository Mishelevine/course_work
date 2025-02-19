export type TextFieldName = "first_name" | "last_name" | "paternity"
export type ComboboxFieldName = "job_id" | "office_id"

export type DataArray = {
  id: number
  value: string
}

export const textFields = [
  {
    name: "first_name",
    label: "Имя ответственного лица",
    placeholder: "Имя добавляемого ответственного лица",
  },
  {
    name: "last_name",
    label: "Фамилия ответственного лица",
    placeholder: "Фамилия добавляемого ответственного лица",
  },
  {
    name: "paternity",
    label: "Отчество ответственного лица",
    placeholder: "Отчество добавляемого ответственного лица (при наличии)",
  }
]

export const comboboxFields = [
  {
    name: "job_id",
    label: "Должность",
    value_field: "value",
    id_field: "id",
    data: [] as DataArray[],
    frontText: "Выберите должность",
    inputPlaceholder: "Введите название...",
    emptyText: "Должностей не найдено"
  },
  {
    name: "office_id",
    label: "Подразделение",
    value_field: "value",
    id_field: "id",
    data: [] as DataArray[],
    frontText: "Выберите подразделение",
    inputPlaceholder: "Введите название...",
    emptyText: "Подразделений не найдено"
  }
]
