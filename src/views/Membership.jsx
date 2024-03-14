import React, { useState, useEffect } from "react";
import Navbar from "../layouts/Navbar";
import TopBar from "../layouts/TopBar";

function Membership() {
  const [membershipData, setMembershipData] = useState({
    monthlyCharge: "$89.99",
    benefits: [
      "Free Delivery",
      "Fast Delivery",
      "Early Access to Lightning Deals",
      "And more...",
    ],
  });

  const handleEdit = () => {
    console.log("Edit button clicked");
  };

  return (
    <div className="flex flex-col h-screen bg-main-bg bg-cover">
      <TopBar />
      <div className="flex flex-grow">
        <Navbar />
        <div className="flex-grow">
          <div className="p-4">
            <h1 className="font-bold text-lg my-6 ml-4">Membership Pricing</h1>
            <div className="bg-white flex flex-grow justify-center items-center rounded-lg shadow text-xl">
              <div className="rounded-lg p-4">
                <div className="mb-6 flex flex-col justify-center items-center gap-3">
                  <p className="font-semibold">Membership Charges</p>
                  <p>Monthly Charge</p>
                  <p className="font-semibold text-[#4880ff] text-xl">
                    {membershipData.monthlyCharge}
                  </p>
                </div>
                <hr className="my-6 w-[800px]" />
                <div className="mb-6 flex flex-col justify-center items-center gap-3">
                  <p className="font-semibold">Benefits</p>
                  <ul className="flex flex-col justify-center items-center gap-2">
                    {membershipData.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <hr className="my-6" />
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="w-3/4 bg-[#4880ff] hover:bg-[#417aff] hover:shadow-md text-white py-2 px-4 rounded-lg"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;
