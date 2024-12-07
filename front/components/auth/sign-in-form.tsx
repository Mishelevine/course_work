"use client"

import * as z from "zod"
import axios from "axios"

import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"

import { SignInSchema } from "@/schemas"
import { CardWrapper } from "./card-wrapper"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { useState } from "react"
import { API_URL } from "@/constants"
import LoginPageField from "./login-page-field"

export type LoginFieldName = "login" | "password";

const loginFields = [
    {
        name: "login",
        label: "Логин",
        placeholder: "Ваш логин",
    },
    {
        name: "password",
        label: "Пароль",
        placeholder: "******",
        type: "password"
    }
]

export const SignInForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const router = useRouter();

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            login: "",
            password: ""
        },
    })

    const onSubmit = () => {
        setError("");
        const formValues = document.getElementById("loginForm") as HTMLFormElement;
        axios.defaults.withCredentials = true;

        axios.post(API_URL + "/auth/login", new FormData(formValues))
        .then((data) => {
            //console.log('Authenticated');
            //console.log(data);
            setError("");
            router.push('/')
        })
        .catch((e) => {
            if (e && e.response.status !== 401){
                throw '';
            }
            setError("Неверный логин или пароль");

        })
        .catch((e) => {
            setError("Произошла непредвиденная ошибка");
            //console.log('Unlucky');
            console.log(e)
        })
    }

    return (
        <CardWrapper
            headerLabel="Добро пожаловать!"
            backButtonLabel="Нет аккаунта? Зарегистрируйтесь!"
            backButtonHref="/sign-up"
        >
            <Form {...form}>
                <form id="loginForm"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        {loginFields.map((formItem, index) => {
                            return <LoginPageField
                                key={index}
                                control={form.control}
                                name={formItem.name as LoginFieldName}
                                label={formItem.label}
                                placeholder={formItem.placeholder}
                                type={formItem.type ? formItem.type : undefined}
                            />
                        })}
                    </div>
                    <FormError message={error}/>
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Войти
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
