"use client"
import * as z from "zod"
import axios from "axios"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"

import { SignUpSchema } from "@/schemas"
import { CardWrapper } from "./card-wrapper"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { useState } from "react"
import { API_URL } from "@/constants"
import RegistrationPageField from "./registration-page-field"

export type RegistrationFieldName = "first_name" | "last_name" | "paternity" | "email" | "post" | "department" | "hashed_password";

const registrationFields = [
    {
        name: "email",
        label: "Электронная почта",
        placeholder: "email@example.com",
        type: "email",
    },
    {
        name: "first_name",
        label: "Имя",
        placeholder: "Ваше имя",
    },
    {
        name: "last_name",
        label: "Фамилия",
        placeholder: "Ваша фамилия",
    },
    {
        name: "paternity",
        label: "Отчество",
        placeholder: "Ваше отчество (при наличии)",
    },
    {
        name: "post",
        label: "Должность",
        placeholder: "Ваша должность",
    },
    {
        name: "department",
        label: "Подразделение",
        placeholder: "Ваше подразделение",
    },
    {
        name: "hashed_password",
        label: "Пароль",
        placeholder: "******",
        type: "password"
    },
]

export const SignUpForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            first_name: "",
            last_name: "",
            paternity: "",
            post: "",
            department: "",
            hashed_password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
        setError("");
        setSuccess("");

        axios.post(API_URL + "/auth/signup", values)
            .then((data) => {
                setError("");
                setSuccess("На указанный адрес электронной почты отправлено письмо для подтверждения регистрации!");
            })
            .catch((e) => {
                const expectedErr = "Email already in use";
                if (e.response.status !== 400 || e.response.data.detail !== expectedErr) {
                    throw e;
                }
                setError("Пользователь с такой почтой уже зарегистрирован!")
                console.log('Error on Authentication')
                console.log(e)
            })
            .catch((e) => {
                const expectedErr = "Only email addresses ending with @edu.hse.ru are allowed";
                if (e.response.status !== 400 || e.response.data.detail !== expectedErr) {
                    throw '';
                }
                setError("Допускаются только почты, оканчивающиеся на @edu.hse.ru")
                console.log('Error on Authentication')
                console.log(e)
            })
    }

    return (
        <CardWrapper
            headerLabel="Присоединяйтесь к нашей системе!"
            backButtonLabel="Уже есть аккаунт? Авторизуйтесь!"
            backButtonHref="/sign-in"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        {registrationFields.map((formItem, index) => {
                            return <RegistrationPageField
                                key={index}
                                control={form.control}
                                name={formItem.name as RegistrationFieldName}
                                label={formItem.label}
                                placeholder={formItem.placeholder}
                                type={formItem.type ? formItem.type : undefined}
                            />
                        })}
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Зарегистрироваться
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
