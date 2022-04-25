import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import validator from "validator";

export default function Login(props) {
  const navigate = useNavigate();
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useCookies(["user"]);
  const [noSubmit, setNoSubmit] = useState(true);
  function check(param) {
    return !param && !noSubmit ? { error: true, helperText: "Заавал бөглөнө үү!" } : {};
  }

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#2BC0DE6F" /* fallback for old browsers */,
        // background: "-webkit-linear-gradient(to bottom, #2980b9, #6dd5fa, #ffffff)" /* Chrome 10-25, Safari 5.1-6 */,
        background: "linear-gradient(to top right, #22c1c3, #fdbb2d)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "",
          gap: "20px",
          flexDirection: "column",
          maxHeight: "600px",
          border: "1px solid #ddd",
          overflow: "auto",
          width: "500px",
          padding: 5,
          borderRadius: 1,
          maxHeight: "70vh",
          background: "#fff"
        }}>
        <Typography variant="h6">Нэвтрэх</Typography>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Тулагалувсангончигдалбыжалбуусүрэнгомбо"
          id="name"
          label="Нэвтрэх Нэр"
          {...check(lastName)}
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Тулагалувсангончигдалбыжалбуусүрэнгомбо"
          id="lastName"
          label="Нууц Үг"
          type="password"
          {...check(lastName)}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h7" sx={{ flex: 1 }}>
            Бүртгэлгүй юу?
          </Typography>
          <Button
            variant="contained"
            sx={{
              // flex: 2,
              padding: "0 60px",
              background: "lightGray"
              // minWidth: "300px"
            }}
            onClick={() => {
              navigate("/register");
            }}>
            Бүртгүүлэх
          </Button>
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            setNoSubmit(!noSubmit);

            if (user.user?.name === name && user.user?.password === password) {
              setUser("authenticated", true);
            } else alert("Нууц үг буруу");
          }}>
          Нэврэх
        </Button>
      </Box>
    </Box>
  );
}

function checkPasswordLevel(password) {
  var strength = 0;
  if (password.length < 6) {
    return 0;
  }
  if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
    strength += 1;
  }
  if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
    strength += 1;
  }
  if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
    strength += 1;
  }
  if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) {
    strength += 1;
  }
  if (strength < 2) {
    return 1;
  } else if (strength == 2) {
    return 2;
  } else {
    return 3;
  }
}
