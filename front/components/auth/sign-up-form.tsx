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

export type RegistrationFieldName = "first_name" | "last_name" | "paternity" | "username" | "post" | "department" | "hashed_password";

const registrationFields = [
    {
        name: "username",
        label: "Логин",
        placeholder: "Ваш логин",
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
            username: "",
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
                setSuccess("Пользователь зарегистрирован!");
            })
            .catch((e) => {
                const expectedErr = "Login already in use";
                if (e.response.status !== 400 || e.response.data.detail !== expectedErr) {
                    throw e;
                }
                setError("Пользователь с таким логином уже зарегистрирован!")
                console.log('Error on Authentication')
                console.log(e)
            })
            .catch((e) => {
                setError("Произошла непредвиденная ошибка.")
            })
    }

    return (
        <CardWrapper
            headerLabel="Добавьте нового пользователя!"
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
