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

export const SoftwareTableSchema = z.object({
    name: z.string(),
    short_name: z.string(),
    program_link: z.string(),
    version: z.string(),
    version_date: z.string(),
    license_type: z.string(),
    contract_number: z.string(),
    contract_date: z.string(),
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
        message: "Пожалуйста, выберите лицензию."
    }),
    contract_id: z.number().min(1, {
        message: "Пожалуйста, выберите договор."
    }),
})

export const UserLogSchema = z.object({
    event_type: z.string(),
    time: z.string(),
    user_id: z.number(),
    user_role: z.number()
})
