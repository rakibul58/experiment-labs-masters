import React, { useState } from "react";
import LiveClass from "../../../assets/Dashboard/LiveClass.png";
import HttpsIcon from "@mui/icons-material/Https";

const ClassesTask = ({ taskData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState("Category");
  const options = ["Category name"];

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const providedDateTimeString = taskData?.meetingData?.start_time;
  const providedDateTime = new Date(providedDateTimeString); // Parse the provided date string

  const currentDateTime = new Date(); // Get the current date and time

  // Calculate the time difference in milliseconds
  const timeDifferenceInMilliseconds = providedDateTime - currentDateTime;

  // Convert the time difference to minutes and seconds
  const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000; // Convert to seconds
  const minutes = Math.floor(timeDifferenceInSeconds / 60); // Calculate minutes
  const seconds = Math.floor(timeDifferenceInSeconds % 60); // Calculate remaining seconds

  console.log(minutes);

  return (
    <div>
      <div
        className={`relative  w-[400px] mt-[40px] px-4 mb-[10px] flex items-center gap-[32px] `}
      >
        {isOpen && (
          <ul className="absolute top-full left-0 w-full bg-gray-200 border border-gray-300 py-1 px-4 rounded mt-1 transition-opacity duration-300 ease-in-out delay-100">
            {options.map((option, index) => (
              <li
                key={index}
                className="cursor-pointer py-2 text-[#6A6A6A] text-[14px] font-[400] "
                onClick={() => selectOption(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="h-full flex flex-col items-center justify-center ">
        <div
          className="  border-x-[30px] mt-[40px] border-t-[30px] border-b-[50px] rounded-lg border-[#292929] w-[865px] h-[500px] bg-[#434343] flex items-center justify-center flex-col "
          width="865px"
          height="500px"
        >
          {minutes <= 10 && minutes >= 0 && (
            <>
              <div className="w-[298.63px] h-[61.49px] px-[23.42px] py-[11.71px] bg-red-600 rounded-lg justify-start items-center gap-[8.71px] inline-flex mb-[50px]">
                <div className="w-[38.06px] h-[38.06px] relative">
                  <div className="w-[33.47px] h-[33.47px] left-[2.60px] top-[0.87px] absolute bg-white rounded-full" />
                  <img
                    className="w-[38.06px] h-[38.06px] left-0 top-[-0px] absolute"
                    src={LiveClass}
                    alt="LiveClass"
                  />
                </div>
                <div className="text-white text-xl font-semibold uppercase">
                  Live class Started
                </div>
              </div>
              <div>
                <button
                  className={`bg-[#3E4DAC] text-white w-[150px] h-[50px] text-[16px] font-[600] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#CA5F98] lg:shadow-[0px_8px_0px_0px_#CA5F98]`}
                >
                  Join
                </button>
              </div>
            </>
          )}
          {minutes > 10 && (
            <div className="text-center font-sans">
              <h1 className="text-white text-[18px] font-bold ">
                The live class will be start from
              </h1>
              <h1 className="text-white text-[24px] font-bold ">
                {providedDateTime?.toDateString()}
              </h1>
              <h1 className="text-white text-[24px] font-bold ">
                {providedDateTime?.toLocaleTimeString()}
              </h1>
              <button
                className={`bg-[#3E4DAC] flex items-center gap-4 justify-center mx-auto opacity-75 mt-5 text-white w-[150px] h-[50px] text-[16px] font-[600] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#CA5F98] lg:shadow-[0px_8px_0px_0px_#CA5F98]`}
              >
                <HttpsIcon />
                Join
              </button>
            </div>
          )}
          {minutes < -1 * taskData?.meetingData?.duration && (
            <div>
              <video
                width="90%"
                height="80vh"
                controls
                controlsList="nodownload"
              >
                <source
                  // src={taskData?.additionalFiles}
                  src="https://www.youtube.com/embed/0OK91ijimIU"
                  type="video/mp4"
                />
              </video>
            </div>
          )}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="242"
          height="41"
          viewBox="0 0 242 41"
          fill="none"
        >
          <path
            d="M0.644531 39.9622L26.4817 0.385742H65.0977L39.0903 39.9622H0.644531Z"
            fill="#292929"
          />
          <path
            d="M241.117 40.3391L216.036 0.385742H178.549L203.796 40.3391H241.117Z"
            fill="#292929"
          />
        </svg>
      </div>
    </div>
  );
};

export default ClassesTask;
