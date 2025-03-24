"use client"

import CRUDFormForTables from '@/components/crud-form-for-tables'
import React, { useState } from 'react'
import { useToast } from "@/hooks/use-toast";
import { FileUploadSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { API_URL } from '@/constants';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Separator } from '@radix-ui/react-separator';
import DownloadButton from '@/components/download-button';

const Backup = () => {
    const [error, setError] = useState<string | undefined>("");

    const { toast } = useToast()

    const form = useForm<z.infer<typeof FileUploadSchema>>({
        resolver: zodResolver(FileUploadSchema),
    });

    function UploadBackup(data: z.infer<typeof FileUploadSchema>) {
        setError("")

        if (!data.file) {
            setError("Пожалуйста, выберите файл")
            return;
        }

        const formData = new FormData();
        formData.set("file", data.file[0])
        axios.post(API_URL + `/backup/restore/upload`, formData)
            .then(() => {
                console.log("Backup success")
                toast({
                    title: "Бэкап БД прошел успешно",
                    description: "БД обновлена",
                    className: "bg-white"
                })
            })
            .catch((e) => {
                if (e.response.data.detail == "400: Invalid SQLite database") {
                    setError("Неверный тип файла, поддерживаются только файлы SQLite с расширением .db")
                }
                else {
                    setError("Во время бэкапа произошла непредвиденная ошибка!")
                    console.log("Unexpected error occured during backup.")
                    console.log(data)
                    console.log(e)
                }

            })
    }

    return (
        <Card>
            <CardHeader className='flex flex-row justify-between'>
                <div className='flex flex-col space-y-1.5'>
                    <CardTitle>Бэкап БД</CardTitle>
                    <CardDescription>Здесь вы можете загрузить более старую версию БД</CardDescription>
                </div>
                <DownloadButton
                    apiEndpoint={API_URL + '/backup/download'}
                    buttonText='Сохранить копию БД'
                    className='bg-blue-2 hover:bg-blue-700'
                />
            </CardHeader>
            <Separator className="bg-gray-300 h-[1px]" />
            <CardContent className="space-y-2">
                <CRUDFormForTables
                    buttonText="Загрузить бэкап"
                    form={form}
                    id="uploadBackupForm"
                    onSubmit={UploadBackup}
                    error={error}
                >
                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field: { value, onChange, ...fieldProps } }) => (
                            <FormItem>
                                <FormLabel>Файл БД</FormLabel>
                                <FormControl>
                                    <Input
                                        {...fieldProps}
                                        type='file'
                                        onChange={(e) => {
                                            onChange(e.target.files);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CRUDFormForTables>
            </CardContent>
        </Card>
    )
}

export default Backup
