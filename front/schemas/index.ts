import * as z from "zod";

export const SignInSchema = z.object({
    username: z.string().min(1, {
        message: "Пожалуйста, введите ваш логин"
    }),
    password: z.string().min(1, {
        message: "Пожалуйста, введите пароль"
    })
})

export const SignUpSchema = z.object({
    first_name: z.string().min(1, {
        message: "Пожалуйста, введите ваше имя"
    }).max(50, {
        message: "Имя не может содержать более 50 символов"
    }),
    last_name: z.string().min(1, {
        message: "Пожалуйста, введите вашу фамилию"
    }).max(50, {
        message: "Фамилия не может содержать более 50 символов"
    }),
    paternity: z.string().max(50, {
        message: "Отчество не может содержать более 50 символов"
    }),
    username: z.string().min(1, {
        message: "Пожалуйста, введите ваш логин"
    }),
    post: z.string().min(1, {
        message: "Пожалуйста, введите вашу должность"
    }),
    department: z.string().min(1, {
        message: "Пожалуйста, введите ваше отделение"
    }),
    hashed_password: z.string().min(6, {
        message: "Минимальная длина пароля: 6 символов"
    }),
})

export const CreateEventSchema = z.object({
    event_name: z.string().min(1, {
        message: "Пожалуйста, введите название мероприятия"
    }).max(50, {
        message: "Длина названия не должна превышать 50 символов"
    }),
    event_description: z.string().min(1, {
        message: "Пожалуйста, введите описание мероприятия"
    }).max(2000, {
        message: "Длина описания не может превышать 2000 символов"
    }),
    starting_date: z
        .string()
        .regex(new RegExp('(^(31)[.](0[13578]|1[02])[.]((18|19|20)[0-9]{2})$)|(^(29|30)[.](01|0[3-9]|1[1-2])[.]((18|19|20)[0-9]{2})$)|(^(0[1-9]|1[0-9]|2[0-8])[.](0[1-9]|1[0-2])[.]((18|19|20)[0-9]{2})$)|(^(29)[.](02)[.](((18|19|20)(04|08|[2468][048]|[13579][26]))|2000)$)'), 'Введена некорректная дата'),
    starting_time: z
        .string()
        .regex(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'), 'Введено некорректное время'),
    ending_date: z
        .string()
        .regex(new RegExp('(^(31)[.](0[13578]|1[02])[.]((18|19|20)[0-9]{2})$)|(^(29|30)[.](01|0[3-9]|1[1-2])[.]((18|19|20)[0-9]{2})$)|(^(0[1-9]|1[0-9]|2[0-8])[.](0[1-9]|1[0-2])[.]((18|19|20)[0-9]{2})$)|(^(29)[.](02)[.](((18|19|20)(04|08|[2468][048]|[13579][26]))|2000)$)'), 'Введена некорректная дата'),
    ending_time: z
        .string()
        .regex(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'), 'Введено некорректное время'),
    location: z.string().min(1, {
        message: "Пожалуйста, введите место проведения мероприятия"
    }).max(50, {
        message: "Место проведения мероприятия не может содержать более 50 символов"
    }),
    avatar: z.any(),
    isStudentOnly: z.boolean(),
    organisation_id: z.optional(z.number())
})

export const LicenseSchema = z.object({
    license_type: z.string(),
    id: z.number(),
})

export const ContractSchema = z.object({
    contract_number: z.string(),
    contract_date: z.string(),
    id: z.number(),
    selected: z.boolean()
})

export const ContractSchemaFromBack = z.object({
    contract_number: z.string(),
    contract_date: z.string(),
    id: z.number(),
})

export const SoftwareTableSchema = z.object({
    name: z.string(),
    short_name: z.string(),
    program_link: z.string(),
    version: z.string(),
    version_date: z.string(),
    license_type: z.string(),
    contracts: z.array(ContractSchema),
    id: z.number()
})

export const SoftwareSchema = z.object({
    name: z.string().min(1, {
        message: "Пожалуйста, введите название ПО"
    }),
    short_name: z.string().min(1, {
        message: "Пожалуйста, введите сокращенное название ПО"
    }),
    program_link: z.string().min(1, {
        message: "Пожалуйста, вставьте ссылку на сайт ПО"
    }),
    version: z.string().min(1, {
        message: "Пожалуйста, введите версию ПО"
    }),
    version_date: z.string().regex(
        new RegExp('(^(31)[.](0[13578]|1[02])[.]((18|19|20)[0-9]{2})$)|(^(29|30)[.](01|0[3-9]|1[1-2])[.]((18|19|20)[0-9]{2})$)|(^(0[1-9]|1[0-9]|2[0-8])[.](0[1-9]|1[0-2])[.]((18|19|20)[0-9]{2})$)|(^(29)[.](02)[.](((18|19|20)(04|08|[2468][048]|[13579][26]))|2000)$)'),
        'Некорректный формат даты'
    ),
    license_id: z.number().min(1, {
        message: "Пожалуйста, выберите лицензию"
    }),
    contracts: z.any()
})

export const UserLogSchema = z.object({
    event_type: z.string(),
    time: z.string(),
    user_name: z.string(),
    user_role: z.string()
})

export const ContractFormSchema = z.object({
    contract_number: z.string().min(1, {
        message: "Пожалуйста, введите номер договора"
    }),
    contract_date: z.string().regex(
        new RegExp('(^(31)[.](0[13578]|1[02])[.]((18|19|20)[0-9]{2})$)|(^(29|30)[.](01|0[3-9]|1[1-2])[.]((18|19|20)[0-9]{2})$)|(^(0[1-9]|1[0-9]|2[0-8])[.](0[1-9]|1[0-2])[.]((18|19|20)[0-9]{2})$)|(^(29)[.](02)[.](((18|19|20)(04|08|[2468][048]|[13579][26]))|2000)$)'),
        'Некорректный формат даты'
    )
})

export const LicenseFormSchema = z.object({
    license_type: z.string().min(1, {
        message: "Пожалуйста, введите тип лицензии"
    }),
})

export const EquipmentSchema = z.object({
    type_name: z.string(),
    type_id: z.number(),
    model: z.string(),
    serial_number: z.string(),
    inventory_number: z.string(),
    network_name: z.string(),
    remarks: z.string(),
    id: z.number(),
    responsible_user_full_name: z.string() // фио ответстветственного лица
})

export const EquipmentFormSchema = z.object({
    type_id: z.number().min(1, {
        message: "Пожалуйста, выберите тип"
    }),
    model: z.string().min(1, {
        message: "Пожалуйста, введите модель"
    }),
    serial_number: z.string().min(1, {
        message: "Пожалуйста, введите серийный номер"
    }),
    inventory_number: z.string().min(1, {
        message: "Пожалуйста, введите инвентарный номер"
    }),
    network_name: z.string().min(1, {
        message: "Пожалуйста, введите сокращенное сетевое имя"
    }),
    remarks: z.string(),
})

export const TypeSchema = z.object({
    type_name: z.string(),
    id: z.number()
})

export const EquipmentSpecsSchema = z.object({
    screen_resolution: z.string(),
    processor_type: z.string(),
    ram_size: z.string(),
    gpu_info: z.string(),
    storage: z.string(),
    id: z.number()
})

export const EquipmentSpecsFormSchema = z.object({
    screen_resolution: z.string().min(1, {
        message: "Пожалуйста, введите разрешение экрана"
    }),
    processor_type: z.string().min(1, {
        message: "Пожалуйста, введите тип процессора"
    }),
    ram_size: z.string().min(1, {
        message: "Пожалуйста, введите размер оперативной памяти"
    }),
    gpu_info: z.string().min(1, {
        message: "Пожалуйста, введите характеристики ГП"
    }),
    storage: z.string().min(1, {
        message: "Пожалуйста, введите тип и объём диска"
    }),
    equipment_id: z.number()
})

export const EquipmentStatusFormSchema = z.object({
    equipment_id: z.number(),
    status_type_id: z.number().min(1, {
        message: "Пожалуйста, выберите статус"
    }),
    doc_number: z.string().min(1, {
        message: "Пожалуйста, введите номер документа"
    }),
    status_change_date: z.string(),
    responsible_user_id: z.number().min(1, {
        message: "Пожалуйста, выберите ответственного"
    }),
    building_id: z.number().min(1, {
        message: "Пожалуйста, выберите адрес"
    }),
    audience_id: z.string().min(1, {
        message: "Пожалуйста, введите номер аудитории"
    }),
})

export const EquipmentStatusSchema = z.object({
    equipment_id: z.number(),
    status_type_id: z.number(),
    doc_number: z.string(),
    status_change_date: z.string(),
    responsible_user_id: z.number(),
    building_id: z.number(),
    audience_id: z.string(),
    id: z.number()
})

export const StatusSchema = z.object({
    status_type_name: z.string(),
    id: z.number()
})

export const ResponsibleUserSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    paternity: z.string(),
    job_id: z.number(),
    office_id: z.number(),
    id: z.number()
})

export const ResponsibleUserJobSchema = z.object({
    job_name: z.string(),
    id: z.number()
})

export const ResponsibleUserOfficeSchema = z.object({
    office_name: z.string(),
    id: z.number()
})

export const BuildingSchema = z.object({
    building_address: z.string(),
    id: z.number()
})

export const ResponsibleUserForComboboxSchema = z.object({
    full_info: z.string(),
    id: z.number()
})

export const EquipmentStatusTableSchema = z.object({
    status_type_name: z.string(),
    doc_number: z.string(),
    status_change_date: z.string(),
    responsible_user_fio: z.string(),
    responsible_user_job_name: z.string(),
    responsible_user_office_name: z.string(),
    building_address: z.string(),
    audience_id: z.string(),
    id: z.number(),
    equipment_id: z.number(),
})
