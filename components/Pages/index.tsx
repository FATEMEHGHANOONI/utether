import Component, { PageEl } from "@/components/Libs/Component";
import Window from "@/components/Libs/Window";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SiTether } from "react-icons/si";
import { HiArrowsUpDown } from "react-icons/hi2";
import { IconContext } from "react-icons";
import { FaCoins } from "react-icons/fa";
const pic1 =
  "https://static.vecteezy.com/system/resources/previews/014/802/050/non_2x/tether-cryptocurrency-3d-illustration-free-png.png";

const Page: PageEl = (props, state, refresh, getProps) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState(null);

  const fetchCurrencyData = () => {
    axios
      .get("https://api.tetherland.com/currencies")
      .then((response) => {
        const apiData = response.data.data;
        setData(apiData);
        setCurrency(apiData.currencies?.USDT);
      })
      .catch((err) => {
        setError(err);
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    fetchCurrencyData();
    const interval = setInterval(fetchCurrencyData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const name = "لوکال هاست";

  return (
    <div style={{ direction: "rtl", minHeight: "11vh" }}>
      <Window
        title={name}
        style={{
          minHeight: 200,
          margin: 10,
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundImage:
            "url('https://img.freepik.com/free-vector/abstract-technological-background_23-2148897676.jpg')",
          backgroundSize: "fill",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="Card01 w-96 h-auto flex flex-col items-center justify-center text-white mx-auto">
          {error && <p>Error: {error.message}</p>}
          {currency ? (
            <section className="flex items-center justify-center gap-8 my-10">
              <div className="flex flex-col gap-5 justify-around">
                <p style={{ fontFamily: "IRANSansX" }} className="ss02 flex items-center gap-1">
                  <IconContext.Provider value={{ color: "yellow", className: "global-class-name" }}>
                    <FaCoins />
                  </IconContext.Provider>
                  قیمت : {currency.price} تومان
                </p>
                <div className="flex gap-1 items-center">
                  <p style={{ fontFamily: "IRANSansX" }} className="ss02 flex items-center gap-1">
                    <img width="16" height="16" src="https://img.icons8.com/windows/32/FAB005/money-circulation.png" alt="money-circulation" />
                    تغییرات در 24 ساعت گذشته :
                  </p>
                  <p
                    style={{
                      color: currency.diff24d < 0 ? "red" : "#5eff00",
                      fontFamily: "IRANSansX",
                    }}
                    className="ss02"
                  >
                    {currency.diff24d}%
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <p style={{ fontFamily: "IRANSansX" }} className="ss02 flex items-center gap-1">
                    <img width="16" height="16" src="https://img.icons8.com/windows/32/FAB005/money-circulation.png" alt="money-circulation" />
                    تغییرات در ۷ روز گذشته :{" "}
                  </p>
                  <p
                    style={{
                      color: currency.diff24d < 0 ? "red" : "#5eff00",
                      fontFamily: "IRANSansX",
                    }}
                    className="ss02"
                  >
                    {currency.diff7d}%
                  </p>
                </div>
                <div className="flex gap-1 items-center">

                  <p style={{ fontFamily: "IRANSansX" }} className="ss02 flex items-center gap-1">
                    <img width="16" height="16" src="https://img.icons8.com/windows/32/FAB005/money-circulation.png" alt="money-circulation" />
                    تغییرات در 30 روز گذشته :{" "}
                  </p>
                  <p
                    style={{
                      color: currency.diff24d < 0 ? "red" : "#5eff00",
                      fontFamily: "IRANSansX",
                    }}
                    className="ss02"
                  >
                    {currency.diff30d}%
                  </p>
                </div>
              </div>
              <img src={pic1} alt="Tether USDT Icon" className="w-32 h-32" />
            </section>
          ) : (
            <p>Loading currency data...</p>
          )}
        </div>
      </Window>
    </div>
  );
};

export default (p) => Component(p, Page);

export async function getServerSideProps(context) {
  const session = await global.SSRVerify(context);

  return {
    props: {
      data: global.QSON.stringify({
        session,
      }),
    },
  };
}
