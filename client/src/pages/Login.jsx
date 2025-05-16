import { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";
// import { AuthContext } from "../context/AuthContext";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { accountService } from "../_services/account.service";
import "../styles/login.css";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";

const Login = () => {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  //   const { dispatch } = useContext(AuthContext);
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
      // Dispatch de début de login pour activer le loader ou autre
      dispatch({ type: "LOGIN_START" });

      const response = await accountService.login(values);
      if (response.success) {
        // Stocke le token dans localStorage
        localStorage.setItem("token", response.data);
        // Décodage du token pour obtenir les infos utilisateur
        const decodedUser = jwtDecode(response.data);
        // Dispatch pour mettre à jour le context avec les données utilisateur
        dispatch(SetUser(decodedUser));
        message.success(response.message);
        // Redirige vers la page d'accueil
        navigate("/");
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: response.message });
        message.error(response.message);
      }
      setIsLoading(false);
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
      message.error(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/"); // Redirection vers l'accueil si l'utilisateur est connecté
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
                      <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
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
                  Don't have an account? <a href="/register">Create</a>
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
