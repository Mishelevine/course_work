export type TextFieldName = "screen_resolution" | "processor_type" | "ram_size" | "gpu_info" | "storage"

export const textFields = [
  {
    name: "screen_resolution",
    label: "Разрешение экрана",
    placeholder: "Введите разрешение экрана (например: 1366х768)",
  },
  {
    name: "processor_type",
    label: "Тип процессора",
    placeholder: "Введите тип процессора (например: Intel Core 2 Duo 2.2 ГГц)",
  },
  {
    name: "ram_size",
    label: "Объём оперативной памяти",
    placeholder: "Введите объём оперативной памяти (например: RAM 3 ГБ)",
  },
  {
    name: "gpu_info",
    label: "Характеристики ГП",
    placeholder: "Введите характеристики ГП (например: ATI Mobility Radeon HD 4570)",
  },
  {
    name: "storage",
    label: "Тип и объём диска",
    placeholder: "Введите тип и объём диска (например: HDD 250 ГБ)",
  }
]
