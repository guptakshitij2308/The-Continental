import Heading from "../ui/Heading";
import Row from "../ui/Row";
import getCabins from "../services/apiCabins.js";
import { useEffect } from "react";
import CabinTable from "../features/cabins/CabinTable.jsx";

function Cabins() {
  // useEffect(function () {
  //   async function fetchCabins() {
  //     const data = getCabins();
  //     console.log(data);
  //   }
  //   fetchCabins();
  // }, []);

  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>TEST</p>
      </Row>

      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
