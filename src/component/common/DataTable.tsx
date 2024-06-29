import React from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";

import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ThemeProvider, createTheme } from "@mui/material";
import MaterialTable from "material-table";
const Add = React.forwardRef((props: any, ref: any) => {
  return (
    <AddBox
      {...props}
      ref={ref}
      fontSize="large"
      style={{ color: "#014aad" }}
    />
  );
});
Add.displayName = "Add";

const ClearBox = React.forwardRef((props: any, ref: any) => {
  return <Clear {...props} ref={ref} />;
});
ClearBox.displayName = "ClearBox";

const Delete = React.forwardRef((props: any, ref: any) => {
  return <DeleteIcon {...props} ref={ref} color="error" />;
});
Delete.displayName = "Delete";

const EditBox = React.forwardRef((props: any, ref: any) => {
  return <Edit {...props} ref={ref} style={{ color: "#014aad" }} />;
});
EditBox.displayName = "EditBox";

const Filter = React.forwardRef((props: any, ref: any) => {
  return <AddBox {...props} ref={ref} />;
});
Filter.displayName = "Filter";

const FirstPageBox = React.forwardRef((props: any, ref: any) => {
  return <FirstPage {...props} ref={ref} />;
});
FirstPageBox.displayName = "FirstPageBox";

const LastPageBox = React.forwardRef((props: any, ref: any) => {
  return <LastPage {...props} ref={ref} />;
});
LastPageBox.displayName = "LastPageBox";

const NextPage = React.forwardRef((props: any, ref: any) => {
  return <ChevronRight {...props} ref={ref} />;
});
NextPage.displayName = "NextPage";

const PreviousPage = React.forwardRef((props: any, ref: any) => {
  return <ChevronLeft {...props} ref={ref} />;
});
PreviousPage.displayName = "PreviousPage";

const ResetSearch = React.forwardRef((props: any, ref: any) => {
  return <Clear {...props} ref={ref} />;
});

ResetSearch.displayName = "ResetSearch";

const SearchBox = React.forwardRef((props: any, ref: any) => {
  return <Search {...props} ref={ref} />;
});
SearchBox.displayName = "SearchBox";

const SortArrow = React.forwardRef((props: any, ref: any) => {
  return <ArrowDownward {...props} ref={ref} />;
});
SortArrow.displayName = "SortArrow";

const ThirdStateCheck = React.forwardRef((props: any, ref: any) => {
  return <Remove {...props} ref={ref} />;
});
ThirdStateCheck.displayName = "ThirdStateCheck";

const VisibilityBox = React.forwardRef((props: any, ref: any) => {
  return <VisibilityIcon {...props} ref={ref} style={{ color: "#014aad" }} />;
});
VisibilityBox.displayName = "VisibilityBox";

const Export = React.forwardRef((props: any, ref: any) => {
  return <SaveAlt {...props} ref={ref} />;
});
Export.displayName = "Export";

const DetailPanel = React.forwardRef((props: any, ref: any) => {
  return <ChevronRight {...props} ref={ref} />;
});
DetailPanel.displayName = "DetailPanel";

const CheckBox = React.forwardRef((props: any, ref: any) => {
  return <Check {...props} ref={ref} />;
});
CheckBox.displayName = "CheckBox";

const tableIcons: any = {
  Add: Add,
  Check: CheckBox,
  Clear: ClearBox,
  Delete: Delete,
  DetailPanel: DetailPanel,
  Edit: EditBox,

  Export: Export,
  Filter: Filter,
  FirstPage: FirstPageBox,
  LastPage: LastPageBox,
  NextPage: NextPage,
  PreviousPage: PreviousPage,
  ResetSearch: ResetSearch,
  Search: SearchBox,
  SortArrow: SortArrow,
  ThirdStateCheck: ThirdStateCheck,
  VisibilityIcon: VisibilityBox,
};

interface IDataTableProps {
  data: any;
  title?: string;
  columns: any;
  isLoading?: boolean;
  addButtonTitle?: string;
  addview?: any;
  setDeleteId?: any;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>> | any;
  setView?: React.Dispatch<React.SetStateAction<boolean>> | any;
  setObject?: any;
  setIsEdit?: any;
  editview?: any;
  viewData?: any;
  csvExport: boolean | any;
}
const DataTable = (props: IDataTableProps) => {
  const {
    columns,
    data,
    title,
    isLoading,
    setDeleteId,
    setOpen,
    setObject,
    addview,
    editview,
    viewData,
    setView,
    setIsEdit,
    csvExport,
  } = props;
  const theme = createTheme();
  const tableRef = React.createRef<any>();

  return (
    <>
      <ThemeProvider theme={theme}>
        <MaterialTable
          tableRef={tableRef}
          columns={columns}
          data={data}
          title={title}
          icons={tableIcons}
          isLoading={isLoading}
          actions={[
            {
              icon: tableIcons.Add,
              isFreeAction: true,
              tooltip: "Add ",
              hidden: addview ? true : false,
              onClick: () => {
                setOpen(true);
                setObject("");
                setIsEdit(false);
              },
            },
            {
              icon: tableIcons.VisibilityIcon,
              tooltip: "view",
              hidden: viewData ? true : false,
              onClick: (event: any, rowData: any) => {
                setView(true);
                setObject(rowData);
              },
            },
            {
              icon: tableIcons.Edit,
              tooltip: "Edit",
              hidden: editview ? true : false,
              onClick: (event: any, rowData: any) => {
                setOpen(true);
                setIsEdit(true);
                setObject(rowData);
              },
            },
            {
              icon: tableIcons.Delete,
              tooltip: "Delete",
              onClick: (event: any, rowData: any) => {
                setDeleteId(rowData._id);
              },
            },
          ]}
          options={{
            exportButton: csvExport,
            actionsColumnIndex: -1,
            addRowPosition: "first",
            headerStyle: {
              backgroundColor: "#014aad",
              color: "#FFF",
            },
            pageSize: 10,
            pageSizeOptions: [10, 25, 100],
          }}
        />
      </ThemeProvider>
    </>
  );
};
DataTable.displayName = "DataTable";
export default DataTable;
