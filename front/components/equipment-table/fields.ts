import { TypeSchema } from "@/schemas";
import { z } from "zod";

export type TextFieldName = "model" | "serial_number" | "inventory_number" | "network_name" | "remarks";
export type ComboboxFieldName = "type_id"

export const textFields = [
  {
    name: "model",
    label: "Модель оборудования",
    placeholder: "Модель добавляемого оборудования",
  },
  {
    name: "serial_number",
    label: "Серийный номер",
    placeholder: "Серийный номер добавляемого оборудования",
  },
  {
    name: "inventory_number",
    label: "Инвентарный номер",
    placeholder: "Инвентарный номер добавляемого оборудования",
  },
  {
    name: "network_name",
    label: "Сетевое имя",
    placeholder: "Сетевое моя добавляемого оборудования",
  },
  {
    name: "remarks",
    label: "Примечание",
    placeholder: "Примечание к добавляемому оборудованию",
  }
]

export const comboboxFields = [
  {
    name: "type_id",
    label: "Тип оборудования",
    value_field: "type_name",
    id_field: "id",
    data: [] as z.infer<typeof TypeSchema>[],
    frontText: "Выберите тип оборудования",
    inputPlaceholder: "Введите название...",
    emptyText: "Типов не найдено"
  }
]
