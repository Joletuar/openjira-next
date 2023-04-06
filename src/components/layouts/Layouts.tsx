import { FC } from "react";
import Head from "next/head";

import { Box } from "@mui/material";

interface Props {
  title?: string;
  children?: JSX.Element
}

export const Layouts: FC<Props> = ({ title = "OpenJira", children }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Head>
        <title>{title}</title>
      </Head>

      {/* Navbar */}
      {/* SideBar */}

      <Box sx={{ paddingTop: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
