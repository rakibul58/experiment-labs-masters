import { Button } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import Stories from 'react-insta-stories';
import OutboundOutlinedIcon from '@mui/icons-material/OutboundOutlined';
import './style.css';
import logo2 from '../../../assets/Logos/Group 2859890.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y, FreeMode } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CleanHandsTwoToneIcon from '@mui/icons-material/CleanHandsTwoTone';
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';
import MoneyTwoToneIcon from '@mui/icons-material/MoneyTwoTone';

const AllCourses = () => {


    const [stories, setStories] = useState([
        {
            url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4',
            type: 'video'
        },
        {
            url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1075852-dV3Kxdk8Sn-high.mp4',
            type: 'video'
        },
        {
            url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4',
            type: 'video'
        },
        {
            url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1347899-LeKv7SHCYU-high.mp4',
            type: 'video'
        },
    ]);


    const [selectedIndex, setSelectedIndex] = useState(0);

    const onNext = () => {
        setSelectedIndex((selectedIndex + 1) % 4);
    };

    const onPrevious = () => {
        let i = (selectedIndex - 1);
        if (i === -1) {
            i += 4;
        }

        setSelectedIndex(i);
    };

    const stickyRef = useRef(null);
    const stickyRef2 = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const containerRect = containerRef.current.getBoundingClientRect();
            const stickyRect = stickyRef.current.getBoundingClientRect();
            const stickyRect2 = stickyRef2.current.getBoundingClientRect();
            const bottomOffset = containerRect.bottom - stickyRect.height;
            const bottomOffset2 = containerRect.bottom - stickyRect2.height;

            // console.log(bottomOffset, bottomOffset2);

            if ((bottomOffset < 0) && (window.innerWidth > 1024)) {
                stickyRef.current.style.position = 'block';
                stickyRef2.current.style.position = 'block';
                stickyRef.current.style.bottom = '0';
                stickyRef2.current.style.bottom = '0';
            } else {
                stickyRef.current.style.position = 'sticky';
                stickyRef2.current.style.position = 'sticky';
                stickyRef.current.style.bottom = 'auto';
                stickyRef2.current.style.bottom = 'auto';
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [selected, setSelected] = useState(0);
    const [lastScrolledTo, setLastScrolledTo] = useState(0);

    const handleClick = (id) => {
        setSelected(id);
        setLastScrolledTo(id);
        const element = document.getElementById(id);
        window.scrollTo({
            top: element.offsetTop - 220,
            behavior: "smooth"
        });

    };


    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelector(".getId").children;
            const scrollPosition = window.scrollY + window.innerHeight;



            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                const elementPosition = element.offsetTop - 220 + element.offsetHeight;

                if (scrollPosition >= elementPosition) {
                    setSelected(Number(element.id));
                }
            }


            console.log('selected ---->', selected);
            console.log('lastScrolledTO ---->', lastScrolledTo);

        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className='mt-28 px-5 py-10 lg:px-30 xl:px-32' ref={containerRef}>
            <h1 className='font-bold text-4xl block lg:hidden mb-6 lg:mb-0'>Hands-on. <span className=' '>Disruptive. Experiential.</span></h1>
            <div ref={stickyRef} style={{ top: 70, backgroundColor: '#141414', padding: "35px 0", zIndex: '1000', width: '100%' }} className='hidden lg:block'>
                <h1 className='font-bold text-4xl'>Hands-on. <span className=' '>Disruptive. Experiential.</span></h1>
                <h6 className='text-lg mt-2 font-light'>See how we teach across all our courses</h6>

            </div>
            <div className='flex flex-row gap-10 items-start'>

                <div ref={stickyRef2} style={{ position: 'sticky', top: 220, backgroundColor: '#141414', zIndex: '1' }} className='hidden lg:flex flex-col gap-1 min-w-[420px] sticky'>
                    <span onClick={() => handleClick(0)} className={`${selected === 0 && 'shadow-lg border-4 border-purple font-semibold'} hover:border-4 border-purple rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer bg-dark`}>0 to 1 Journey</span>
                    <span onClick={() => handleClick(1)} className={`${selected === 1 && 'shadow-lg border-4 border-purple font-semibold'} hover:border-4 border-purple rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer bg-dark`}>Technical Skills</span>
                    <span onClick={() => handleClick(2)} className={`${selected === 2 && 'shadow-lg border-4 border-purple font-semibold text-sm'} hover:border-4 border-purple rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer bg-dark`}>Emotional & Personality Development</span>
                    <span onClick={() => handleClick(3)} className={`${selected === 3 && 'shadow-lg border-4 border-purple font-semibold'} hover:border-4 border-purple rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer bg-dark`}>Hands on Career Exploration</span>
                    <span onClick={() => handleClick(4)} className={`${selected === 4 && 'shadow-lg border-4 border-purple font-semibold'} hover:border-4 border-purple rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer bg-dark`}>Portfolio Building</span>
                    <span onClick={() => handleClick(5)} className={`${selected === 5 && 'shadow-lg border-4 border-purple font-semibold'} hover:border-4 border-purple rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer bg-dark`}>Global Competitions</span>
                    <span onClick={() => handleClick(6)} className={`${selected === 6 && 'shadow-lg border-4 border-purple font-semibold'} hover:border-4 border-purple rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer bg-dark`}>Gamified Problems</span>
                    <span onClick={() => handleClick(7)} className={`${selected === 7 && 'shadow-lg border-4 border-purple font-semibold'} hover:border-4 border-purple rounded-xl py-4 pl-4 transition-all duration-100 ease-in cursor-pointer bg-dark`}>Prize Money</span>
                </div>

                {/* Big Screen */}

                <div className='hidden w-full lg:flex flex-col gap-24 getId'>
                    {/* First one  */}
                    <div style={{
                        background:"linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF'
                    }}
                        className='w-full rounded-xl flex p-10 items-start gap-10' id={0}>
                        <div>
                            <h1 className='text-3xl font-bold text-white'>Launch and Build your own Products & Business</h1>
                            <p className='text-lg font-thin my-6'>From finding the right idea to building the product to getting sales and building financial models you will learn how different careers look like in a corporation.</p>
                            <p className='text-lg font-thin mb-6'>Get exposure to over <span className='font-semibold'>50+ Career option.</span>
                            </p>

                            <p className='hidden lg:block text-xl font-semibold'>Some of our Student Brands</p>


                            <div className='flex items-end justify-between gap-20'>
                                <div className='hidden lg:grid grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pr-5'>
                                    <img className='h-12 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                    <img className='h-12 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                    <img className='h-12 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                    <img className='h-12 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                    <img className='h-12 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                    <img className='h-12 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                </div>

                                <Button endIcon={<OutboundOutlinedIcon />} size='large' variant='contained' sx={{ bgcolor: '#0CC5DB', ":hover": { bgcolor: '#3EE8B5' }, textTransform: 'capitalize', width: '160px' }}>See All</Button>
                            </div>


                        </div>
                    </div>




                    {/* second one */}
                    <div style={{
                        background:"linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF'
                    }} className='w-full rounded-xl flex p-10 items-start gap-10' id={1}>
                        <div>
                            <h1 className='text-2xl font-bold text-white'>Become a Creator-preneur</h1>
                            <p className='text-sm font-light my-3'>From identifying a content niche to building an audience, students are trained to grow their personal brands on Youtube, Instagram, and LinkedIn.</p>

                            <p className='hidden lg:block'>Meet Our Resident Influencers</p>


                            <div className='hidden lg:grid grid-cols-2 gap-4 gap-y-6 pt-6 pb-8 pr-5'>
                                <div className='flex items-center gap-3'>
                                    <img alt="" className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-custom-blue ring-offset-gray-800" src="https://source.unsplash.com/40x40/?portrait?1" />
                                    <div>
                                        <h1 className='text-sm'>Full Name</h1>
                                        <p className='text-xs font-light'>Work Role</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <img alt="" className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-custom-blue ring-offset-gray-800" src="https://source.unsplash.com/40x40/?portrait?1" />
                                    <div>
                                        <h1 className='text-sm'>Full Name</h1>
                                        <p className='text-xs font-light'>Work Role</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <img alt="" className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-custom-blue ring-offset-gray-800" src="https://source.unsplash.com/40x40/?portrait?1" />
                                    <div>
                                        <h1 className='text-sm'>Full Name</h1>
                                        <p className='text-xs font-light'>Work Role</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <img alt="" className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-custom-blue ring-offset-gray-800" src="https://source.unsplash.com/40x40/?portrait?1" />
                                    <div>
                                        <h1 className='text-sm'>Full Name</h1>
                                        <p className='text-xs font-light'>Work Role</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <img alt="" className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-custom-blue ring-offset-gray-800" src="https://source.unsplash.com/40x40/?portrait?1" />
                                    <div>
                                        <h1 className='text-sm'>Full Name</h1>
                                        <p className='text-xs font-light'>Work Role</p>
                                    </div>
                                </div>
                            </div>

                            <Button endIcon={<OutboundOutlinedIcon />} size='large' variant='contained' sx={{ bgcolor: '#0CC5DB', ":hover": { bgcolor: '#3EE8B5' }, textTransform: 'capitalize', width: '160px' }}>See All</Button>


                        </div>
                        <div className='z-0 hidden lg:block'>
                            <iframe
                                loop={true}
                                height={450}
                                width={280}
                                keyboardNavigation={true}
                                style={{ borderRadius: '15px', border: '1px solid gray' }}
                                currentIndex={selectedIndex}
                                src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded video"
                            />
                        </div>
                    </div>


                    {/* Third one */}

                    <div style={{
                        background:"linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF'
                    }} className='w-full rounded-xl flex p-10 items-start gap-10' id={2}>
                        <div>
                            <h1 className='text-2xl font-bold text-white'>Champion and Transform Local Businesses
                            </h1>
                            <p className='text-sm font-light my-3'>Step into the shoes of a consultant by adopting existing local businesses, transforming their strategy and processes, and accelerating their business success.</p>

                            <p>Meet Our Client Partners</p>


                            <div className='hidden lg:grid grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-8 pr-5'>
                                <img className='h-12 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                <img className='h-12 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                <img className='h-12 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                            </div>


                        </div>
                        <div className='z-0 hidden lg:block'>
                            <iframe
                                loop={true}
                                height={240}
                                width={280}
                                keyboardNavigation={true}
                                style={{ borderRadius: '15px', border: '1px solid gray', objectFit: 'cover' }}
                                currentIndex={selectedIndex}
                                src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded video"
                            />
                        </div>
                    </div>


                    {/* Fourth one  */}
                    <div style={{
                        background:"linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF'
                    }} className='w-full rounded-xl p-10 items-start gap-10' id={3}>
                        <div className='flex gap-10 items-center'>
                            <div>
                                <h1 className='text-2xl font-bold text-white'>Develop and Deploy Early-Stage Startups</h1>
                                <p className='text-sm font-light my-3'>Students build and run a startup, end-to-end. 10% of our first cohort went on to work full-time on their startups, with 3 of them raising angel investments.</p>
                            </div>


                            <div>
                                <div>
                                    <iframe
                                        loop={true}
                                        height={180}
                                        width={280}
                                        keyboardNavigation={true}
                                        style={{ borderRadius: '15px', border: '1px solid gray' }}
                                        src={stories[selectedIndex]?.url}
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                </div>
                                <div className='flex justify-center'>
                                    <button className='hidden sm:block' type="button" onClick={onPrevious}>
                                        <ArrowCircleLeftRoundedIcon className='opacity-80' sx={{ fontSize: '40px', color: 'rgb(156 163 175)', ":hover": { color: "#397FEB" } }} />
                                    </button>
                                    <button className='hidden sm:block' type="button" onClick={onNext}>
                                        <ArrowCircleRightRoundedIcon className='opacity-80' sx={{ fontSize: '40px', color: '#397FEB', ":hover": { color: "#397FEB" } }} />
                                    </button>
                                </div>
                            </div>


                        </div>
                        <p>Our Startup Showcase</p>

                        <div className='mt-8 flex gap-6'>
                            <div className='border rounded-2xl flex gap-3 flex-col border-gray-400 p-4 w-full hover:shadow-md cursor-pointer hover:shadow-custom-blue'>
                                <img className='h-8 w-fit' src={logo2} alt="Top logo" />
                                <div className='py-2'>
                                    <p className='text-sm'>$1m + raised</p>
                                    <p className='text-xs mt-2 font-light'>Founder</p>
                                    <p className='font-semibold'>Dharmil Bavishi</p>
                                </div>
                                <div className='flex gap-6 flex-wrap'>
                                    <img className='h-8 w-fit p-1 border border-gray-400 bg-[#121212] rounded-md' src={logo2} alt="Top logo" />
                                    <img className='h-8 w-fit p-1 border border-gray-400 bg-[#121212] rounded-md' src={logo2} alt="Top logo" />
                                </div>
                            </div>
                            <div className='border rounded-2xl flex gap-3 flex-col border-gray-400 p-4 w-full hover:shadow-md cursor-pointer hover:shadow-custom-blue'>
                                <img className='h-8 w-fit' src={logo2} alt="Top logo" />
                                <div className='py-2'>
                                    <p className='text-sm'>$1m + raised</p>
                                    <p className='text-xs mt-2 font-light'>Founder</p>
                                    <p className='font-semibold'>Dharmil Bavishi</p>
                                </div>
                                <div className='flex gap-6 flex-wrap'>
                                    <img className='h-8 w-fit p-1 border border-gray-400 bg-[#121212] rounded-md' src={logo2} alt="Top logo" />
                                    <img className='h-8 w-fit p-1 border border-gray-400 bg-[#121212] rounded-md' src={logo2} alt="Top logo" />
                                </div>
                            </div>
                            <div className='border rounded-2xl flex gap-3 flex-col border-gray-400 p-4 w-full hover:shadow-md cursor-pointer hover:shadow-custom-blue'>
                                <img className='h-8 w-fit' src={logo2} alt="Top logo" />
                                <div className='py-2'>
                                    <p className='text-sm'>$1m + raised</p>
                                    <p className='text-xs mt-2 font-light'>Founder</p>
                                    <p className='font-semibold'>Dharmil Bavishi</p>
                                </div>
                                <div className='flex gap-6 flex-wrap'>
                                    <img className='h-8 w-fit p-1 border border-gray-400 bg-[#121212] rounded-md' src={logo2} alt="Top logo" />
                                    <img className='h-8 w-fit p-1 border border-gray-400 bg-[#121212] rounded-md' src={logo2} alt="Top logo" />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Fifth one */}
                    <div style={{
                        background:"linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF'
                    }} className='w-full rounded-xl p-10 items-start gap-10' id={4}>
                        <div className='flex gap-10 items-center'>
                            <div>
                                <h1 className='text-2xl font-bold text-white'>Hustle Through a Weekend of Iteration and Innovation</h1>
                                <p className='text-sm font-light my-3'>Students engage with peers to bridge gaps, share ideas, and develop their best prototypes in under 48 hours.</p>
                                <p className='mb-3'>Engage With Themes Across</p>

                                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-2'>

                                    <div className='flex gap-2 items-center'>
                                        <CheckCircleIcon />
                                        <p className='text-xs font-light'>Martech Hackathon</p>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <CheckCircleIcon />
                                        <p className='text-xs font-light'>Blockchain Hackathon</p>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <CheckCircleIcon />
                                        <p className='text-xs font-light'>Metaverse Hackathon</p>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <CheckCircleIcon />
                                        <p className='text-xs font-light'>Edtech Hackathon</p>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <CheckCircleIcon />
                                        <p className='text-xs font-light'>Fintech Hackathon</p>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <CheckCircleIcon />
                                        <p className='text-xs font-light'>Crypto Hackathon</p>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <CheckCircleIcon />
                                        <p className='text-xs font-light'>AI/ML Hackathon</p>
                                    </div>

                                </div>
                            </div>


                            <div>
                                <div>
                                    <iframe
                                        loop={true}
                                        height={180}
                                        width={280}
                                        keyboardNavigation={true}
                                        style={{ borderRadius: '15px', border: '1px solid gray' }}
                                        src={stories[0]?.url}
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                </div>
                            </div>


                        </div>



                    </div>

                    {/* Sixth One */}
                    <div style={{
                        background:"linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF'
                    }} className='w-full rounded-xl p-10 items-start gap-10' id={5}>
                        <div className='flex gap-10 items-center'>
                            <div>
                                <h1 className='text-2xl font-bold text-white'>Get Mentored by Top CXOs</h1>
                                <p className='text-sm font-light my-3'>Experience one-on-one mentorship, coaching and guidance from CXOs across industries.</p>
                                <p className='mb-3'>Our Mentors Include</p>

                                <div className='grid grid-cols-2 gap-4 gap-y-6 pt-6 pb-8 pr-5'>
                                    <div className='flex items-center gap-3'>
                                        <img alt="" className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-custom-blue ring-offset-gray-800" src="https://source.unsplash.com/40x40/?portrait?1" />
                                        <div>
                                            <h1 className='text-sm'>Full Name</h1>
                                            <p className='text-xs font-light'>Work Role</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <img alt="" className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-custom-blue ring-offset-gray-800" src="https://source.unsplash.com/40x40/?portrait?1" />
                                        <div>
                                            <h1 className='text-sm'>Full Name</h1>
                                            <p className='text-xs font-light'>Work Role</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <img alt="" className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-custom-blue ring-offset-gray-800" src="https://source.unsplash.com/40x40/?portrait?1" />
                                        <div>
                                            <h1 className='text-sm'>Full Name</h1>
                                            <p className='text-xs font-light'>Work Role</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <img alt="" className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-custom-blue ring-offset-gray-800" src="https://source.unsplash.com/40x40/?portrait?1" />
                                        <div>
                                            <h1 className='text-sm'>Full Name</h1>
                                            <p className='text-xs font-light'>Work Role</p>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div>
                                <div>
                                    <iframe
                                        loop={true}
                                        height={180}
                                        width={280}
                                        keyboardNavigation={true}
                                        style={{ borderRadius: '15px', border: '1px solid gray' }}
                                        src={stories[0]?.url}
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                </div>
                            </div>


                        </div>



                    </div>

                    {/* Seventh One */}
                    <div style={{
                        background:"linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF'
                    }} className='w-full rounded-xl p-10 items-start gap-10' id={6}>
                        <div className='flex gap-10 items-center'>
                            <div>
                                <h1 className='text-2xl font-bold text-white'>Run a 5 Cr. Investment Fund
                                </h1>
                                <p className='text-sm font-light my-3'>The Masters’ Union Investment Fund has a working capital of over 5 Crores, invested across diverse asset classes like Crypto and Blockchain, Public and Private Equities, Fund of Funds, REITs and InvITs and of course, startups. </p>
                                <p className='mb-3'>Our Portfolio Includes</p>

                                <div className='grid grid-cols-1 gap-4 gap-y-6 pt-6 pb-8 pr-5'>
                                    <div className='flex items-center gap-3'>
                                        <div className='border-2 border-custom-blue p-2 rounded-full'>
                                            <CleanHandsTwoToneIcon className='text-2xl text-custom-blue' />
                                        </div>
                                        <div>
                                            <h1 className='text-sm'>Investments in Public Equities</h1>
                                            <p className='text-xs font-light'>Poonawala Group • ITC • CDSL and 27 more!</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <div className='border-2 border-custom-blue p-2 rounded-full'>
                                            <CurrencyExchangeTwoToneIcon className='text-2xl text-custom-blue' />
                                        </div>
                                        <div>
                                            <h1 className='text-sm'>Investments as a VC</h1>
                                            <p className='text-xs font-light'>AlphaMint Labs • BluSmart and 4 more!</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <div className='border-2 border-custom-blue p-2 rounded-full'>
                                            <MoneyTwoToneIcon className='text-2xl text-custom-blue' />
                                        </div>
                                        <div>
                                            <h1 className='text-sm'>Alternate Investments</h1>
                                            <p className='text-xs font-light'>Antler India (LPs) • Gold • REITs • InvITs • Forex</p>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div>
                                <div>
                                    <iframe
                                        loop={true}
                                        height={180}
                                        width={280}
                                        keyboardNavigation={true}
                                        style={{ borderRadius: '15px', border: '1px solid gray' }}
                                        src={stories[0]?.url}
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                </div>
                            </div>


                        </div>



                    </div>


                    {/* Eight One */}
                    <div style={{
                        background:"linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                        border: '3px solid #BCC5FF'
                    }} className='w-full rounded-xl p-10 items-start gap-10' id={7}>
                        <div className='flex gap-10 items-center'>
                            <div>
                                <h1 className='text-2xl font-bold text-white'>Run a 5 Cr. Investment Fund
                                </h1>
                                <p className='text-sm font-light my-3'>The Masters’ Union Investment Fund has a working capital of over 5 Crores, invested across diverse asset classes like Crypto and Blockchain, Public and Private Equities, Fund of Funds, REITs and InvITs and of course, startups. </p>
                                <p className='mb-3'>Our Portfolio Includes</p>

                                <div className='grid grid-cols-1 gap-4 gap-y-6 pt-6 pb-8 pr-5'>
                                    <div className='flex items-center gap-3'>
                                        <div className='border-2 border-custom-blue p-2 rounded-full'>
                                            <CleanHandsTwoToneIcon className='text-2xl text-custom-blue' />
                                        </div>
                                        <div>
                                            <h1 className='text-sm'>Investments in Public Equities</h1>
                                            <p className='text-xs font-light'>Poonawala Group • ITC • CDSL and 27 more!</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <div className='border-2 border-custom-blue p-2 rounded-full'>
                                            <CurrencyExchangeTwoToneIcon className='text-2xl text-custom-blue' />
                                        </div>
                                        <div>
                                            <h1 className='text-sm'>Investments as a VC</h1>
                                            <p className='text-xs font-light'>AlphaMint Labs • BluSmart and 4 more!</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <div className='border-2 border-custom-blue p-2 rounded-full'>
                                            <MoneyTwoToneIcon className='text-2xl text-custom-blue' />
                                        </div>
                                        <div>
                                            <h1 className='text-sm'>Alternate Investments</h1>
                                            <p className='text-xs font-light'>Antler India (LPs) • Gold • REITs • InvITs • Forex</p>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div>
                                <div>
                                    <iframe
                                        loop={true}
                                        height={180}
                                        width={280}
                                        keyboardNavigation={true}
                                        style={{ borderRadius: '15px', border: '1px solid gray' }}
                                        src={stories[0]?.url}
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                </div>
                            </div>


                        </div>



                    </div>

                </div>





                {/* small screen */}

                <div className='lg:hidden w-full'>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y, FreeMode]}
                        style={{ minWidth: '100%' }}
                        direction='horizontal'
                        spaceBetween={10}
                        slidesPerView={1}
                        scrollbar={{
                            draggable: true,
                        }}
                        freeMode={{ enabled: true, sticky: false }}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >

                        {/* First Slide */}
                        <SwiperSlide style={{ maxWidth: '400px', minWidth: '400px', minHeight: '575px', maxHeight: '575px' }}>
                            <div className='w-[340px] max-w-[340px] rounded-xl bg-dark flex flex-col-reverse justify-end min-h-[560px] max-h-[560px]' id={0}>
                                <div className='p-3'>
                                    <h1 className='text-2xl font-bold text-white'>Launch and Build your own Products & Business</h1>
                                    <p className='text-sm font-light my-3'>From finding the right idea to building the product to getting sales and building financial models you will learn how different careers look like in a corporation.</p>
                                    <p className='text-sm font-light my-3'>Get exposure to over <span className='font-semibold'>50+ Career option.</span>
                                    </p>

                                    <p className='hidden lg:block'>Some of our Student Brands</p>

                                    <div className='flex lg:hidden justify-between items-center'>
                                        <p>Some of our Student Brands</p>
                                        <Button className='hidden lg:block' endIcon={<OutboundOutlinedIcon />} size='large' variant='text' sx={{ color: '#0CC5DB', ":hover": { color: '#3EE8B5' }, textTransform: 'capitalize', width: '160px' }}>See All</Button>
                                    </div>

                                    <div className='grid lg:hidden grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-8 pr-5'>
                                        <img className='h-6 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                        <img className='h-6 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                    </div>

                                </div>

                                <div className='w-full'>
                                    <iframe
                                        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', width: '100%', height: '200px', objectFit: 'cover', border: '1px solid gray' }}
                                        currentIndex={selectedIndex}
                                        src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>



                        {/* Second Slide */}
                        <SwiperSlide style={{ maxWidth: '400px', minWidth: '400px' }}>
                            <div className='w-[340px] max-w-[340px] rounded-xl bg-dark flex flex-col-reverse justify-end min-h-[560px] max-h-[560px]' id={1}>
                                <div className='p-3'>
                                    <h1 className='text-2xl font-bold text-white'>Become a Creator-preneur</h1>
                                    <p className='text-sm font-light my-3'>From finding the right idea to building the product to getting sales and building financial models you will learn how different careers look like in a corporation.</p>

                                    <div className='flex lg:hidden justify-between items-center'>
                                        <p>Some of our Student Brands</p>
                                        <Button className='hidden lg:block' endIcon={<OutboundOutlinedIcon />} size='large' variant='text' sx={{ color: '#0CC5DB', ":hover": { color: '#3EE8B5' }, textTransform: 'capitalize', width: '160px' }}>See All</Button>
                                    </div>

                                    <div className='grid lg:hidden grid-cols-1 gap-4 pl-2 pt-4 pb-8 pr-5'>
                                        <div className='flex items-center gap-3'>
                                            <img alt="" className="w-6 h-6 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-custom-blue ring-offset-gray-800" src="https://source.unsplash.com/40x40/?portrait?1" />
                                            <div>
                                                <h1 className='text-sm'>Full Name</h1>
                                                <p className='text-xs font-light'>Work Role</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <img alt="" className="w-6 h-6 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-custom-blue ring-offset-gray-800" src="https://source.unsplash.com/40x40/?portrait?1" />
                                            <div>
                                                <h1 className='text-sm'>Full Name</h1>
                                                <p className='text-xs font-light'>Work Role</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className='w-full'>
                                    <iframe
                                        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', width: '100%', height: '200px', objectFit: 'cover', border: '1px solid gray' }}
                                        currentIndex={selectedIndex}
                                        src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>


                        {/* Third Slide */}
                        <SwiperSlide style={{ maxWidth: '400px', minWidth: '400px', minHeight: '575px', maxHeight: '575px' }}>
                            <div className='w-[340px] max-w-[340px] rounded-xl bg-dark flex flex-col-reverse justify-end min-h-[560px] max-h-[560px]' id={2}>
                                <div className='p-3'>
                                    <h1 className='text-2xl font-bold text-white'>Champion and Transform Local Businesses</h1>
                                    <p className='text-sm font-light my-3'>Step into the shoes of a consultant by adopting existing local businesses, transforming their strategy and processes, and accelerating their business success.</p>

                                    <p>Meet Our Client Partners</p>

                                    <div className='grid lg:hidden grid-cols-3 gap-4 pt-4 pb-8 pr-5'>
                                        <img className='h-6 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                        <img className='h-6 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                        <img className='h-6 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                    </div>

                                </div>

                                <div className='w-full'>
                                    <iframe
                                        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', width: '100%', height: '200px', objectFit: 'cover', border: '1px solid gray' }}
                                        currentIndex={selectedIndex}
                                        src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>


                        {/* Fourth Slide */}
                        <SwiperSlide style={{ maxWidth: '400px', minWidth: '400px', minHeight: '575px', maxHeight: '575px' }}>
                            <div className='w-[340px] max-w-[340px] rounded-xl bg-dark flex flex-col-reverse justify-end min-h-[560px] max-h-[560px]' id={3}>
                                <div className='p-3'>
                                    <h1 className='text-2xl font-bold text-white'>Launch and Build your own Products & Business</h1>
                                    <p className='text-sm font-light my-3'>Students build and run a startup, end-to-end. 10% of our first cohort went on to work full-time on their startups, with 3 of them raising angel investments.</p>

                                    <p>Our Startup Showcase</p>

                                    <div className='grid lg:hidden grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-8 pr-5'>
                                        <div className='flex flex-col items-center'>
                                            <img className='h-6 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                            <p className='text-sm'>$1m + raised</p>
                                        </div>
                                        <div className='flex flex-col items-center'>
                                            <img className='h-6 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                            <p className='text-sm'>$1m + raised</p>
                                        </div>
                                    </div>

                                </div>

                                <div className='w-full'>
                                    <iframe
                                        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', width: '100%', height: '200px', objectFit: 'cover', border: '1px solid gray' }}
                                        currentIndex={selectedIndex}
                                        src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>


                        {/* Fifth Slide */}
                        <SwiperSlide style={{ maxWidth: '400px', minWidth: '400px', minHeight: '575px', maxHeight: '575px' }}>
                            <div className='w-[340px] max-w-[340px] rounded-xl bg-dark flex flex-col-reverse justify-end min-h-[560px] max-h-[560px]' id={4}>
                                <div className='p-3'>
                                    <h1 className='text-xl font-bold text-white'>Hustle Through a Weekend of Iteration and Innovation</h1>
                                    <p className='text-sm font-light my-3'>Students engage with peers to bridge gaps, share ideas, and develop their best prototypes in under 48 hours.</p>
                                    <p className='mb-3'>Engage With Themes Across</p>

                                    <div className='grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-y-2'>

                                        <div className='flex gap-2 items-center'>
                                            <CheckCircleIcon />
                                            <p className='text-xs font-light'>Martech Hackathon</p>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <CheckCircleIcon />
                                            <p className='text-xs font-light'>Blockchain Hackathon</p>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <CheckCircleIcon />
                                            <p className='text-xs font-light'>Metaverse Hackathon</p>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <CheckCircleIcon />
                                            <p className='text-xs font-light'>Edtech Hackathon</p>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <CheckCircleIcon />
                                            <p className='text-xs font-light'>Fintech Hackathon</p>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <CheckCircleIcon />
                                            <p className='text-xs font-light'>Crypto Hackathon</p>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <CheckCircleIcon />
                                            <p className='text-xs font-light'>AI/ML Hackathon</p>
                                        </div>

                                    </div>
                                </div>

                                <div className='w-full'>
                                    <iframe
                                        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', width: '100%', height: '200px', objectFit: 'cover', border: '1px solid gray' }}
                                        currentIndex={selectedIndex}
                                        src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>

                        {/* Sixth Slide */}
                        <SwiperSlide style={{ maxWidth: '400px', minWidth: '400px', minHeight: '575px', maxHeight: '575px' }}>
                            <div className='w-[340px] max-w-[340px] rounded-xl bg-dark flex flex-col-reverse justify-end min-h-[560px] max-h-[560px]' id={5}>
                                <div className='p-3'>
                                    <div>
                                        <h1 className='text-2xl font-bold text-white'>Get Mentored by Top CXOs</h1>
                                        <p className='text-sm font-light my-3'>Experience one-on-one mentorship, coaching and guidance from CXOs across industries.</p>
                                        <p className='mb-3'>Our Mentors Include</p>

                                        <div className='grid grid-cols-1 gap-4 gap-y-6 pl-2 pt-6 pb-8 pr-5'>
                                            <div className='flex items-center gap-3'>
                                                <img alt="" className="w-6 h-6 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-custom-blue ring-offset-gray-800" src="https://source.unsplash.com/40x40/?portrait?1" />
                                                <div>
                                                    <h1 className='text-sm'>Full Name</h1>
                                                    <p className='text-xs font-light'>Work Role</p>
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <img alt="" className="w-6 h-6 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-custom-blue ring-offset-gray-800" src="https://source.unsplash.com/40x40/?portrait?1" />
                                                <div>
                                                    <h1 className='text-sm'>Full Name</h1>
                                                    <p className='text-xs font-light'>Work Role</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className='w-full'>
                                    <iframe
                                        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', width: '100%', height: '200px', objectFit: 'cover', border: '1px solid gray' }}
                                        currentIndex={selectedIndex}
                                        src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>


                        {/* Seventh Slide */}
                        <SwiperSlide style={{ maxWidth: '400px', minWidth: '400px', minHeight: '575px', maxHeight: '575px' }}>
                            <div className='w-[340px] max-w-[340px] rounded-xl bg-dark flex flex-col-reverse justify-end min-h-[560px] max-h-[560px]' id={6}>

                                <div className='p-3'>
                                    <h1 className='text-2xl font-bold text-white'>Run a 5 Cr. Investment Fund
                                    </h1>
                                    <p className='text-sm font-light my-3'>The Masters’ Union Investment Fund has a working capital of over 5 Crores...</p>
                                    <p className='mb-3'>Our Portfolio Includes</p>

                                    <div className='grid grid-cols-1 gap-4 gap-y-3 pt-3 pb-8 pr-5'>
                                        <div className='flex items-center gap-3'>
                                            <div className='border-2 border-custom-blue p-1 rounded-full'>
                                                <CleanHandsTwoToneIcon className='text-2xl text-custom-blue' />
                                            </div>
                                            <div>
                                                <h1 className='text-sm'>Investments in Public Equities</h1>
                                                <p className='text-xs font-light'>Poonawala Group • ITC • CDSL and 27 more!</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <div className='border-2 border-custom-blue p-1 rounded-full'>
                                                <CurrencyExchangeTwoToneIcon className='text-2xl text-custom-blue' />
                                            </div>
                                            <div>
                                                <h1 className='text-sm'>Investments as a VC</h1>
                                                <p className='text-xs font-light'>AlphaMint Labs • BluSmart and 4 more!</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <div className='border-2 border-custom-blue p-1 rounded-full'>
                                                <MoneyTwoToneIcon className='text-2xl text-custom-blue' />
                                            </div>
                                            <div>
                                                <h1 className='text-sm'>Alternate Investments</h1>
                                                <p className='text-xs font-light'>Antler India (LPs) • Gold • REITs • InvITs • Forex</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className='w-full'>
                                    <iframe
                                        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', width: '100%', height: '200px', objectFit: 'cover', border: '1px solid gray' }}
                                        currentIndex={selectedIndex}
                                        src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded video"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>


                        <SwiperSlide style={{ maxWidth: '0', minWidth: '0' }}></SwiperSlide>

                    </Swiper>
                </div>

                {/* <div className='block lg:hidden'>
                    <div className='getId all-parent-container'>

                       

                        <div className='rounded-xl bg-custom-blue all-courses bg-opacity-5 flex flex-col-reverse items-start' id={0}>
                            <div className='p-3'>
                                <h1 className='text-2xl font-bold text-white'>Launch and Build your own Products & Business</h1>
                                <p className='text-sm font-light my-3'>From finding the right idea to building the product to getting sales and building financial models you will learn how different careers look like in a corporation.</p>
                                <p className='text-sm font-light my-3'>Get exposure to over <span className='font-semibold'>50+ Career option.</span>
                                </p>

                                <p className='hidden lg:block'>Some of our Student Brands</p>

                                <div className='flex lg:hidden justify-between items-center'>
                                    <p>Some of our Student Brands</p>
                                    <Button className='hidden lg:block' endIcon={<OutboundOutlinedIcon />} size='large' variant='text' sx={{ color: '#0CC5DB', ":hover": { color: '#3EE8B5' }, textTransform: 'capitalize', width: '160px' }}>See All</Button>
                                </div>

                                <div className='grid lg:hidden grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-8 pr-5'>
                                    <img className='h-12 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                    <img className='h-12 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                </div>

                            </div>

                            <div className='w-full'>
                                <iframe
                                    style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', width: '100%', height: '200px', objectFit: 'cover', border: '1px solid gray' }}
                                    currentIndex={selectedIndex}
                                    src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Embedded video"
                                />
                            </div>
                        </div>

                       

                        <div className='rounded-xl bg-custom-blue all-courses bg-opacity-5 flex flex-col-reverse items-start' id={1}>
                            <div className='p-3'>
                                <h1 className='text-2xl font-bold text-white'>Become a Creator-preneur</h1>
                                <p className='text-sm font-light my-3'>From finding the right idea to building the product to getting sales and building financial models you will learn how different careers look like in a corporation.</p>

                                <div className='flex lg:hidden justify-between items-center'>
                                    <p>Some of our Student Brands</p>
                                    <Button className='hidden lg:block' endIcon={<OutboundOutlinedIcon />} size='large' variant='text' sx={{ color: '#0CC5DB', ":hover": { color: '#3EE8B5' }, textTransform: 'capitalize', width: '160px' }}>See All</Button>
                                </div>

                                <div className='grid lg:hidden grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-8 pr-5'>
                                    <img className='h-12 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                    <img className='h-12 hover:shadow-md hover:shadow-custom-blue transition-all duration-100 ease-in cursor-pointer p-2 rounded-xl' src={logo2} alt="logo" />
                                </div>

                            </div>

                            <div className='w-full'>
                                <iframe
                                    style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', width: '100%', height: '200px', objectFit: 'cover', border: '1px solid gray' }}
                                    currentIndex={selectedIndex}
                                    src='https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4'
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Embedded video"
                                />
                            </div>
                        </div>

                        <div className='bg-custom-blue all-courses bg-opacity-5' id={2}></div>
                        <div className='bg-custom-blue all-courses bg-opacity-5' id={3}></div>
                        <div className='bg-custom-blue all-courses bg-opacity-5' id={4}></div>
                        <div className='bg-custom-blue all-courses bg-opacity-5' id={5}></div>
                        <div className='bg-custom-blue all-courses bg-opacity-5' id={6}></div>
                    </div>
                </div> */}

            </div>
        </div>
    );
};

export default AllCourses;