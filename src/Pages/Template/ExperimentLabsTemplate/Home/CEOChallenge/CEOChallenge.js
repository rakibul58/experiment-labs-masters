import React from "react";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import "./style.css";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import ReactGA from "react-ga4";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CEOChallenge = ({ceoChallengeData}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    ReactGA.event({
      category: "Click",
      action: "Apply Now",
      label: "Apply Now",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    ReactGA.event({
      category: "Click",
      action: "Submit Data",
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

    console.log(data);

    fetch(
      "https://sheet.best/api/sheets/5c4ca56d-67bb-4f49-a538-9fdde568c68d",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((data) => {
        // The response comes here
        console.log(data);
      })
      .catch((error) => {
        // Errors are reported there
        console.log(error);
      });

    const templateParams = {
      from_name: name,
      message: `
            Name: ${name},
            Number: ${"+91" + number},
            Email: ${email},
            ${option},
            City: ${city},
            Time: ${new Date()},
            `,
    };

    emailjs
      .send(
        "service_s3bklnu",
        "template_l0yacbb",
        templateParams,
        "U0g6Ht1DVmnBbENk0"
      )
      .then(
        (result) => {
          console.log(result.text);
          // toast.success("Message Sent");
          event.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );

    const a = document.createElement("a");
    a.href = ceoChallengeData?.ceoChallengePdf;
    a.download = "HandBook.pdf"; // Set the desired file name
    a.click();
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(-270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
      }}
      className="mt-48"
    >
      <div
        className="p-10 lg:p-24 flex flex-col justify-center items-center text-center"
        style={{ height: "100%" }}
      >
        <h1 className="font-bold text-2xl lg:text-4xl">
          {ceoChallengeData?.ceoChallengeTitle}
        </h1>
        <p className="mt-5 mb-8 text-lg lg:text-2xl font-light">
          {ceoChallengeData?.ceoChallengeDescription}
        </p>
        <button
          onClick={handleClickOpen}
          className="bg-pink hover:bg-purple py-2 px-8 font-bold text-sm lg:text-lg rounded-3xl"
        >
          {ceoChallengeData?.ceoChallengeButton}
        </button>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="bg-dark w-full min-w-[300px] sm:min-w-[350px] lg:w-[500px] p-5 cursor-pointer">
          <div className="w-full">
            <h4
              onClick={handleClose}
              className="text-xl text-white text-right hover:text-purple"
            >
              x
            </h4>
            <h1 className="text-2xl font-semibold text-pink text-center">
              DOWNLOAD Career Handbook
            </h1>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off" className="lg:px-10">
            <div className="flex flex-col items-center mt-6 gap-1 text-white">
              <label htmlFor="name">Enter Name</label>
              <input
                required
                className="text-center w-full py-2 rounded-3xl text-black focus:outline-none"
                placeholder="Enter your Name"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="flex flex-col items-center mt-6 gap-1 text-white">
              <label htmlFor="number">Enter Number</label>
              <input
                required
                className="text-center w-full py-2 rounded-3xl text-black focus:outline-none"
                placeholder="Enter your number"
                type="number"
                name="number"
                id="number"
              />
            </div>
            <div className="flex flex-col items-center mt-6 gap-1 text-white">
              <label htmlFor="email">Enter Email</label>
              <input
                required
                className="text-center w-full py-2 rounded-3xl text-black focus:outline-none"
                placeholder="Enter your email"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="flex flex-col items-center mt-6 gap-1 text-white">
              <label htmlFor="option">Select One</label>
              <select
                required
                className="text-center w-full py-2 rounded-3xl text-black focus:outline-none"
                name="option"
                id="option"
              >
                <option value="Student">Student</option>
                <option value="Parent">Parent</option>
                <option value="Counselor">Counselor</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="flex flex-col items-center mt-6 gap-1 text-white">
              <label htmlFor="city">Enter City</label>
              <input
                required
                className="text-center w-full py-2 rounded-3xl text-black focus:outline-none"
                placeholder="Enter your city"
                type="text"
                name="city"
                id="city"
              />
            </div>
            <div className="flex flex-col items-center mt-6 gap-1 text-white">
              <input
                className="text-white py-2 font-bold rounded-3xl bg-pink hover:bg-purple w-1/2 text-center"
                type="submit"
                value={"Download"}
              />
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default CEOChallenge;
