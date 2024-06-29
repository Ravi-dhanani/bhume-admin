import React from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import DataTable from "../common/DataTable";
import ApiServices from "../services/Apiservices";
import AddUpdateLanguage from "./AddUpdateLanguage";

export default function LstLanguage() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isEdit, seIsEdit] = React.useState<boolean>(false);
  const [objLanguage, setObjLanguage] = React.useState<any>();

  const lstLanguage = useQuery({
    queryKey: ["lstLanguage"],
    queryFn: ApiServices.getLstLanguage,
  });

  async function delete_language(_id: string) {
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
          const res = await ApiServices.delete_language(_id);
          Swal.fire(
            "Deleted!",
            `${res.message ? res.message : "Carousel Deleted"}`,
            "success"
          );
          lstLanguage.refetch();
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
        title={"Language"}
        columns={[
          {
            title: "Sr No.",
            field: "index",
            render: (rowData: any) => {
              return <p>{rowData.tableData.id + 1}</p>;
            },
          },
          { title: "Title", field: "title" },
          { title: "Id", field: "title" },
        ]}
        data={lstLanguage?.data}
        setDeleteId={delete_language}
        setOpen={setOpen}
        setObject={setObjLanguage}
        setIsEdit={seIsEdit}
        isLoading={lstLanguage.isLoading}
        addview={false}
        editview={false}
        viewData={true}
        csvExport={false}
      />
      {open && (
        <AddUpdateLanguage
          open={open}
          setOpen={() => {
            setOpen(false);
            lstLanguage.refetch();
          }}
          isEdit={isEdit}
          setIsEdit={seIsEdit}
          objLanguage={objLanguage}
        />
      )}
    </div>
  );
}
