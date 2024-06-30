import React from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import DataTable from "../common/DataTable";
import ApiServices from "../services/Apiservices";
import ViewEnquiry from "./ViewEnquiry";

export default function Enquiry() {
  const [open, setOpen] = React.useState(false);
  const [objInquiry, setObjInquiry] = React.useState<any>("");

  const lstInquiry = useQuery({
    queryKey: ["lstInquiry"],
    queryFn: ApiServices.getEnquiry,
  });

  async function delete_EnquiryData(_id: string) {
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
          const res = await ApiServices.delete_Enquiry(_id);
          Swal.fire(
            "Deleted!",
            `${res.message ? res.message : "Inquiry Deleted"}`,
            "success"
          );
          lstInquiry.refetch();
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
  lstInquiry?.data?.map(function (currentValue: any, Index: number) {
    currentValue.Sr_No = Index + 1;
    return currentValue;
  });
  return (
    <div>
      <DataTable
        title={"Enquiry"}
        columns={[
          { title: "#", field: "Sr_No" },
          { title: "Name", field: "name" },

          { title: "CompanyName", field: "companyName" },
          { title: "Email", field: "email" },
          { title: "Mobile No", field: "mobileNo" },
          { title: "Date", field: "Date" },
        ]}
        data={lstInquiry?.data}
        setDeleteId={delete_EnquiryData}
        // setOpen={setOpen}
        setObject={setObjInquiry}
        isLoading={lstInquiry.isLoading}
        editview={true}
        addview={true}
        setView={setOpen}
        csvExport={true}
      />
      {open && (
        <ViewEnquiry open={open} setOpen={setOpen} objInquiry={objInquiry} />
      )}
    </div>
  );
}
