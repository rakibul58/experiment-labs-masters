//CreateCourse

import React, { useState } from 'react';
import Layout from '../Layout';
import arrowDown from '../../../assets/SkillsManagement/arrow.svg'
import arrowright from '../../../assets/SkillsManagement/arrowright.svg'

import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import Level from '../Dashboard/Level';



const CreateCourse = () => {

    const [isOpenGeneralCourseInfo, setisOpenGeneralCourseInfo] = useState(true);
    const [isOpenCourseFormat, setisOpenCourseFormat] = useState(false);
    const [isOpenCompletionTracking, setisOpenCompletionTracking] = useState(false);
    const [isOpenNumberofWeeksChapters, setisOpenNumberofWeeksChapters] = useState(false);

    const toggleDropdownCourseSelection = () => {
        setisOpenGeneralCourseInfo(!isOpenGeneralCourseInfo);
    };
    const toggleDropdownCourseFormat = () => {
        setisOpenCourseFormat(!isOpenCourseFormat);
    };
    const toggleDropdownCompletionTracking = () => {
        setisOpenCompletionTracking(!isOpenCompletionTracking);
    };
    const toggleDropdownNumberofWeeksChapters = () => {
        setisOpenNumberofWeeksChapters(!isOpenNumberofWeeksChapters);
    };


    const [numberOfWeeks, setNumberOfWeeks] = useState(0);
    const [numberList, setNumberList] = useState([]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setNumberOfWeeks(value);
        generateNumberList(value);
    };

    const generateNumberList = (value) => {
        const numbers = [];
        for (let i = 1; i <= value; i++) {
            numbers.push(i);
        }
        setNumberList(numbers);
    };

    // addcoursecategory
    const [isOpenaddcoursecategory, setIsOpenaddcoursecategory] = useState(false);

    const openModaladdcoursecategory = () => {
        setIsOpenaddcoursecategory(true);
    };

    const closeModaladdcoursecategory = () => {
        setIsOpenaddcoursecategory(false);
    };

    //file upload
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

///week names
const [formData, setFormData] = useState([]);

const handleInputChangeweek = (e, number) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedData = [...prevFormData];
      const index = updatedData.findIndex((data) => data.number === number);
      if (index !== -1) {
        updatedData[index][name] = value;
      } else {
        updatedData.push({ number, [name]: value });
      }
      return updatedData;
    });
  };


    /// handle Submit
    const handleSubmit = event => {
        event.preventDefault()
        const form = event.target;

        const courseFullName = form.courseFullName?.value;
        const courseShortName = form.courseShortName?.value;
        const courseStartingDate = form.courseStartingDate?.value;
        const courseStartingTime = form.courseStartingTime?.value;
        const courseEndingDate = form.courseEndingDate?.value;
        const courseEndingTime = form.courseEndingTime?.value;
        const courseDescription = form.courseDescription?.value;
        const courseCategory = form.courseCategory?.value;
        const courseVisibility = form.courseVisibility?.value;
        const courseIDNumber = form.courseIDNumber?.value;
        const courseFormat = form.courseFormat?.value;
        const gradesFormat = form.gradesFormat?.value;
        const groups = form.groups?.value;
        const showactivitydates = form.showactivitydates?.value;
       // const weekChapterName = form.weekChapterName?.value;
        const showactivityreports = form.showactivityreports?.value;
        const enableCompletionTracking = form.enableCompletionTracking?.value;
        const certificateGeneration = form.certificateGeneration?.value;
        const showactivitycompletionconditions = form.showactivitycompletionconditions?.value;
        //  const showGradebooktostudents = form.showGradebooktostudents.value;


        const addCourse = {
            courseFullName,
            courseShortName,
            courseStartingDate,
            courseStartingTime,
            courseEndingDate,
            courseEndingTime,
            courseDescription,
            courseCategory,
            courseThumbnail: selectedFile,
            courseVisibility,
            courseIDNumber,
            courseFormat,
            gradesFormat,
            groups,
            showactivitydates,
            NumberofWeeksChapters: numberOfWeeks,
            weekChapterName: formData,
            showactivityreports,
            enableCompletionTracking,
            certificateGeneration,
            showactivitycompletionconditions
            //showGradebooktostudents,

        }

        console.log(addCourse)


    }

    return (
        <div>
            <Layout>

                <div className='text-[#3E4DAC] text-[26px] font-bold border-b border-b-[#A4A4A4] py-[35px] ps-[40px]'>
                    <p>Create/Edit Course </p>

                </div>
                <form onSubmit={handleSubmit} className='ms-[40px]  mt-12'>
                    <div className="select-option flex items-center gap-[40px]" onClick={toggleDropdownCourseSelection} >
                        <h1 className=' h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]'>1</h1>
                        <p className='text-[25px] font-bold'>General course information</p>
                        {
                            !isOpenGeneralCourseInfo && <img className='w-6' src={arrowright}></img>
                        }

                        {
                            isOpenGeneralCourseInfo && <img src={arrowDown}></img>
                        }

                        <i className={`dropdown-arrow ${isOpenGeneralCourseInfo ? 'open' : ''}`}></i>
                    </div>
                    {isOpenGeneralCourseInfo && (
                        <div className="dropdown-menu mt-[71px] mb-[45px] flex gap-80 ">
                            <div >
                                <div className=''>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'> Course Full Name</p>
                                    </div>

                                    <input className='mt-6 ms-6 border rounded-md w-[520px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='courseFullName' type="text" placeholder='Eg. Entrepreneurship Lab' />
                                </div>

                                <div className='mt-20'>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'> Course Short Name</p>
                                    </div>

                                    <input className='mt-6 ms-6 border rounded-md w-[520px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='courseShortName' type="text" placeholder='Eg. Entrepreneurship Lab' />
                                </div>
                                <div className='mt-20 flex flex-col'>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'> Course Starting Date and Time </p>
                                    </div>

                                    <input className='mt-6 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='courseStartingDate' type="date" placeholder='Eg. Entrepreneurship Lab' />
                                    <input className='mt-4 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='courseStartingTime' type="time" placeholder='Eg. Entrepreneurship Lab' />
                                </div>
                                <div className='mt-20 flex flex-col'>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'> Course Ending Date and Time </p>
                                    </div>

                                    <input className='mt-6 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='courseEndingDate' type="date" placeholder='Eg. Entrepreneurship Lab' />
                                    <input className='mt-4 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='courseEndingTime' type="time" placeholder='Eg. Entrepreneurship Lab' />
                                </div>
                                <div className='mt-20'>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'>Course Description</p>
                                    </div>

                                    <input className='mt-6 ms-6 border rounded-md w-[520px] h-[97px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='courseDescription' type="text" placeholder='Eg. This Lab will teach you about....' />
                                </div>
                            </div>


                            <div>
                                <div className=''>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'>Course Category</p>
                                    </div>

                                    <div className=" flex gap-2  mt-6 ms-6 border rounded-md w-[381px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  ">

                                        <select
                                            required
                                            className='w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold focus:outline-0'
                                            name="courseCategory"
                                        // id="option"
                                        >

                                            <option className="" value="Web Development">Web Development</option>
                                            <option value="Parent"></option>
                                            <option value="Counselor"></option>
                                            <option value="Others"></option>
                                        </select>
                                        <div onClick={openModaladdcoursecategory} className='w-[96px] bg-[#FFDB70] text-[] text-base font-semibold flex gap-2 justify-center items-center'>
                                            <p className='text-2xl'>+</p>
                                            <div>
                                                <p className='w-full'>Add</p>

                                            </div>


                                        </div>
                                    </div>
                                    <div>
                                        {isOpenaddcoursecategory && (
                                            <div className="modal-overla w-[438px] h-[325px] rounded-md mt-3 bg-[#fff] border">
                                                <div className="modal-content">
                                                    <div className='border-b flex justify-between items-center pt-6 px-10 pb-5 text-[#3E4DAC] text-xl font-bold'>
                                                        <p >Add Course Category</p>
                                                        <p onClick={closeModaladdcoursecategory} className=' flex justify-center items-center rounded-full w-6 h-6 bg-[#A1A1A1] font-bold text-[#000000]'>x</p>
                                                    </div>
                                                    <div className='mt-6 mx-10'>
                                                        <div className='flex items-center gap-4'>

                                                            <p className='font-bold text-lg me-[36px]'> Course Category Name</p>
                                                        </div>

                                                        <input className='mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='courseCategory' type="text" placeholder='Eg. Entrepreneurship Lab' ></input>

                                                    </div>



                                                </div>
                                            </div>
                                        )}
                                    </div>


                                </div>

                                <div className='mt-20'>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>

                                        <p className='font-bold text-lg me-[36px]'>Course Thumbnail</p>
                                    </div>

                                    <div onChange={handleFileChange} className=" flex gap-2  mt-6 ms-6 border rounded-md w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  ">

                                        <div className=' flex items-center'>
                                            <input className='w-full h-full flex items-center text-[#3E4DAC] text-base font-semibold mt-4' type="file" />
                                            <p className='w-[105px] h-full bg-[#FFDB70] text-[] text-base font-semibold flex gap-2 justify-center items-center'>Browse</p>
                                        </div>

                                        

                                    </div>
                                </div>

                                <div className='mt-20'>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'>Course Visibility</p>
                                    </div>

                                    <div className=" items-center flex gap-2  mt-2 ms-6  w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 ">
                                        <div className=''>
                                            <input type="radio" id="Show" name="courseVisibility" value="Show" />
                                            <lebel> Show</lebel>
                                        </div>
                                        <div className=' ms-[55px]'>
                                            <input type="radio" id="Hide" name="courseVisibility" value="Hide" />
                                            <lebel> Hide</lebel>
                                        </div>

                                    </div>

                                    <div className='mt-20'>
                                        <div className='flex items-center gap-4'>
                                            <p className='h-2 w-2 bg-black rounded-full'></p>
                                            <p className='font-bold text-lg me-[36px]'>Course ID Number</p>
                                        </div>

                                        <input className='mt-6 ms-6 border rounded-md w-[272px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='courseIDNumber' type="text" placeholder='Eg. 02283847' ></input>
                                    </div>
                                </div>

                            </div>


                        </div>
                    )}

                    <div className="select-option flex items-center gap-[40px] mt-10" onClick={toggleDropdownCourseFormat} >
                        <h1 className=' h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]'>2</h1>
                        <p className='text-[25px] font-bold'>Course Format</p>
                        {
                            !isOpenCourseFormat && <img className='w-6' src={arrowright}></img>
                        }

                        {
                            isOpenCourseFormat && <img src={arrowDown}></img>
                        }

                        <i className={`dropdown-arrow ${isOpenCourseFormat ? 'open' : ''}`}></i>
                    </div>

                    {isOpenCourseFormat && (
                        <div className="dropdown-menu mt-[71px] mb-[45px] flex gap-[550px] ">
                            <div >
                                <div className=''>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'>Course Format</p>
                                    </div>


                                    <div className=" flex gap-2  mt-6 ms-6   w-[230px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  "
                                        style={{
                                            borderRadius: "8px",

                                            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)"
                                        }}
                                    >

                                        <select
                                            required
                                            className='select select-bordered w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold'
                                            name="courseFormat"
                                        //id="option"
                                        >

                                            <option value="Topic Format">Topic Format</option>
                                            <option value="Parent"></option>
                                            <option value="Counselor"></option>
                                            <option value="Others"></option>
                                        </select>

                                    </div>
                                </div>
                                <div className='mt-20'>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'>Grades Format</p>
                                    </div>

                                    <div className=" flex gap-2  mt-6 ms-6   w-[230px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  "
                                        style={{
                                            borderRadius: "8px",

                                            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)"
                                        }}
                                    >

                                        <select
                                            required
                                            className='w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold'
                                            name="gradesFormat"
                                            id="option"
                                        >

                                            <option className="" value="Gamified">Gamified</option>
                                            <option value="Parent"></option>
                                            <option value="Counselor"></option>
                                            <option value="Others"></option>
                                        </select>

                                    </div>
                                </div>
                                <div className='mt-20'>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'>Groups</p>
                                    </div>

                                    <div className=" flex gap-2  mt-6 ms-6   w-[230px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  "
                                        style={{
                                            borderRadius: "8px",

                                            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)"
                                        }}
                                    >

                                        <select
                                            required
                                            className='w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold'
                                            name="groups"
                                        // id="option"
                                        >

                                            <option className="" value="No Groups">No Groups</option>
                                            <option value="Parent"></option>
                                            <option value="Counselor"></option>
                                            <option value="Others"></option>
                                        </select>

                                    </div>
                                </div>

                                <div className='mt-20'>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'>Show activity dates</p>
                                    </div>

                                    <div className=" items-center flex gap-2  mt-2 ms-6  w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 ">
                                        <div className=''>
                                            <input type="radio" id="Yes" name="showactivitydates" value="Yes" />
                                            <lebel> Yes</lebel>
                                        </div>
                                        <div className=' ms-[55px]'>
                                            <input type="radio" id="No" name="showactivitydates" value="No" />
                                            <lebel> No</lebel>
                                        </div>

                                    </div>
                                </div>


                            </div>


                            <div className=''>

                                <div className='bg-[#F4F4F4] px-4 py-8 rounded-md w-[445px]'>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='text-[18px] font-bold'>Number of Weeks/Chapters</p>
                                    </div>
                                    <div
                                        className='flex items-center border w-[85px] h-[50px] p-4 ms-6 mt-6'
                                        style={{
                                            borderRadius: '6px',
                                            border: '1px solid #CECECE',
                                        }}
                                    >
                                        <input
                                            className='text-center my-4 border w-1/2'
                                            type='text'
                                            placeholder='2'
                                            value={numberOfWeeks}
                                            onChange={handleInputChange}
                                        />
                                        <div className='select-option' onClick={toggleDropdownNumberofWeeksChapters}>
                                            {!isOpenNumberofWeeksChapters && <img className='w-6' src={arrowright}></img>}
                                            {isOpenNumberofWeeksChapters && <img src={arrowDown}></img>}
                                            <i className={`dropdown-arrow ${isOpenNumberofWeeksChapters ? 'open' : ''}`}></i>
                                        </div>
                                    </div>
                                    {isOpenNumberofWeeksChapters && (
                                        <div className='dropdown-menu mt-[70px]'>
                                            <ul>
                                                {numberList.map((number) => (
                                                    <li className='mt-[70px]' key={number}>
                                                        <div className='flex items-center gap-6'>
                                                            <p className='h-2 w-2 bg-black rounded-full'></p>
                                                            <p className='text-[18px] font-bold'>Week/Chapter Name {number} </p>
                                                        </div>

                                                        <input className='h-[50px] w-[387px] mt-6 ms-6 ps-3 focus:outline-0'
                                                        
                                                        onChange={(e) => handleInputChangeweek(e, number)}
                                                            type='text'
                                                            name='weekChapterName'
                                                            placeholder='Eg. Week : Thinking Big'
                                                            style={{
                                                                borderRadius: "6px",
                                                                border: "1px solid #CECECE",
                                                                background: "#F6F7FF"
                                                            }}
                                                        />


                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div className='mt-20'>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'>Show activity reports</p>
                                    </div>

                                    <div className=" items-center flex gap-2  mt-2 ms-6  w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 ">
                                        <div className=''>
                                            <input type="radio" id="Yes" name="showactivityreports" value="Yes" />
                                            <lebel> Yes</lebel>
                                        </div>
                                        <div className=' ms-[55px]'>
                                            <input type="radio" id="No" name="showactivityreports" value="No" />
                                            <lebel> No</lebel>
                                        </div>

                                    </div>
                                </div>

                            </div>


                        </div>
                    )}

                    <div className="select-option flex items-center gap-[40px] mt-10" onClick={toggleDropdownCompletionTracking} >
                        <h1 className=' h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]'>3</h1>
                        <p className='text-[25px] font-bold'>Completion Tracking</p>
                        {
                            !isOpenCompletionTracking && <img className='w-6' src={arrowright}></img>
                        }

                        {
                            isOpenCompletionTracking && <img src={arrowDown}></img>
                        }

                        <i className={`dropdown-arrow ${isOpenCompletionTracking ? 'open' : ''}`}></i>
                    </div>

                    {isOpenCompletionTracking && (
                        <div className="dropdown-menu mt-[71px] mb-[45px] flex gap-[550px] ">
                            <div >

                                <div className=''>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'>Enable Completion Tracking</p>
                                    </div>

                                    <div className=" items-center flex gap-2  mt-2 ms-6  w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 ">
                                        <div className=''>
                                            <input type="radio" id="Yes" name="enableCompletionTracking" value="Yes" />
                                            <lebel> Yes</lebel>
                                        </div>
                                        <div className=' ms-[55px]'>
                                            <input type="radio" id="No" name="enableCompletionTracking" value="No" />
                                            <lebel> No</lebel>
                                        </div>

                                    </div>
                                </div>
                                <div className='mt-20'>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'>Certificate Generation</p>
                                    </div>

                                    <div className=" flex gap-2  mt-6 ms-6   w-[230px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  "
                                        style={{
                                            borderRadius: "8px",

                                            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)"
                                        }}
                                    >

                                        <select

                                            required
                                            className='w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold'
                                            name="certificateGeneration"
                                            id="option"
                                        >

                                            <option className="" value="Auto Generate">Auto Generate</option>
                                            <option value="Parent"></option>
                                            <option value="Counselor"></option>
                                            <option value="Others"></option>
                                        </select>

                                    </div>
                                </div>




                            </div>


                            <div>
                                <div className=''>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'>Show activity completion conditions</p>
                                    </div>

                                    <div className=" items-center flex gap-2  mt-2 ms-6  w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 ">
                                        <div className=''>
                                            <input type="radio" id="Yes" name="showactivitycompletionconditions" value="Yed" />
                                            <lebel> Yes</lebel>
                                        </div>
                                        <div className=' ms-[55px]'>
                                            <input type="radio" id="No" name="showactivitycompletionconditions" value="No" />
                                            <lebel> No</lebel>
                                        </div>

                                    </div>
                                </div>

                            </div>


                        </div>
                    )}


                    <div className='flex items-center justify-center mt-20 mb-10'>
                        <input type="submit" value='submit' className='px-[30px] py-3 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg' />
                        <input type="submit" value='Save & Display' className='px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20' />
                    </div>



                </form>


            </Layout>
        </div >
    );
};

export default CreateCourse;