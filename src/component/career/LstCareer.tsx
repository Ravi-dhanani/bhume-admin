import React from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import DataTable from "../common/DataTable";
import ApiServices from "../services/Apiservices";
import AddUpdateCareer from "./AddUpdateCareer";
import ViewCareer from "./ViewCareer";

export default function LstCareer() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isEdit, seIsEdit] = React.useState<boolean>(false);
  const [isView, setView] = React.useState<boolean>(false);
  const [objCareer, setObjCareer] = React.useState<any>();
  const lstCareer = useQuery({
    queryKey: ["lstCareer"],
    queryFn: ApiServices.getLstCareer,
  });
  async function delete_career(_id: string) {
    try {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      }).then(async (result: any) => {
        if (result.isConfirmed) {
          const res = await ApiServices.delete_Career(_id);
          Swal.fire(
            "Deleted!",
            `${res.message ? res.message : "Carousel Deleted"}`,
            "success"
          );
          lstCareer.refetch();
        }
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.message}`,
      });
    }
  }
  return (
    <div>
      <DataTable
        title={"Career"}
        columns={[
          {
            title: "Sr No.",
            field: "index",
            render: (rowData: any) => {
              return <p>{rowData.tableData.id + 1}</p>;
            },
          },
          { title: "Title", field: "title" },
          {
            title: "ShortDescription",
            field: "shortDescription",
            render: (row: any) => {
              return (
                <span
                  dangerouslySetInnerHTML={{ __html: row.shortDescription }}
                />
              );
            },
          },
          {
            title: "LongDescription",
            field: "longDescription",
            render: (row: any) => {
              return (
                <span
                  dangerouslySetInnerHTML={{ __html: row.longDescription }}
                />
              );
            },
          },
          { title: "Date", field: "date" },
        ]}
        data={lstCareer?.data}
        setDeleteId={delete_career}
        setOpen={setOpen}
        setObject={setObjCareer}
        setIsEdit={seIsEdit}
        addview={false}
        isLoading={lstCareer.isLoading}
        setView={setView}
        csvExport={false}
      />
      {isView && (
        <ViewCareer objCareer={objCareer} setOpen={setView} open={isView} />
      )}
      {open && (
        <AddUpdateCareer
          open={open}
          setOpen={() => {
            setOpen(false);
            lstCareer.refetch();
          }}
          isEdit={isEdit}
          setIsEdit={seIsEdit}
          objCareer={objCareer}
        />
      )}
    </div>
  );
}
