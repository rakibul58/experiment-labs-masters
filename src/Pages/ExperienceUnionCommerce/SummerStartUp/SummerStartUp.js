import React from "react";
import background from "../../../assets/background.avif";
import img from "../../../assets/feature/Rectangle 27L.png";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import darkbg from "../../../assets/darkbg.jpg";
import Person3Icon from "@mui/icons-material/Person3";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import ListIcon from "@mui/icons-material/List";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import emailjs from "@emailjs/browser";
import axios from "axios";
import Swal from "sweetalert2";

import ReactGA from "react-ga4";
const SummerStartUp = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Clicked");
    ReactGA.event({
      category: "Click",
      action: "Submit Data From Navbar",
      label: "Submit Data",
    });
    const form = event.target;
    const name = form.name.value;
    const number = form.number.value;
    const email = form.email.value;
    const option = form.option.value;
    const city = form.city.value;

    const data = {
      Name: name,
      Number: "+91" + number,
      Email: email,
      Option: option,
      City: city,
      Time: new Date(),
    };

    console.log("Gone Here ===============>", data);

    fetch(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/interactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then(async (res) => {
        console.log("Submit ===============>", res);
        const sendMail = await axios.post(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/sendMail`,
          {
            from: `${email}`,
            to: `naman.j@experimentlabs.in`,
            subject: `${name} wants to Learn more about Experiment Labs`,
            message: `
            Name: ${name},
            Number: "+91" + ${number},
            Email: ${email},
            Option: ${option},
            City: ${city},
            Tme: ${new Date()},
            `,
          }
        );
        console.log("Send Mail ===============>", sendMail);
        if (sendMail?.data?.success) {
          Swal.fire({
            icon: "success",
            text: "Thanks For your response!",
          });
        }
        // handleClose();
      })
      .catch((error) => {
        // Errors are reported there
        console.log(error);
      });
  };
  return (
    <div className="text-white">
      <div
        style={{
          background: `url(${darkbg})`,
          width: "100%",
          objectFit: "cover",
        }}
        className="lg:px-28 py-20 pt-40"
      >
        <div className="px-5 xl:px-32 flex flex-col lg:flex-row gap-20 justify-between items-center">
          <div className="w-full">
            <h1 className="text-4xl lg:text-6xl font-bold">
              Leadership Through{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green">
                Business
              </span>
            </h1>
            <div className="hidden lg:block">
              <h4 className="text-2xl font-bold my-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green">
                  Programme
                </span>{" "}
                Includes
              </h4>
              <div className="flex flex-col gap-4">
                <span className="flex gap-2 items-start">
                  <ArrowCircleRightIcon sx={{ color: "rgb(12 197 219)" }} />{" "}
                  <span>
                    Get exposed to{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green">
                      50+
                    </span>{" "}
                    Careers like Entrepreneurship, Consulting, Finance,
                    Operations, Sales, Marketing and Many More
                  </span>
                </span>
                <span className="flex gap-2 items-start">
                  <ArrowCircleRightIcon sx={{ color: "rgb(12 197 219)" }} />
                  <span>
                    {" "}
                    Learn from top{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green">
                      CXO
                    </span>
                    ,{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green">
                      MDs{" "}
                    </span>
                    and{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green">
                      Industry{" "}
                    </span>
                    <span>leaders from top B-schools.</span>
                  </span>
                </span>
                <span className="flex gap-2 items-start">
                  <ArrowCircleRightIcon sx={{ color: "rgb(12 197 219)" }} />
                  <span>
                    A unique gamified pedagogy that makes you a successful
                    leader.
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="w-full">
            <form onSubmit={handleSubmit} className="bg-[#424242] p-8 rounded-md border-2 border-custom-blue border-opacity-40 w-full lg:max-w-[480px]">
              <div>
                <label>
                  Name<span className="text-red-600">*</span>
                </label>
                <div className="flex gap-2 mt-4 border px-3 py-3 rounded-md">
                  <Person3Icon />
                  <input
                    required
                    className="w-full bg-transparent border-0 focus:outline-0"
                    type="text"
                    placeholder="Enter Your name"
                    name="name"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label>
                  Email<span className="text-red-600">*</span>
                </label>
                <div className="flex gap-2 mt-4 border px-3 py-3 rounded-md">
                  <EmailIcon />
                  <input
                    required
                    className="w-full bg-transparent border-0 focus:outline-0"
                    type="email"
                    placeholder="Enter Your email"
                    name="email"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label>
                  Mobile Number<span className="text-red-600">*</span>
                </label>
                <div className="flex gap-2 mt-4 border px-3 py-3 rounded-md">
                  <CallIcon />
                  <input
                    required
                    className="w-full bg-transparent border-0 focus:outline-0"
                    type="text"
                    placeholder="Enter Your mobile number"
                    name="number"
                    minLength="10"
                    maxLength="10"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="option">Select One<span className="text-red-600">*</span>
                </label>
                <div className=" flex gap-2 mt-4 border px-3 py-3 rounded-md">
                  <CallIcon />
                  <select
                    required
                    className="w-full bg-[#424242] border-0 focus:outline-0"
                    name="option"
                    id="option"
                  >
                    <option className="bg" value="Student">Student</option>
                    <option value="Parent">Parent</option>
                    <option value="Counselor">Counselor</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

              </div>
              <div className="mt-6">
                <label>
                  City<span className="text-red-600">*</span>
                </label>
                <div className="flex gap-2 mt-4 border px-3 py-3 rounded-md">
                  <Person3Icon />
                  <input
                    required
                    className="w-full bg-transparent border-0 focus:outline-0"
                    type="text"
                    placeholder="Enter Your name"
                    name="city"
                  />
                </div>
              </div>

              {/*    <div className="mt-6">
                <label>
                  Class<span className="text-red-600">*</span>
                </label>
                <div className="flex gap-2 mt-4 border px-3 py-3 rounded-md">
                  <ListIcon />
                  <select
                    className="w-full bg-[#424242] border-0 focus:outline-0"
                    type=""
                    placeholder="Enter Your mobile number"
                  >
                    <option>Select the option</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                  </select>
                </div>
              </div> */}

              <div className="mt-8 flex gap-2 items-start">
                <input
                  className="w-full bg-gradient-to-r from-cyan to-green hover:shadow-lg hover:shadow-[#121212] py-3 rounded-md hover:bg-opacity-60 hover:transition-all hover:delay-200 hover:ease-out font-bold"
                  type="submit"
                  value={"Submit"}
                />
              </div>
            </form>
          </div>
          <div className="block lg:hidden">
            <h4 className="text-2xl font-bold my-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green">
                Programme
              </span>{" "}
              Includes
            </h4>
            <div className="flex flex-col gap-4">
              <span className="flex gap-2 items-start">
                <ArrowCircleRightIcon sx={{ color: "rgb(12 197 219)" }} />{" "}
                <span>
                  Get exposed to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green">
                    50+
                  </span>{" "}
                  Careers like Entrepreneurship, Consulting, Finance,
                  Operations, Sales, Marketing and Many More
                </span>
              </span>
              <span className="flex gap-2 items-start">
                <ArrowCircleRightIcon sx={{ color: "rgb(12 197 219)" }} />
                <span>
                  {" "}
                  Learn from top{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green">
                    CXO
                  </span>
                  ,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green">
                    MDs{" "}
                  </span>
                  and{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green">
                    Industry{" "}
                  </span>
                  <span>leaders from top B-schools.</span>
                </span>
              </span>
              <span className="flex gap-2 items-start">
                <ArrowCircleRightIcon sx={{ color: "rgb(12 197 219)" }} />
                <span>
                  A unique gamified pedagogy that makes you a successful leader.
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#141414] px-10 lg:px-32 py-20">
        <div className="hidden lg:block">
          <div className="w-full bg-[#6278ff73] rounded-2xl mt-16 p-5 flex flex-col justify-center lg:flex-row lg:justify-evenly lg:items-start gap-3 gap-y-10 border-opacity-30">
            <div className="h-full">
              <div className="flex gap-2 items-center text-sm">
                <AccessTimeIcon />
                <span>Duration</span>
              </div>
              <div className="mt-2">
                <h1 className="text-2xl font-bold">12 Week</h1>
                <p className="font-thin mt-2 text-sm">
                  Includes 7 day industry immersion
                </p>
              </div>
            </div>
            <div
              className="lg:border-l border-t lg:border-t-0 lg:pt-0 pt-8 lg:px-8  "
              style={{ borderLeft: "6px solid rgba(85, 96, 211, 0.5)" }}
            >
              <div className="flex gap-2 items-center text-sm">
                <LocationOnIcon />
                <span>Location</span>
              </div>
              <div className="mt-2">
                <h1 className="text-2xl font-bold">Hybrid</h1>
                <p className="font-thin mt-2 text-sm">Online and in campus</p>
              </div>
            </div>
            <div
              className="lg:border-l border-t lg:border-t-0 lg:pt-0 pt-8 lg:px-8"
              style={{ borderLeft: "6px solid rgba(85, 96, 211, 0.5)" }}
            >
              <div className="flex gap-2 items-center text-sm">
                <LiveTvIcon />
                <span>Format</span>
              </div>
              <div className="mt-2">
                <h1 className="text-2xl font-bold">Hybrid</h1>
                <p className="font-thin mt-2 text-sm">Multiple methods</p>
              </div>
            </div>
            <div
              className="lg:border-l border-t lg:border-t-0 lg:pt-0 pt-8 lg:px-8 h-full"
              style={{ borderLeft: "6px solid rgba(85, 96, 211, 0.5)" }}
            >
              <div className="flex gap-2 items-center text-sm">
                <CalendarTodayIcon />
                <span>Commencement Date</span>
              </div>
              <div className="mt-2">
                <h1 className="text-2xl font-bold">July 11,2023</h1>
                <p className="font-thin mt-2 text-sm">Limited seats only</p>
              </div>
            </div>
          </div>
        </div>

        <div className="block lg:hidden ">
          <div className="w-full sm:hidden bg-[#6278ff73] rounded-2xl mt-16 p-5 flex flex-col justify-center lg:flex-row lg:justify-evenly lg:items-start gap-3 gap-y-10 border-opacity-30">
            <div className="h-full">
              <div className="flex gap-2 items-center text-sm">
                <AccessTimeIcon />
                <span>Duration</span>
              </div>
              <div className="mt-2">
                <h1 className="text-2xl font-bold">12 Week</h1>
                <p className="font-thin mt-2 text-sm">
                  Includes 7 day industry immersion
                </p>
              </div>
            </div>
            <div className="lg:border-l border-t lg:border-t-0 lg:pt-0 pt-8 lg:px-8  ">
              <div className="flex gap-2 items-center text-sm">
                <LocationOnIcon />
                <span>Location</span>
              </div>
              <div className="mt-2">
                <h1 className="text-2xl font-bold">Hybrid</h1>
                <p className="font-thin mt-2 text-sm">Online and in campus</p>
              </div>
            </div>
            <div className="lg:border-l border-t lg:border-t-0 lg:pt-0 pt-8 lg:px-8">
              <div className="flex gap-2 items-center text-sm">
                <LiveTvIcon />
                <span>Format</span>
              </div>
              <div className="mt-2">
                <h1 className="text-2xl font-bold">Hybrid</h1>
                <p className="font-thin mt-2 text-sm">Multiple methods</p>
              </div>
            </div>
            <div className="lg:border-l border-t lg:border-t-0 lg:pt-0 pt-8 lg:px-8 h-full">
              <div className="flex gap-2 items-center text-sm">
                <CalendarTodayIcon />
                <span>Commencement Date</span>
              </div>
              <div className="mt-2">
                <h1 className="text-2xl font-bold">July 11,2023</h1>
                <p className="font-thin mt-2 text-sm">Limited seats only</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#141414] flex flex-col-reverse lg:flex-row-reverse px-10 lg:px-32 py-20 justify-start lg:justify-evenly gap-y-16 lg:items-center text-white">
        <div className="max-w-[500px]">
          <h1 className="text-3xl lg:text:5xl font-semibold mt-4">
            What is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green">
              Business Lab?
            </span>
          </h1>
          <p className="mt-4 lg:text-xl">
            Business Lab by Experiment Labs is a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green">
              unique pedagogy
            </span>{" "}
            where you explore careers and become a leader by building a
            business. With exposure to over{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green">
              50+
            </span>{" "}
            careers and hands-on execution you build a successful career path
            based on skills and interests.{" "}
          </p>
        </div>
        <div className=" lg:min-w-[400px] lg:max-w-[400px] w-full">
          <img
            style={{ objectFit: "cover" }}
            className=" h-full w-full  rounded-lg "
            src={img}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default SummerStartUp;
