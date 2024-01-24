import { formatCurrency } from "../../utils/helpers.js";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confimedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const sales = bookings?.reduce((acc, booking) => acc + booking.totalPrice, 0);
  const checkins = confimedStays.length;
  const occupancyRate = Math.round(
    (confimedStays.reduce((acc, stay) => acc + stay.numNights, 0) /
      (numDays * cabinCount)) *
      100
  );

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupancyRate + "%"}
      />
    </>
  );
}

export default Stats;
