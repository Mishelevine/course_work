import React, { HTMLInputTypeAttribute } from 'react'
import * as z from "zod"
import { Control } from 'react-hook-form';
import { SoftwareSchema } from '@/schemas';
import { FormControl, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "../ui/input"
import { SoftwareTextFieldName } from './software-add-form';

interface SoftwareTextFieldProps {
    control: Control<z.infer<typeof SoftwareSchema>>
    name: SoftwareTextFieldName;
    label: string;
    placeholder: string;
    type?: HTMLInputTypeAttribute | undefined;
}

const SoftwareTextField = ({
    control,
    name,
    label,
    placeholder,
    type = undefined
}: SoftwareTextFieldProps) => {
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

export default SoftwareTextField
