import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import validator from "validator";

export default function Register(props) {
  const navigate = useNavigate();
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useCookies(["user"]);
  const [noSubmit, setNoSubmit] = useState(true);
  function check(param) {
    return !param && !noSubmit ? { error: true, helperText: "Заавал бөглөнө үү!" } : {};
  }

  // useEffect(() => {
  //   console.log(user);

  // }, []);
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: "#2BC0DE6F" /* fallback for old browsers */,
        // background: "-webkit-linear-gradient(to bottom, #2980b9, #6dd5fa, #ffffff)" /* Chrome 10-25, Safari 5.1-6 */,
        background: "linear-gradient(to top right, #22c1c3, #fdbb2d)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "",
          gap: "20px",
          flexDirection: "column",
          // maxHeight: "600px",
          border: "1px solid #ddd",
          overflow: "auto",
          width: "500px",
          padding: 5,
          borderRadius: 1,
          maxHeight: "70vh",
          background: "#fff"
        }}>
        <Typography variant="h6">Бүртгүүлэх</Typography>
        <TextField
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Тулагалувсангончигдалбыжалбуусүрэнгомбо"
          id="lastName"
          label="Овог"
          {...check(lastName)}
        />
        <TextField value={name} onChange={(e) => setName(e.target.value)} placeholder="Хүрэлсүх" id="name" label="Нэр" {...check(name)} />
        <TextField
          id="date"
          label="Төрсөн он сар  өдөр"
          type="date"
          // defaultValue=""
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => {
            console.log(e.target.value);
            setDate(e.target.value);
          }}
          {...check(date)}
        />
        <TextField placeholder="Манин" id="demo-helper-text-aligned" onChange={(e) => setGender(e.target.value)} label="Хүйс" {...check(gender)} />
        <TextField
          placeholder="247@gmail.com"
          value={email}
          error={email ? !validator.isEmail(email) : false}
          onChange={(e) => setEmail(e.target.value)}
          helperText={email ? (!validator.isEmail(email) ? "Имэйл буруу байна" : "") : ""}
          id="demo-helper-text-aligned"
          label="Имейл хаяг"
          {...check(email)}
        />
        <TextField
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="************"
          error={password && checkPasswordLevel(password) < 3}
          helperText={
            checkPasswordLevel(password) === 3
              ? ""
              : "Нууц үг 6 тэмдэгтээс дээш, '! % & @' гэх мэт онцгой тэмдэгт, Том жижиг үсэг, Тоо оролцсон байх ёстой"
          }
          id="pass"
          label="Нууц үг"
          {...check(password)}
        />

        <TextField
          placeholder="9911****"
          id="demo-helper-text-aligned"
          type={"number"}
          label="Утасны дугаар"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          {...check(password)}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h7" sx={{ flex: 1 }}>
            Бүртгэлтэй юу?
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
              navigate("/login");
            }}>
            Нэвтрэх
          </Button>
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            setNoSubmit(false);
            if (checkPasswordLevel(password) === 3 && name && lastName && validator.isEmail(email) && validator.isMobilePhone(phone)) {
              setUser("user", {
                name,
                lastName,
                date,
                gender,
                email,
                password,
                phone
              });
              setUser("authenticated", "");
              navigate("/login");
            } else {
              let errors = [];
              console.log(errors);
              if (!(checkPasswordLevel(password) === 3)) errors.push("Нууц үг шаардлага хангахгүй");
              console.log(errors);
              if (!name) errors.push("Нэр байхгүй");
              console.log(errors);
              if (!lastName) errors.push("Овог байхгүй");
              console.log(errors);
              if (!gender) errors.push("Хүйс ороогүй");
              console.log(errors);
              if (!validator.isEmail(email)) errors.push("Имейл буруу");
              console.log(errors);
              if (!validator.isMobilePhone(phone)) errors.push("Утасны дугаар буруу");
              console.log(errors);
              alert(errors.join(", ") + " байна");
            }
          }}>
          Бүртгүүлэх
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
  } else if (strength === 2) {
    return 2;
  } else {
    return 3;
  }
}
