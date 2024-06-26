//OrganizationName

import icon from '../../../../assets/LoginPage/icon.png';
import React, { useContext, useState } from "react";
import image8 from '../../../../assets/LoginPage/image8.png';
import account from '../../../../assets/LoginPage/account.svg';
import user from '../../../../assets/LoginPage/user.svg';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




const OrganizationName = () => {




    return (
        <div className=""

        >
            <p className="flex items-center text-3xl font-semibold gap-2 ps-10 pt-10"><Link to='/organizationType' ><ArrowBackIcon /></Link> <span><img src={icon} alt="icon" /></span>Experiment Labs
            </p>
            <div className="flex">
                <div className="w-[100%] flex flex-col items-center ">

                    <p className=' text-3xl font-extrabold mt-10 '>Name your Organization </p>
                    <p className="flex items-center text-xl font-medium gap-5  py-2 w-[500px] mt-[30px] ps-3 "
                        style={{
                            borderRadius: "10px",
                            border: "0.5px solid #8F8F8F"
                        }}
                    >
                        <span><img src={user} alt="icon" /></span>
                        <input className="w-full focus:outline-0" placeholder="Type Organization name here" type="text" name="name" />
                    </p>

                    <div className='flex items-center my-[40px]'>
                        <p className='border-b border-b-[#8F8F8F] w-[200px]'></p>
                        <p className='mx-3 text-[#8F8F8F] text-base font-medium'>Or</p>
                        <p className='border-b border-b-[#8F8F8F] w-[200px]'></p>

                    </div>

                    <Link to='' className="flex items-center text-xl font-medium gap-5 justify-center py-2 w-[290px] "
                        style={{
                            borderRadius: "10px",
                            border: "0.5px solid #8F8F8F"
                        }}
                    >
                        <span><img src={account} alt="icon" /></span>
                        Existing Organisation
                    </Link>



                </div>

            </div>


            <div className='flex justify-end items-center absolute bottom-0 left-0 w-full '
                style={{
                    backgroundImage: `url(${image8})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "30vh"
                }}
            >
                
                <Link to='/organizationCompanyDetails'
                    style={{
                        borderRadius: "10px",
                        border: "0.5px solid #8F8F8F"

                    }}
                    className="bg-[#065AD8] flex  text-xl font-bold text-[#fff]  justify-center py-2 w-[230px] me-20 mt-32 mb-10">Next</Link>
            </div>



        </div >




    );
};

export default OrganizationName;

