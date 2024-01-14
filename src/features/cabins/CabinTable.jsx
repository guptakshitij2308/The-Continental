import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow.jsx";
import { useCabins } from "./useCabins.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty.jsx";

const CabinTable = () => {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resourceName="cabins" />;

  // console.log(searchParams.get("discount"));
  const filterVal = searchParams.get("discount") || "all";
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  let filteredCabins;

  if (filterVal === "all") filteredCabins = cabins;
  if (filterVal === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin?.discount === 0);
  if (filterVal === "with-discount")
    filteredCabins = cabins?.filter((cabin) => cabin?.discount > 0);

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  let sortedCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

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
            // data={filteredCabins}
            data={sortedCabins}
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
