import React from 'react'
import { Form } from './ui/form'
import FormTextField from './form-text-field'
import FormComboboxField from './form-combobox-field'
import { FormError } from './form-error'
import { Button } from './ui/button'
import { FieldValues, Path, SubmitHandler, UseFormReturn } from 'react-hook-form'

type TextField = {
    name: string
    label: string
    placeholder: string
}

type ComboboxField<TComboboxData> = {
    name: string
    label: string
    value_field: string
    id_field: string
    data: TComboboxData[]
    frontText: string
    inputPlaceholder: string
    emptyText: string
}

function CRUDFormForTables<TData extends FieldValues, TComboboxData extends FieldValues> ({
    form,
    id,
    onSubmit,
    error,
    loading,
    textFields,
    comboboxFields,
    children
} : {
    form: UseFormReturn<TData>
    id: string
    onSubmit: SubmitHandler<TData>
    error: string | undefined
    loading?: boolean | undefined
    textFields?: TextField[]
    comboboxFields?: ComboboxField<TComboboxData>[],
    children?: React.ReactNode
}) {
  if (loading) {
    return <div>Загрузка...</div>
  }

  return (
    <Form {...form}>
      <form id={id}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">
          {textFields && textFields.map((formItem, index) => {
            return <FormTextField
              key={index}
              control={form.control}
              name={formItem.name as Path<TData>}
              label={formItem.label}
              placeholder={formItem.placeholder}
            />
          })}
          {comboboxFields && comboboxFields.map((formItem, index) => {
            return <FormComboboxField
              key={index}
              form={form}
              name={formItem.name as Path<TData>}
              label={formItem.label}
              data={formItem.data}
              value_field={formItem.value_field}
              id_field={formItem.id_field}
              frontText={formItem.frontText}
              inputPlaceholder={formItem.inputPlaceholder}
              emptyText={formItem.emptyText}
            />
          })}
        </div>
        {children}
        <FormError message={error} />
        <Button type="submit" className="w-full bg-blue-3 hover:bg-blue-700">Создать</Button>
      </form>
    </Form>
  )
}

export default CRUDFormForTables
