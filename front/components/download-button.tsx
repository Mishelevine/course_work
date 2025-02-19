import React from 'react';
import axios from 'axios';
import { Button } from './ui/button';

function DownloadButton<TData>({
    apiEndpoint,
    buttonText,
    className,
    tableData
}: {
    apiEndpoint: string,
    buttonText: string,
    className?: string,
    tableData?: TData[]
}) {
    const handleDownload = async () => {
        try {
            axios.defaults.withCredentials = true
            const response = await axios.post(
                apiEndpoint,
                tableData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    responseType: "blob",
                }
            );
            const disposition = response.headers['content-disposition'];
            const filename = disposition ? disposition.split('filename=')[1] : 'downloaded_file.xlsx';
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
        }
    };

    return (
        <Button onClick={handleDownload} className={className}>
            {buttonText}
        </Button>
    );
};

export default DownloadButton;
