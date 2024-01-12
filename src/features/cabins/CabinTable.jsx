import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow.jsx";
import { useCabins } from "./useCabins.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import { useSearchParams } from "react-router-dom";

const CabinTable = () => {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get("discount"));
  const filterVal = searchParams.get("discount") || "all";
  let filteredCabins;

  if (filterVal === "all") filteredCabins = cabins;
  if (filterVal === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin?.discount === 0);
  if (filterVal === "with-discount")
    filteredCabins = cabins?.filter((cabin) => cabin?.discount > 0);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Menus>
        <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
          <Table.Header role="row">
            <div></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </Table.Header>

          <Table.Body
            // data={cabins}
            data={filteredCabins}
            render={(cabin) => {
              return <CabinRow cabin={cabin} key={cabin?.id} />;
            }}
          />
        </Table>
      </Menus>
    </>
  );
};

export default CabinTable;
