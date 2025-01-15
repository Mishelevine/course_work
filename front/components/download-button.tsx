import React from 'react';
import axios from 'axios';
import { API_URL } from '@/constants';
import { Button } from './ui/button';

const DownloadButton: React.FC = () => {
    const handleDownload = async () => {
        try {
            const response = await axios.get(API_URL + '/software/test_excel', { responseType: 'blob' });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'table.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
        }
    };

    return (
        <Button onClick={handleDownload}>Выгрузить в Excel</Button>
    );
};

export default DownloadButton;