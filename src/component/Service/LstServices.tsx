import React from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import DataTable from "../common/DataTable";
import ApiServices from "../services/Apiservices";
import AddUpdateServices from "./AddUpdateServices";

export default function LstServices() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isEdit, seIsEdit] = React.useState<boolean>(false);
  const [objServices, setObjServices] = React.useState<any>();

  const lstServices = useQuery({
    queryKey: ["lstServices"],
    queryFn: ApiServices.getLstServices,
  });

  async function delete_services(_id: string) {
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
          const res = await ApiServices.delete_Services(_id);
          Swal.fire(
            "Deleted!",
            `${res.message ? res.message : "Services Deleted"}`,
            "success"
          );
          lstServices.refetch();
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
        title={"Services"}
        columns={[
          {
            title: "Sr No.",
            field: "index",
            render: (rowData: any) => {
              return <p>{rowData.tableData.id + 1}</p>;
            },
          },
          {
            title: "Title",
            field: "title",
          },
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
            title: "longDescription",
            field: "longDescription",
            render: (row: any) => {
              return (
                <span
                  dangerouslySetInnerHTML={{ __html: row.longDescription }}
                />
              );
            },
          },
        ]}
        data={lstServices?.data}
        setDeleteId={delete_services}
        setOpen={setOpen}
        setObject={setObjServices}
        setIsEdit={seIsEdit}
        addview={false}
        isLoading={lstServices.isLoading}
        viewData={true}
        csvExport={false}
      />

      {open && (
        <AddUpdateServices
          open={open}
          setOpen={() => {
            setOpen(false);
            lstServices.refetch();
          }}
          isEdit={isEdit}
          setIsEdit={seIsEdit}
          objServices={objServices}
        />
      )}
    </div>
  );
}
