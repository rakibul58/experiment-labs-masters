import React, { useState } from "react";
import Layout from "../Layout";
import RedeemGifts from "./RedeemGifts";
import PointsStatistics from "./PointsStatistics";
import RedemptionProduct from "./RedemptionProduct";
const cheaps = [
  "Skill support",
  "Training",
  "Software support",
  "Competition",
  "Networking events",
  "Counselling",
  "Domain",
  "Get featured",
  "Media coverage",
  "Vouchers",
  "Shadow internship",
];
const cardsData = [
  {
    image: "../../../assets/Dashboard/CreateYourPortfolio.png",
    name: "Execution support",
    description:
      "Redeem an hour with our faculty for your doubts and interaction.",
    cheap: "Skill support",
  },
  {
    image: "../../../assets/Dashboard/CreateYourPortfolio.png",
    name: "No code support",
    description: "Redeem an hour of support for no code software",
    cheap: "Skill support",
  },
  {
    image: "../../../assets/Dashboard/CreateYourPortfolio.png",
    name: "Sales support",
    description:
      "Redeem an hour with our faculty for sales support of your product",
    cheap: "Skill support",
  },
  {
    image: "../../../assets/Dashboard/CreateYourPortfolio.png",
    name: "Presentation skill",
    description:
      "Redeem an hour with our faculty to build up your presentation skills",
    cheap: "Skill support",
  },
  {
    image: "../../../assets/Dashboard/CreateYourPortfolio.png",
    name: "Technical support",
    description: "Redeem an hour with our faculty technical support",
    cheap: "Skill support",
  },
  {
    image: "../../../assets/Dashboard/CreateYourPortfolio.png",
    name: "Design support",
    description: "Redeem an hour with our faculty for your design queries",
    cheap: "Skill support",
  },
  {
    image: "../../../assets/Dashboard/CreateYourPortfolio.png",
    name: "Communication skill",
    description:
      "Redeem an hour with our faculty to enhance your communication skill",
    cheap: "Skill support",
  },
  {
    image: "../../../assets/Dashboard/CreateYourPortfolio.png",
    name: "Product photography",
    description:
      "Redeem an hour with our faculty to enhance the product photography of your product",
    cheap: "Skill support",
  },
];

const Redemption = () => {
  const [state, setState] = useState("Points statistics");
  const [redemptionProduct, setRedemptionProduct] = useState();
  return (
    <div>
      <Layout>
        {state === "Points statistics" && (
          <PointsStatistics state={state} setState={setState} />
        )}
        {state === "Redeem gifts" && (
          <RedeemGifts
            cheaps={cheaps}
            cardsData={cardsData}
            state={state}
            setState={setState}
            setRedemptionProduct={setRedemptionProduct}
          />
        )}
        {state === "Redemption product" && (
          <RedemptionProduct
            state={state}
            setState={setState}
            redemptionProduct={redemptionProduct}
          />
        )}
      </Layout>
    </div>
  );
};

export default Redemption;
