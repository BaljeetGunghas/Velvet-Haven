"use client"

import Image from 'next/image'
import React from 'react'
import Failer from "@/asset/failer.svg";
import { Button } from '@/components/ui/button';
const page = () => {
    return (
        <div className="container mx-auto w-full md:w-10/12 mt-16 mb-10">
            <div className="flex flex-col justify-center items-center gap-2 p-4 md:p-8">
                <h1 className='font-bold text-2xl m-0'> Payment Failure</h1>
                <Image src={Failer} alt='successfull-image' width={72} height={72} className='w-40 h-40 object-cover' />
                <h2 className='font-semibold text-xl m-0'>Payment Failed!</h2>
                <p className='text-sm text-gray-400 font-normal text-center'>We were unable to process your payment. <br /> Please try again.</p>
                <Button
                    className="text-sm text-primaryblue dark:text-white border border-primaryblue dark:border-white my-3 rounded-md"
                    onClick={() => window.history.back()}>
                    Back
                </Button>
            </div>
        </div>
    )
}

export default page