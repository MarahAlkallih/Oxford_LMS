import { useState } from "react";
import { DataGrid, type GridColDef, type GridPaginationModel, type GridValidRowModel } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

type CustomDataGridProps<T extends GridValidRowModel> = {
  rows: T[];
  columns: GridColDef<T>[];
  pageSizeOptions?: number[];
  initialPageSize?: number;
  autoHeight?: boolean;
  getRowId?: (row: T) => string | number;
  sx?: any;
};

export function CustomDataGrid<T extends GridValidRowModel>({
  rows,
  columns,
  pageSizeOptions = [5, 10],
  initialPageSize = 5,
  autoHeight = true,
  getRowId,
  sx,
}: CustomDataGridProps<T>) {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: initialPageSize,
    page: 0,
  });

  return (
   <Paper
  elevation={0}
  sx={{
    overflow: "hidden",
    borderRadius: 3,
    background: "var(--bg-color)",
    color: "var(--text-color)",
  }}
>
      <DataGrid
        rows={rows}
        columns={columns as GridColDef[]}
        getRowId={getRowId}
        disableRowSelectionOnClick
        autoHeight={autoHeight}
        pageSizeOptions={pageSizeOptions}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
   sx={{
  border: "none",

  "& .MuiDataGrid-root": {
    border: "none",
  },

  "& .MuiDataGrid-main": {
    backgroundColor: "var(--bg-color)",
    color: "var(--text-color)",
  },

  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "var(--grey-color)",
    borderBottom: "none",
  },

  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "transparent",
    outline: "none",
  },

  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 600,
  },

  "& .MuiDataGrid-cell": {
    borderBottom: "1px solid rgba(0,0,0,0.05)",
    outline: "none",
  },

  "& .MuiDataGrid-row": {
    backgroundColor: "var(--bg-color)",
  },

  "& .MuiDataGrid-row:hover": {
    backgroundColor: "rgba(0,0,0,0.04)",
  },

  "& .MuiDataGrid-footerContainer": {
    borderTop: "none",
  },

  "& .MuiDataGrid-columnSeparator": {
    display: "none",
  },

  "& .MuiSvgIcon-root": {
    color: "inherit",
  },

  ...sx,
}}
      />
    </Paper>
  );
}

export default CustomDataGrid;
