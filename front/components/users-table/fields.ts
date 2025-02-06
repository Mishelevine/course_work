export type TextFieldName = "username" | "hashed_password" | "first_name" | "last_name" | "paternity"
export type ComboboxFieldName = "job_id" | "office_id" | "system_role_id"

export type DataArray = {
  id: number
  value: string
}

export const textFields = [
    {
        name: "username",
        label: "Логин",
        placeholder: "Логин добавляемого пользователя",
    },
    {
        name: "hashed_password",
        label: "Пароль",
        placeholder: "Пароль добавляемого пользователя",
    },
    {
        name: "first_name",
        label: "Имя",
        placeholder: "Имя добавляемого пользователя",
    },
    {
        name: "last_name",
        label: "Фамилия",
        placeholder: "Фамилия добавляемого пользователя",
    },
    {
        name: "paternity",
        label: "Отчество",
        placeholder: "Отчество добавляемого пользователя (при наличии)",
    }
]

export const textFieldsForUpdate = [
    {
        name: "username",
        label: "Логин",
        placeholder: "Логин добавляемого пользователя",
    },
    {
        name: "first_name",
        label: "Имя",
        placeholder: "Имя добавляемого пользователя",
    },
    {
        name: "last_name",
        label: "Фамилия",
        placeholder: "Фамилия добавляемого пользователя",
    },
    {
        name: "paternity",
        label: "Отчество",
        placeholder: "Отчество добавляемого пользователя (при наличии)",
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
    },
    {
        name: "system_role_id",
        label: "Роль",
        value_field: "value",
        id_field: "id",
        data: [] as DataArray[],
        frontText: "Выберите роль в системе",
        inputPlaceholder: "Введите название роли...",
        emptyText: "Ролей не найдено"
    }
]
