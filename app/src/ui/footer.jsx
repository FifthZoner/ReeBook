import React from 'react';
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";


const Footer = () => {
    return (
        <div className='flex flex-col flex-wrap'>
            <div className=' flex flex-col flex-wrap bg-neutral-900 mx-auto text-white [&>*]:w-1/3 justify-center items-center text-center p-4'>
                <h1 className=' text-3xl mx-auto'>ReeBook</h1>
                <p className='p-3'>ReeBook is an innovative online platform designed for book enthusiasts to lend and borrow books within a private community. It facilitates the sharing of literature, allowing users to enjoy a diverse range of books without the need to purchase them.</p>
                <div className='flex justify-center items-center [&>*]:mx-2'>
                    <FaFacebook className='w-7 h-7'/>
                    <FaLinkedin className='w-7 h-7'/>
                    <FaSquareXTwitter className='w-7 h-7'/>

                </div>
            </div>
            <div className=' bg-black text-white flex justify-between p-4'>
                <p>Copyright © SpaceGliders 2024</p>
                <ul className='flex flex-row [&>*]:px-2'>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;