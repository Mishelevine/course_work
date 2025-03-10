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
    program_link: z.string(),
    version: z.string(),
    version_date: z.string().regex(
        new RegExp('^$|(^(31)[.](0[13578]|1[02])[.]((18|19|20)[0-9]{2})$)|(^(29|30)[.](01|0[3-9]|1[1-2])[.]((18|19|20)[0-9]{2})$)|(^(0[1-9]|1[0-9]|2[0-8])[.](0[1-9]|1[0-2])[.]((18|19|20)[0-9]{2})$)|(^(29)[.](02)[.](((18|19|20)(04|08|[2468][048]|[13579][26]))|2000)$)'),
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
    username: z.string(),
    role_name: z.string()
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
    responsible_user_full_name: z.string(),
    last_status_type: z.string(),
    building_adress: z.string(), // FIXME МИША ПЕРЕИМЕНУЙ ПОЛЕ (((
    accepted_date: z.string()
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
    }).regex(
        new RegExp('^[0-9]+$'),
        "Некорректный формат инвентарного номера"
    ),
    accepted_date: z.string().regex(
        new RegExp('(^(31)[.](0[13578]|1[02])[.]((18|19|20)[0-9]{2})$)|(^(29|30)[.](01|0[3-9]|1[1-2])[.]((18|19|20)[0-9]{2})$)|(^(0[1-9]|1[0-9]|2[0-8])[.](0[1-9]|1[0-2])[.]((18|19|20)[0-9]{2})$)|(^(29)[.](02)[.](((18|19|20)(04|08|[2468][048]|[13579][26]))|2000)$)'),
        'Некорректный формат даты'
    ),
    network_name: z.string(),
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
    screen_resolution: z.string(),
    processor_type: z.string(),
    ram_size: z.string(),
    gpu_info: z.string(),
    storage: z.string(),
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
    status_type_color: z.string(),
    id: z.number()
})

export const ResponsibleUserSchema = z.object({
    full_name: z.string(),
    job_name: z.string(),
    office_name: z.string(),
    id: z.number()
})

export const SingleResponsibleUserSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    paternity: z.string(),
    job_id: z.number(),
    office_id: z.number(),
    id: z.number()
})

export const SingleResponsibleUserFormSchema = z.object({
    first_name: z.string().min(1, {
        message: "Пожалуйста, введите имя"
    }),
    last_name: z.string().min(1, {
        message: "Пожалуйста, введите фамилию"
    }),
    paternity: z.string(),
    job_id: z.number().min(1, {
        message: "Пожалуйста, выберите должность"
    }),
    office_id: z.number().min(1, {
        message: "Пожалуйста, выберите подразделение"
    })
})

export const ResponsibleUserForComboboxSchema = z.object({
    full_info: z.string(),
    id: z.number()
})

export const EquipmentStatusTableSchema = z.object({
    status_type_name: z.string(),
    status_type_color: z.string(),
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

export const UserSchemaForTable = z.object({
    full_name: z.string(),
    username: z.string(),
    job_name: z.string(),
    office_name: z.string(),
    role_name: z.string(),
    id: z.number()
})

export const UserJobSchema = z.object({
    job_name: z.string(),
    id: z.number()
})

export const UserJobFormSchema = z.object({
    job_name: z.string().min(1, {
        message: "Пожалуйста, введите должность"
    })
})

export const UserOfficeSchema = z.object({
    office_name: z.string(),
    id: z.number()
})

export const UserOfficeFormSchema = z.object({
    office_name: z.string().min(1, {
        message: "Пожалуйста, введите подразделение"
    })
})

export const BuildingSchema = z.object({
    building_address: z.string(),
    id: z.number()
})

export const BuildingFormSchema = z.object({
    building_address: z.string().min(1, {
        message: "Пожалуйста, введите адрес"
    })
})

export const EquipmentStatusTypeSchema = z.object({
    status_type_name: z.string(),
    status_type_color: z.string(),
    id: z.number()
})

export const EquipmentStatusTypeFormSchema = z.object({
    status_type_name: z.string().min(1, {
        message: "Пожалуйста, введите наименование статуса"
    }),
    status_type_color: z.string().regex(
        new RegExp("^#([A-Fa-f0-9]{6})$"),
        "Некорректный формат ввода цвета"
    )
})

export const EquipmentTypeSchema = z.object({
    type_name: z.string(),
    id: z.number()
})

export const EquipmentTypeFormSchema = z.object({
    type_name: z.string().min(1, {
        message: "Пожалуйста, введите тип оборудования"
    }),
})

export const ResponsibleUserJobSchema = z.object({
    job_name: z.string(),
    id: z.number()
})

export const ResponsibleUserJobFormSchema = z.object({
    job_name: z.string().min(1, {
        message: "Пожалуйста, введите должность ответственного лица"
    }),
})

export const ResponsibleUserOfficeSchema = z.object({
    office_name: z.string(),
    id: z.number()
})

export const ResponsibleUserOfficeFormSchema = z.object({
    office_name: z.string().min(1, {
        message: "Пожалуйста, введите подразделение ответственного лица"
    }),
})

export const CreateUserFormSchema = z.object({
    username: z.string().min(1, {
        message: "Пожалуйста, введите логин"
    }),
    hashed_password: z.string().min(1, {
        message: "Пожалуйста, введите пароль"
    }),
    first_name: z.string().min(1, {
        message: "Пожалуйста, введите имя"
    }),
    last_name: z.string().min(1, {
        message: "Пожалуйста, введите фамилию"
    }),
    paternity: z.string(),
    job_id: z.number().min(1, {
        message: "Пожалуйста, выберите должность"
    }),
    office_id: z.number().min(1, {
        message: "Пожалуйста, выберите подразделение"
    }),
    system_role_id: z.number().min(1, {
        message: "Пожалуйста, выберите роль в системе"
    })
})

export const UpdateUserFormSchema = z.object({
    username: z.string().min(1, {
        message: "Пожалуйста, введите логин"
    }),
    first_name: z.string().min(1, {
        message: "Пожалуйста, введите имя"
    }),
    last_name: z.string().min(1, {
        message: "Пожалуйста, введите фамилию"
    }),
    paternity: z.string(),
    job_id: z.number().min(1, {
        message: "Пожалуйста, выберите должность"
    }),
    office_id: z.number().min(1, {
        message: "Пожалуйста, выберите подразделение"
    }),
    system_role_id: z.number().min(1, {
        message: "Пожалуйста, выберите роль в системе"
    }),
    id: z.number()
})

export const UpdateUserPasswordSchema = z.object({
    user_id: z.number(),
    new_password: z.string().min(1, {
        message: "Пожалуйста, введите пароль"
    })
})

export const UserRoleSchema = z.object({
    role_name: z.string(),
    id: z.number()
})

export const FileUploadSchema = z.object({
    file: z.any(),
})
