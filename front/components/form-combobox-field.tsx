import React from 'react'

import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";

interface FormComboboxFieldProps<TFormSchema extends FieldValues, TTextFieldName extends Path<TFormSchema>, TDataSchema extends FieldValues> {
  form: UseFormReturn<TFormSchema>
  name: TTextFieldName
  label: string
  data: TDataSchema[]
  value_field: string,
  id_field: string,
  frontText: string
  inputPlaceholder: string
  emptyText: string
}

function FormComboboxField<TFormSchema extends FieldValues, TTextFieldName extends Path<TFormSchema>, TDataSchema extends FieldValues>({
  form,
  name,
  label,
  data,
  value_field,
  id_field,
  frontText,
  inputPlaceholder,
  emptyText
}: FormComboboxFieldProps<TFormSchema, TTextFieldName, TDataSchema>){
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? data.map((elem) => {
                      if (elem[id_field] === field.value)
                        return <span key="1" style={{ color: elem["color"] }}>
                          {elem[value_field]}
                        </span>
                    })
                    : frontText
                  }
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput
                  placeholder={inputPlaceholder}
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>{emptyText}</CommandEmpty>
                  <CommandGroup>
                    {data.map((elem) => (
                      <CommandItem
                        value={elem[value_field]}
                        key={elem[id_field]}
                        onSelect={() => {
                          form.setValue(name, elem[id_field])
                        }}
                      >
                        {!elem["color"] && elem[value_field]}
                        {elem["color"] &&
                          <span style={{ color: elem["color"] }}>
                            {elem[value_field]}
                          </span>
                        }
                        <Check
                          className={cn(
                            "ml-auto",
                            elem[id_field] === field.value
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
  )
}

export default FormComboboxField
