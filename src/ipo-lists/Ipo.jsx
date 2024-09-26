import React, { useState, useEffect } from "react";
import "./Ipo.scss";
import { get } from "../services/api";
import { apiUrls } from "../services/apiUrls";
import { useNavigate } from "react-router-dom";

const Ipo = () => {
  const [ipos, setIpos] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await get(apiUrls.List.Ipo);
      setIpos(response.data);
      console.log(response.data, "data is coming");
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleIpoDetails = (details) => {
    navigate(`/Details/${details.id}`, { state: { details } });
  };

  return (
    <>
      <section>
        <div className="m-3">
          <h5>Recent IPO List</h5>
          <div className="table-responsive w-100">
            <table className="table">
              <thead>
                <tr>
                  <th>Company / Issue date</th>
                  <th>Issue size</th>
                  <th>Price range</th>
                  <th>Min invest/qty</th>
                </tr>
              </thead>
              <tbody>
                {ipos.map((item, index) => (
                  <tr key={item.id}>
                    <td>
                     <button className="d-flex align-items-center text-black text-start bg-transparent border-0" 
                      onClick={() => handleIpoDetails(item)}>
                      <span className="profile">
                      <img
                        src={item.imgUrl}
                        alt=""
                        className="profile-photo"
                        />
                        </span>
                      <div>
                      <span className="fw-medium mx-2">{item.name}</span><br/>
                      <span className="text-body-secondary mx-2">{item.issueDate}</span>
                      </div>
                      </button>
                    </td>
                    <td className="fw-medium">&#8377;{item.issueSize} Crores</td>
                    <td className="fw-medium">&#8377;{item.priceRange}</td>
                    <td>
                      <span className="fw-medium">&#8377;{item.minimumAmount}</span><br/>
                      <span className="fw-light text-body-secondary">{item.lotSize} Shares/5 Lots</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Ipo;
