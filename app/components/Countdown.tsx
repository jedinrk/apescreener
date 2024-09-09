import React, { useEffect, useState } from "react";
import { NumberBox } from "../components/NumberBox";
import { inter, poppins } from "../fonts";

interface CountdownProps {
  targetDate: string | number;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-between">
      <NumberBox num={timeLeft.days} unit="Days" />
      <span className="inline-block -mt-10 mx-1 md:mx-[14.5px] text-xl md:text-[40px] font-semibold text-white">
        :
      </span>
      <NumberBox num={timeLeft.hours} unit="Hours" />
      <span className="inline-block -mt-10 mx-1 md:mx-[14.5px] text-xl md:text-[40px] font-semibold text-white ">
        :
      </span>
      <NumberBox num={timeLeft.minutes} unit="Minutes" />
      <span className="inline-block -mt-10 mx-1 md:mx-[14.5px] text-xl md:text-[40px] font-semibold text-white ">
        :
      </span>
      <div className="inline-flex">
        <NumberBox num={timeLeft.seconds} unit="Seconds" />
      </div>
    </div>
  );
};

export default Countdown;
