"use client"

import * as z from "zod"
import axios from "axios"

import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"

import { SignInSchema } from "@/schemas"
import { CardWrapper } from "../card-wrapper"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { useState } from "react"
import { API_URL } from "@/constants"
import LoginPageField from "./login-page-field"
import { LoadingSpinner } from "../loading-spinner";

type UserInfo = {
    username: string,
    password: string
}

export type LoginFieldName = "username" | "password";

const loginFields = [
    {
        name: "username",
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
    const [isProcessing, setIsProcessing] = useState<boolean>(false)

    const router = useRouter();

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    const onSubmit = (data: UserInfo) => {
        setError("");
        setIsProcessing(true)
        const formValues = new FormData();
        formValues.append("username", data.username)
        formValues.append("password", data.password)
        axios.defaults.withCredentials = true;

        axios.post(API_URL + "/auth/login", formValues)
        .then((data) => {
            setError("");
            router.push('/software')
        })
        .catch((e) => {
            if (e && e.response.status !== 401){
                throw '';
            }
            setError("Неверный логин или пароль");
            setIsProcessing(false)
        })
        .catch((e) => {
            setError("Произошла непредвиденная ошибка");
            console.log(e)
            setIsProcessing(false)
        })
    }

    return (
        <CardWrapper
            headerLabel="Добро пожаловать!"
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
                        disabled={isProcessing}
                        type="submit"
                        className="w-full"
                    >
                        {isProcessing && <LoadingSpinner/>}
                        Войти
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
