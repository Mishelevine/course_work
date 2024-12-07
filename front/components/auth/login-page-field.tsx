import React, { HTMLInputTypeAttribute } from 'react'
import * as z from "zod"
import { Control } from 'react-hook-form';
import { SignInSchema } from '@/schemas';
import { FormControl, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "../ui/input"
import { LoginFieldName } from './sign-in-form';

interface LoginFieldProps {
    control: Control<z.infer<typeof SignInSchema>>
    name: LoginFieldName;
    label: string;
    placeholder: string;
    type?: HTMLInputTypeAttribute | undefined;
}

const LoginPageField = ({
    control,
    name,
    label,
    placeholder,
    type = undefined
}: LoginFieldProps) => {
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input
                        {...field}
                        placeholder={placeholder}
                        type={type}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
  )
}

export default LoginPageField
