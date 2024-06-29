import AddBox from "@material-ui/icons/AddBox";
import React, { forwardRef } from "react";

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
