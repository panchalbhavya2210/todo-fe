"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography, Switch, FormControlLabel } from "@mui/material";

type SectorRow = {
  id: number;
  Sector: string;
  "15D": number;
  "30D": number;
  "90D": number;
  "180D": number;
  "360D": number;
};

export default function FIITable({
  sectors,
  latestStatement,
}: {
  sectors: any[];
  latestStatement: string;
}) {
  const [heatmap, setHeatmap] = React.useState(false);

  /* ---------------- GRAND TOTAL SEPARATION ---------------- */

  const grandTotal = sectors.find((s) =>
    s.Sector.toLowerCase().includes("grand"),
  );

  const filteredSectors = sectors.filter(
    (s) => !s.Sector.toLowerCase().includes("grand"),
  );

  const rows: SectorRow[] = filteredSectors.map((s, index) => ({
    id: index,
    Sector: s.Sector,
    "15D": Number(s["15D"]),
    "30D": Number(s["30D"]),
    "90D": Number(s["90D"]),
    "180D": Number(s["180D"]),
    "360D": Number(s["360D"]),
  }));

  /* ---------------- AUTO SCALE HEATMAP ---------------- */

  const maxValue = Math.max(
    ...rows.flatMap((r) =>
      [r["15D"], r["30D"], r["90D"], r["180D"], r["360D"]].map((v) =>
        Math.abs(v),
      ),
    ),
    1,
  );

  function getHeatColor(value: number) {
    if (!heatmap) return {};

    const intensity = Math.min(Math.abs(value) / maxValue, 1);

    // SELLING
    if (value < 0) {
      return {
        backgroundColor: `rgba(244, 67, 54, ${0.15 + intensity * 0.75})`,
        color: "#fff",
        fontWeight: 600,
      };
    }

    // BUYING
    if (value > 0) {
      return {
        backgroundColor: `rgba(76, 175, 80, ${0.15 + intensity * 0.75})`,
        color: "#fff",
        fontWeight: 600,
      };
    }

    return { color: "#aaa" };
  }

  /* ---------------- COLUMN BUILDER ---------------- */

  const buildNumberColumn = (field: keyof SectorRow): GridColDef => ({
    field: field,
    headerName: field,
    type: "number",
    flex: 1,
    sortComparator: (v1, v2) => Number(v1) - Number(v2),

    renderCell: (params) => (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...getHeatColor(Number(params.value)),
        }}
      >
        {Number(params.value).toLocaleString("en-IN")}
      </Box>
    ),
  });

  const columns: GridColDef[] = [
    {
      field: "Sector",
      headerName: "Sector",
      flex: 1.5,
      minWidth: 220,
    },
    buildNumberColumn("15D"),
    buildNumberColumn("30D"),
    buildNumberColumn("90D"),
    buildNumberColumn("180D"),
    buildNumberColumn("360D"),
  ];

  /* ---------------- UI ---------------- */

  return (
    <Box sx={{ width: "100%" }}>
      <FormControlLabel
        sx={{ mb: 1 }}
        control={
          <Switch
            checked={heatmap}
            onChange={(e) => setHeatmap(e.target.checked)}
          />
        }
        label="Heatmap"
      />

      <Box sx={{ height: 800 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          hideFooter
        />
      </Box>

      {/* ---------- GRAND TOTAL (ALWAYS BELOW) ---------- */}

      {grandTotal && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr 1fr",
            fontWeight: 700,
            padding: "12px 16px",
          }}
        >
          <div>Grand Total</div>
          <div>{Number(grandTotal["15D"]).toLocaleString("en-IN")}</div>
          <div>{Number(grandTotal["30D"]).toLocaleString("en-IN")}</div>
          <div>{Number(grandTotal["90D"]).toLocaleString("en-IN")}</div>
          <div>{Number(grandTotal["180D"]).toLocaleString("en-IN")}</div>
          <div>{Number(grandTotal["360D"]).toLocaleString("en-IN")}</div>
        </Box>
      )}
    </Box>
  );
}
