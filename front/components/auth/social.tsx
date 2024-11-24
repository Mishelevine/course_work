'use client';

import { Button } from "../ui/button";
import Image from 'next/image';

export const Social = () => {
    return(
        <div className='flex items-center w-full gap-x-2'>
            <Button
                className='bg-white w-full'
                size='lg'
                variant='outline'
                onClick={() => {}}
            >
                <Image
                    src={'/icons/logo.svg'}
                    alt={'HSE Digital'}
                    width={24}
                    height={24}
                >
                </Image>
                <p className="text-blue-2 font-bold text-[16px]">HSE Digital</p>
            </Button>
        </div>
    )
}
