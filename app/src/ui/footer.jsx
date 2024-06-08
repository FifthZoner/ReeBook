import React from 'react';
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";


export default function Footer(){
    return (
        <div>
            <div className=' flex flex-col flex-wrap bg-neutral-900 mx-auto text-white [&>*]:w-1/3 justify-center items-center text-center py-2 md:p-4'>
                <h1 className=' text-3xl mx-auto py-2'>ReeBook</h1>
                <div className='flex justify-center items-center [&>*]:mx-2'>
                    <FaFacebook className='w-7 h-7'/>
                    <FaLinkedin className='w-7 h-7'/>
                    <FaSquareXTwitter className='w-7 h-7'/>

                </div>
            </div>
            <div className=' bg-black text-white flex justify-between p-4'>
                <p>Copyright © SpaceGliders 2024</p>
                <ul className='flex flex-row flex-wrap [&>*]:px-2 overflow-hidden'>
                    <li>By:</li>
                    <li>Mateusz Skali</li>
                    <li>Karol Michoński</li>
                    <li>Jakub Portas</li>
                    <li>Szymon Jabłoński</li>
                    <li>Paweł Najdecki</li>
                </ul>
            </div>
        </div>
    );
};

