import { LicenseSchema } from "@/schemas";
import { z } from "zod";

export type TextFieldName = "name" | "short_name" | "program_link" | "version" | "version_date";
export type ComboboxFieldName = "license_id"

export const textFields = [
  {
    name: "name",
    label: "Наименование ПО",
    placeholder: "Название добавляемого ПО",
  },
  {
    name: "short_name",
    label: "Сокращенное наименование ПО",
    placeholder: "Сокращенное название добавляемого ПО",
  },
  {
    name: "program_link",
    label: "Ссылка на программу",
    placeholder: "Ссылка на сайт добавляемого ПО",
  },
  {
    name: "version",
    label: "Версия ПО",
    placeholder: "Версия добавляемого ПО",
  },
  {
    name: "version_date",
    label: "Дата версии",
    placeholder: "Дата в формате DD.MM.YYYY (Пример: 01.01.2020)",
  }
]

export const comboboxFields = [
  {
    name: "license_id",
    label: "Тип лицензии",
    value_field: "license_type",
    id_field: "id",
    data: [] as z.infer<typeof LicenseSchema>[],
    frontText: "Выберите тип лицензии",
    inputPlaceholder: "Введите название...",
    emptyText: "Лицензий не найдено."
  }
]
