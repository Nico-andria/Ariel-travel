import { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { accountService } from "../_services/account.service";
import "../styles/login.css";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";

const Login = () => {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const values = { email, password };

    try {
      setIsLoading(true);

      const response = await accountService.login(values);

      if (response.success) {
        localStorage.setItem("token", response.data);
        const decodedUser = jwtDecode(response.data);

        dispatch(SetUser(decodedUser));
        message.success(response.message);
        navigate("/");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="Login" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="User" />
                </div>
                <h2>Login</h2>
                <Form onSubmit={onSubmit}>
                  <FormGroup>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      required
                    />
                    <svg
                      viewBox="0 0 576 512"
                      height="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    >
                      <path d="..."></path>
                    </svg>
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </Form>
                <p>
                  Do not have an account? <a href="/register">Create</a>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
