import React from "react";

// mui
import { Container, Toolbar } from "@mui/material";

// components
import Navbar from "src/layout/_main/navbar";
import Footer from "src/layout/_main/footer";
import Topbar from "src/layout/_main/topbar";

// Meta information
export const metadata = {
  title: "ct-today",
  // description:
  //   "Log in to cttoday for secure access to your account. Enjoy seamless shopping, personalized experiences, and hassle-free transactions. Your trusted portal to a world of convenience awaits. Login now!",
  // applicationName: "cttoday",
  // authors: "cttoday",
  // keywords: "ecommerce, cttoday, Commerce, Login cttoday, LoginFrom cttoday",
  icons: {
    icon: "/logo1.png",
  },
  openGraph: {
    images: "https://cttoday.vercel.app/opengraph-image.png?1c6a1fa20db2840f",
  },
};

export default async function RootLayout({ children }) {
  return (
    <>
      <Container maxWidth="xl" sx={{
        padding: '0 !important', position: "sticky",
        top: 0,
        zIndex: 999999,
      }}>
        <Topbar sx={{
          // padding: "0 !important",
        }} />
      </Container>
      {/* <Navbar   sx={{ padding: "0 !important" }}/> */}
      {children}
      <Toolbar sx={{ display: { xs: "block", md: "none" } }} />
      <Footer maxWidth="xl" sx={{ padding: "0 !important" }} />
    </>
  );
}
