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
  frontText: string
  inputPlaceholder: string
  emptyText: string
}

function FormComboboxField<TFormSchema extends FieldValues, TTextFieldName extends Path<TFormSchema>, TDataSchema extends FieldValues>({
  form,
  name,
  label,
  data,
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
                    ? data.find(
                      (elem) => elem.id === field.value
                    )?.license_type
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
                        value={elem.license_type}
                        key={elem.id}
                        onSelect={() => {
                          form.setValue(name, elem.id)
                        }}
                      >
                        {elem.license_type}
                        <Check
                          className={cn(
                            "ml-auto",
                            elem.id === field.value
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
