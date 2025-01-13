"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import { SoftwareSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import SoftwareTextField from "./software-text-field";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";

export type SoftwareTextFieldName = "name" | "short_name" | "program_link" | "version" | "version_date";

const softwareTextFields = [
    {
        name: "name",
        label: "Наименование ПО",
        placeholder: "Название добавляемого ПО",
    },
    {
        name: "short_name",
        label: "Сокращенное наименование ПО",
        placeholder: "Сокращенное название добавляемого ПО",
    },
    {
        name: "program_link",
        label: "Ссылка на программу",
        placeholder: "Ссылка на сайт добавляемого ПО",
    },
    {
        name: "version",
        label: "Версия ПО",
        placeholder: "Версия добавляемого ПО",
    },
    {
        name: "version_date",
        label: "Дата версии",
        placeholder: "Дата выхода версии добавляемого ПО",
    }
]

const tempLicenseData = [
    { label: "Freeware", value: "1" },
    { label: "Shareware", value: "2" }
]

export const AddRowSoftwareTable = () => {
    console.log("Added row")
    const formValues = document.getElementById("addSoftwareForm") as HTMLFormElement;

    for (var pair of new FormData(formValues).entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }
}

export const SoftwareAddForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const router = useRouter();

    const form = useForm<z.infer<typeof SoftwareSchema>>({
        resolver: zodResolver(SoftwareSchema),
        defaultValues: {
            name: "",
            short_name: "",
            program_link: "",
            version: "",
            version_date: "",
            license_type: "",
            contract_number: "",
            contract_date: ""
        },
    })

    return (
        <Form {...form}>
            <form id="addSoftwareForm"
                onSubmit={form.handleSubmit(AddRowSoftwareTable)}
                className="space-y-6"
            >
                <div className="space-y-4">
                    {softwareTextFields.map((formItem, index) => {
                        return <SoftwareTextField
                            key={index}
                            control={form.control}
                            name={formItem.name as SoftwareTextFieldName}
                            label={formItem.label}
                            placeholder={formItem.placeholder}
                        />
                    })}
                    <FormField
                        control={form.control}
                        name="license_type"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Тип лицензии</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-[200px] justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? tempLicenseData.find(
                                                        (license) => license.value === field.value
                                                    )?.label
                                                    : "Выберите тип лицензии"
                                                }
                                                <ChevronsUpDown className="opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput
                                                placeholder="Введите название..."
                                                className="h-9"
                                            />
                                            <CommandList>
                                                <CommandEmpty>Лицензий не найдено.</CommandEmpty>
                                                <CommandGroup>
                                                    {tempLicenseData.map((license) => (
                                                        <CommandItem
                                                            value={license.label}
                                                            key={license.value}
                                                            onSelect={() => {
                                                                form.setValue("license_type", license.value)
                                                            }}
                                                        >
                                                        {license.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                license.value === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    )
}
