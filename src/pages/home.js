import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import validator from "validator";

export default function Home(props) {
  const [user, setUser] = useCookies("user");
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "",
          gap: "20px",
          flexDirection: "column",
          // backgroundColor: "cadetBlue",
          borderRadius: 5,
          padding: 5,
          border: "1px solid lightgray"
        }}>
        <Typography variant="h6" sx={{ maxWidth: "70vw" }}>
          <b>{user.user.lastName}</b>-ын <b>{user.user.name}</b> нь
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: "70vw" }}>
          {user.user.date} өдөр төрсөн
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: "70vw" }}>
          хүйс: {user.user.gender}
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: "70vw" }}>
          Имэйл хаяг: {user.user.email}
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: "70vw" }}>
          Утасны дугаар: {user.user.phone}
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setUser("authenticated", "");
          }}>
          Системээс Гарах
        </Button>
      </Box>
    </Box>
  );
}
