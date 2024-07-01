import React, { useEffect, useRef } from "react";

import ReactGA from "react-ga4";
import MyHelmet from "../../../../Components/MyHelmet/MyHelpmet";
import tick from "../../../../assets/OnePager/CourseInfo/material-symbols_done.svg";
import rupee from "../../../../assets/OnePager/CourseInfo/mdi_rupee.svg";
import benefitIcon1 from "../../../../assets/OnePager/LearnerBenefit/benefitIcon1.svg";
import benefitIcon2 from "../../../../assets/OnePager/LearnerBenefit/benefitIcon2.svg";
import benefitIcon3 from "../../../../assets/OnePager/LearnerBenefit/benefitIcon3.svg";
import ellipse from "../../../../assets/OnePager/LearnerBenefit/Ellipse.svg";
import gameIcon from "../../../../assets/OnePager/LearnerBenefit/lets-icons_gamepad-light.svg";
import businessIcon from "../../../../assets/OnePager/LearnerBenefit/material-symbols-light_business-center-outline.svg";
import chalkboardIcon from "../../../../assets/OnePager/LearnerBenefit/la_chalkboard-teacher.svg";
import leaderIcon from "../../../../assets/OnePager/LearnerBenefit/fluent-mdl2_party-leader.svg";
import compuerIcon from "../../../../assets/OnePager/LearnerBenefit/material-symbols-light_computer-outline.svg";
import questionIcon from "../../../../assets/OnePager/LearnerBenefit/radix-icons_question-mark-circled.svg";
import OnePagerHero from "./OnePagerHero";
import Nikhil from "../../../../assets/OnePager/Reviews/Nikhil.jpg";
import Nikhil1 from "../../../../assets/OnePager/Reviews/Nikhil1.jpg";
import harsh from "../../../../assets/OnePager/Reviews/harsh.jpg";
import guptaImg from "../../../../assets/Masters/guptaImg.png";
import guptaLogo from "../../../../assets/Masters/guptaLogo.png";
import handaImg from "../../../../assets/Masters/handaImg.png";
import handaLogo from "../../../../assets/Masters/handaLogo.png";
import jainImg from "../../../../assets/Masters/jainImg.png";
import jainLogo from "../../../../assets/Masters/jainLogo.png";
import gargImg from "../../../../assets/Masters/gargImg.png";
import gargLogo from "../../../../assets/Masters/gargLogo.png";
import moulikImg from "../../../../assets/Masters/moulikImg.png";
import moulikLogo from "../../../../assets/Masters/moulikLogo.png";
import collan from "../../../../assets/collan.png";
import OnePagerMeetTheMaster from "./OnePagerMeetTheMaster";
import Reviews from "./Reviews";
import PeopleSpeak from "./PeopleSpeak";

import ExploreCourse from "./ExploreCourse";
import LearningBenefit from "./LearningBenefit";

const OnePagerHome = () => {

  const data = {
    heroData: {
      // heroImg: heroImg,
      heroTitle: "Discover Your Path to a Successful Career with Real-World Experience",
      heroDescription: "Build leadership like a muscle",
      heroButton: "Learn More",
    },

    meetTheMasterData: [

      {
        masterName: "Shekhar gupta",
        profession: "Ex-Group Product Manager, Nykaa",
        masterImage: guptaImg,
        logo: guptaLogo

      },
      {
        masterName: "Pulkit Handa",
        profession: "Director-Sales, Magicpin",
        masterImage: handaImg,
        logo: handaLogo

      },
      {
        masterName: "Naman Jain",
        profession: "Founder, Experiment Labs",
        masterImage: jainImg,
        logo: jainLogo

      },
      {
        masterName: "Aayush Garg",
        profession: "Ex-Head of Growth, Zilingo",
        masterImage: gargImg,
        logo: gargLogo

      },
      /*   {
          masterName: "Siddharth Moulik",
          profession : "Ad Film Director",
          masterImage : moulikImg,
          logo : moulikLogo
         
        }, */


    ],

    reviewsData: [

      {
        reviewerName: "Nikhil",
        class: "9 th class student",
        rating: "5",
        comment: "Experiment Labs provided an unparalleled hands-on experience. The projects challenged me to apply theoretical knowledge to real-world scenarios. The mentors were always available, guiding us through complex problem-solving. It's a fantastic environment for anyone pursuing a career in technology.",
        reviewerImage: Nikhil,

      },
      {
        reviewerName: "harsh",
        class: "10 th class Student",
        rating: "5",
        comment: "Experiment Labs has been a game-changer for my engineering studies. The practical simulations aligned perfectly with my coursework. The lab reports and feedback from mentors helped me refine my skills. I appreciate the emphasis on both individual learning and group projects, preparing us for the professional world.",
        reviewerImage: harsh,

      },

      {
        reviewerName: "Nikhil",
        class: "10 th class Student",
        rating: "5",
        comment: "The leadership class at Experiment Labs has been a transformative experience for me. The hands-on approach to learning has allowed me to apply leadership principles in real-world scenarios. The simulations and team projects have not only honed my leadership skills but also provided insights into my own strengths and areas for improvement. .",
        reviewerImage: Nikhil1,

      },

    ],


    peopleSpeakData: {
      image: collan,
      organizationName: "Experiment Labs",
      reviews: [
        {
          videoLink: "https://www.youtube.com/embed/lKkFKWQvaLs"
        },
        {
          videoLink: "https://www.youtube.com/embed/B4QHMqNAP2g"
        },
        {
          videoLink: "https://www.youtube.com/embed/wa617J4UUpw"
        },
      ]
    },
    CourseInfoData: {
      courseInfoTick: tick,
      courseInfoOutHeading: "Explore our Courses",
      courseInfoOutUnderHeading: "Most students choice",
      courseInfoInHeading: "Get all Subject knowledge",
      courseInfoInHeadline: "Course",
      courseInfoInTitle: "Learn valuable subjects to build a successful career.",
      courseInfoInDescription: "Make your career interesting and pursue an in-demand profession with our professional teachers to gain knowledge.",
      courseInfoInShowMoreButton: "Show more",
      courseInfoInOutline: "Course Subjects",
      courseInfoPriceIcon: rupee,
      courseInfoPrice: "770.00",
      courseInfoButton: "Enroll now",
      courseInfoSubjects: [
        "Business",
        "Creative suit",
        "Legal",
        "Technology",
      ]
    },
    LearnerBenefitData: {
      learnerBenefitHeading: "Learning Benefits",
      learnerBenefitEllipse: ellipse,
      // benefitSystem : [
      //   {
      //     sysicon :  gameIcon,
      //     description : "Gamified Learning"
      //   },
      //   {
      //     sysicon :  businessIcon,
      //     description : "Business study"
      //   },
      //   {
      //     sysicon :  chalkboardIcon,
      //     description : "1:1 Mentorship"
      //   },
      //   {
      //     sysicon :  compuerIcon,
      //     description : "Technology"
      //   },
      //   {
      //     sysicon :  leaderIcon,
      //     description : "Leadership"
      //   },
      //   {
      //     sysicon :  questionIcon,
      //     description : "Problem solving"
      //   },

      // ],
      benefitDetails: [
        {
          icon: benefitIcon1,
          description: [
            "Understand core business concepts.",
            "Learn strategic planning and decision-making.",
            "Gain insights into market analysis and competition."
          ],
          benefitSystem: [
            {
              sysicon: gameIcon,
              description: "Gamified Learning",
            },
            {
              sysicon: businessIcon,
              description: "Business study",
            },
          ]
        },
        {
          icon: benefitIcon2,
          description: [
            "Gain proficiency in industry-relevant software.",
            "Develop creative problem-solving abilities.",
            "Enhance presentation and communication skills."
          ],
          benefitSystem: [
            {
              sysicon: chalkboardIcon,
              description: "1:1 Mentorship"
            },
            {
              sysicon: compuerIcon,
              description: "Technology"
            },
          ]
        },
        {
          icon: benefitIcon3,
          description: [
            "Learn about emerging technologies.",
            "Gain proficiency in industry-relevant software.",
            "Acquire technical skills for modern workplaces."
          ],
          benefitSystem: [
            {
              sysicon: leaderIcon,
              description: "Leadership"
            },
            {
              sysicon: questionIcon,
              description: "Problem solving"
            }
          ]
        },
      ],
    }
  }



  useEffect(() => {
    window.scrollTo(0, 0);
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home" });
  }, []);

  return (
    <div style={{ width: "100%" }} className="bg-white text-black">
      <MyHelmet>
        Experiment Labs | Career Counselling | Sell Online courses
      </MyHelmet>
      <OnePagerHero />
      <ExploreCourse courseInfoData={data.CourseInfoData}></ExploreCourse>
      <LearningBenefit learnerBenefitData={data.LearnerBenefitData}></LearningBenefit>
      <OnePagerMeetTheMaster meetTheMasterData={data.meetTheMasterData} />
      <Reviews reviewsData={data.reviewsData} />
      <PeopleSpeak peopleSpeakData={data.peopleSpeakData} />
    </div>
  );
};

export default OnePagerHome;
