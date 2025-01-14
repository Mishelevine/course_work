import React, { HTMLInputTypeAttribute } from 'react'

import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SoftwareAddSchema } from '@/schemas';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { SoftwareComboboxFieldName } from './add-software-form';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";

interface ComboboxDataStruct {
  label: string,
  value: number
}

interface SoftwareComboboxFieldProps {
  form: UseFormReturn<z.infer<typeof SoftwareAddSchema>>
  name: SoftwareComboboxFieldName
  label: string
  data: ComboboxDataStruct[]
  frontText: string
  inputPlaceholder: string
  emptyText: string
}

const SoftwareComboboxField = ({
  form,
  name,
  label,
  data,
  frontText,
  inputPlaceholder,
  emptyText
}: SoftwareComboboxFieldProps) => {
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
                      (elem) => elem.value === field.value
                    )?.label
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
                        value={elem.label}
                        key={elem.value}
                        onSelect={() => {
                          form.setValue(name, elem.value)
                        }}
                      >
                        {elem.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            elem.value === field.value
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

export default SoftwareComboboxField