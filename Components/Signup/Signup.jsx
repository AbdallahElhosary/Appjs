import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import signupfun from "./signupAuth";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [signuperr, setSignuperr] = useState("");
  const navigate = useNavigate();

  const onsubmit = async (e) => {
    e.preventDefault();

    const res = await signupfun(firstname + " " + lastname, email, pass, cpass);
    setSignuperr(res);
  };

  useEffect(() => {
    if (signuperr === "user created successfully") {
      navigate("/home");
    }
  }, [signuperr]);

  return (
    <section className="signup">
      <div className="container">
        <form className="login row" onSubmit={onsubmit}>
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="form-group text-center mb-3">
              <input
                type="text"
                placeholder="الاسم الاول "
                required
                name="Fname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <i className="fa-regular fa-user"></i>
            </div>
            <div className="form-group text-center mb-3">
              <input
                type="text"
                placeholder="الاسم الاخير "
                required
                name="Lname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <i className="fa-regular fa-user"></i>
            </div>
            <div className="form-group text-center mb-3">
              <input
                type="email"
                required
                placeholder="البريد الالكتروني"
                name="mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group text-center mb-3">
              <input
                id="pass"
                type="password"
                placeholder="تعيين كلمة السر"
                required
                name="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <i className="fa-solid fa-lock"></i>
              <i id="iconpass" className="fa-solid fa-eye"></i>
            </div>
            <div className="form-group text-center mb-3">
              <input
                id="cpass"
                type="password"
                required
                placeholder="تأكيد كلمة السر"
                name="Conpassword"
                value={cpass}
                onChange={(e) => setCpass(e.target.value)}
              />
              <i className="fa-solid fa-lock"></i>
              <i id="iconcpass" className="fa-solid fa-eye"></i>
            </div>

            <div className="text-center mb-3">
              <input type="submit" value="انشاء حساب" className="abtn" />
            </div>
            {signuperr && (
              <div className="d-block text-center mb-2">{signuperr}</div>
            )}
            <Link to="/login" className="d-block text-center mb-2">
              تسجيل الدخول ... ؟
            </Link>
          </div>
          <div className="col-md-4"></div>
        </form>
      </div>
    </section>
  );
}

export default Signup;
