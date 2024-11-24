import React, { HTMLInputTypeAttribute } from 'react'
import * as z from "zod"
import { Control } from 'react-hook-form';
import { SignUpSchema } from '@/schemas';
import { FormControl, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "../ui/input"
import { RegistrationFieldName } from './sign-up-form';

interface RegistrationFieldProps {
    control: Control<z.infer<typeof SignUpSchema>>
    name: RegistrationFieldName;
    label: string;
    placeholder: string;
    type?: HTMLInputTypeAttribute | undefined;
}

const RegistrationPageField = ({
    control,
    name,
    label,
    placeholder,
    type = undefined
}: RegistrationFieldProps) => {
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

export default RegistrationPageField
