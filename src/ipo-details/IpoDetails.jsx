import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { get } from "../services/api";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { apiUrls } from "../services/apiUrls";
import download from "../assets/downlaod_button.png";

import "./IpoDetails.scss";

const IpoDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [details, setDetails] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const steps = [
    "Bidding starts",
    "Bidding ends",
    "Allotment finalization",
    "Refund initiation",
    "Demat transfer",
    "Listing date",
  ];

  const stepDates = [
    "12 Dec 2023",
    "15 Dec 2023",
    "20 Dec 2023",
    "22 Dec 2023",
    "25 Dec 2023",
    "30 Dec 2023",
  ];

  const getPlDetails = async () => {
    const id = params?.id ?? "";
    if (!id) return;

    const res = await get(`${apiUrls.List.Ipo}/${id}`);
    const details = res.data ? res.data : res;
    if (details && !res?.error) {
      setDetails({ ...details });
    }
  };

  useEffect(() => {
    const details = location?.state?.details;
    if (!details) {
      getPlDetails();
      return;
    }

    setDetails({ ...details });
  }, [location?.state?.details]);

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Market Watch", link: `/Details/${params?.id}` },
  ];

  console.log(details, "data for more...");

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const getTruncatedDescription = (text) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > 100 ? words.slice(0, 100).join(" ") + "..." : text;
  };

  return (
    <>
      <section>
        <div className="m-3">
          <h5>IPO Details</h5>
        </div>
        <div className="m-3">
          <Breadcrumb items={breadcrumbItems} />
          <div className="my-5">
            {/* Compnay Header & download button */}
            <div className="pages__header">
              <h3 className="d-flex align-items-center">
                <button
                  className="back_buttton px-3 py-1 rounded bg-transparent text-dark"
                  onClick={() => navigate('/')}
                  style={{ fontSize: "2rem" }}
                >
                  &#8826;
                </button>
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className="mx-3 d-flex justify-content-center align-items-center">
                    <span className="details">
                      <img
                        src={details.imgUrl}
                        alt=""
                        className="details-photo"
                      />
                    </span>
                    <div>
                      <span className="fw-medium mx-2">{details.name}</span>
                      <br />
                      <span className="text-body-secondary mx-2 fs-5">
                        {details.registerName}
                      </span>
                    </div>
                  </div>
                  <div>
                    <button
                      className="border-0 bg-transparent"
                      onClick={handlePrint}
                    >
                      <img
                        className="mx-3"
                        src={download}
                        alt=""
                        style={{ width: "2.5rem" }}
                      />
                    </button>
                    <button
                      className="rounded-4 border-0 py-3 px-5 fs-5 text-light"
                      style={{ background: "#0b0b3a" }}
                    >
                      Apply now
                    </button>
                  </div>
                </div>
              </h3>
            </div>

            {/* Ipo Details */}
            <div className="div-border my-4 border rounded-5 border-3">
              <h4 className="m-4 fs-4">IPO Details</h4>
              <div className="m-4 border rounded-5 border-3">
                <div className="grid-container px-2">
                  <div className="m-4">
                    <span className="text-body-secondary">Issue Size</span>
                    <h4>&#8377;{details.issueSize} Cr.</h4>
                  </div>
                  <div className="m-4">
                    <span className="text-body-secondary">Price range</span>
                    <h4>&#8377;{details.priceRange}</h4>
                  </div>
                  <div className="m-4">
                    <span className="text-body-secondary">Minimum amount</span>
                    <h4>&#8377;{details.minimumAmount}</h4>
                  </div>
                  <div className="m-4">
                    <span className="text-body-secondary">Lot size</span>
                    <h4>{details.lotSize} Shares/lots</h4>
                  </div>
                  <div className="m-4">
                    <span className="text-body-secondary">Issue date</span>
                    <h4>{details.issueDate}</h4>
                  </div>
                  <div className="m-4">
                    <span className="text-body-secondary">Listed on</span>
                    <h4>{details.listedOn}</h4>
                  </div>
                  <div className="m-4">
                    <span className="text-body-secondary">Listed price</span>
                    <h4>&#8377;{details.listedPrice}</h4>
                  </div>
                  <div className="m-4">
                    <span className="text-body-secondary">Listed gains</span>
                    <h4>
                      &#8377;{details.listingGains}(
                      <span className="text-danger">
                        {details.listingGainsPercent}
                      </span>
                      )
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Stepper for the ipo */}
            <div className="div-border my-4 border rounded-5 border-3">
              <h4 className="m-4 fs-4">IPO timeline</h4>
              <div className="stepper-container">
                <div className="stepper">
                  {steps.map((step, index) => (
                    <div key={index} className={`step`}>
                      <div
                        className={`circle ${
                          index + 1 <= currentStep ? "active" : ""
                        }`}
                      >
                        {index + 1 < currentStep ? (
                          <span style={{ color: "white" }}>&#10003;</span>
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div
                        className={`label ${
                          index + 1 <= currentStep ? "active" : ""
                        }`}
                      >
                        {step}
                      </div>
                      <div className="date text-body-secondary">
                        {stepDates[index]}
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`line ${
                            index + 2 <= currentStep ? "active" : ""
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="controls">
                  <button onClick={handlePrev} disabled={currentStep === 1}>
                    Prev
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentStep === steps.length}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* About section */}
            <div className="div-border my-4 border rounded-5 border-3">
              <h4 className="mt-4 mx-4 fs-4">About the company</h4>
              <span className="d-inline-block m-4 text-body-secondary">
                {showFullDescription
                  ? details.About
                  : getTruncatedDescription(details.About)}
              </span>
              {details.About && details.About.split("").length > 100 && (
                <button className="btn btn-link text-danger" onClick={toggleDescription}>
                  {showFullDescription ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default IpoDetails;
