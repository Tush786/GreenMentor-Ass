import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../Oauth/Firebase";
import { LoginUser, addUser } from "../redux/action";
import { useToast } from "@chakra-ui/react";
import { RESET_USER } from "../redux/actiontype";

function Login() {
  const Navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);
  const token = useSelector((state) => state.user.token);
  console.log(token);
  const toast = useToast();

  const [user, setUser] = useState({
    email: "",
    password: "",
    gauth: false,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    if (!email.includes("@") && !email.includes(".com")) {
      toast({
        title: "Enter valid email",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password === "" || password.length < 6) {
      toast({
        title: "Enter valid password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      return;
    }

    dispatch(LoginUser(user));

    setUser({
      email: "",
      password: "",
      gauth: false,
    })

    Navigate('/')
  
  };
  console.log(user);
  const [userj, setUserj] = useState();
  const LogiInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      // navigate("/home");
      console.log(result);

      const userobj = {
        username: result.user.displayName,
        email: result.user.email,
        gauth: true,
      };
      setUserj(userobj);
      dispatch(LoginUser(userobj));
    });
  };

  useEffect(() => {
    if (status == "200" || status == "201") {
      toast({
        title: "Login successfull",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else if (status == "409") {
      toast({
        title: "Email Does Not Exist!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (status == "410") {
      toast({
        title: "Incorrect Password!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    dispatch({ type: RESET_USER, payload: "" });
  }, [status]);

  return (
    <section className="h-[100%] flex flex-col  md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left flex justify-start gap-6 ">
          <label className="mr-1">Sign in with</label>
          <div>
            <FcGoogle
              onClick={LogiInWithGoogle}
              className="w-24 h-[35px] -ml-12 cursor-pointer"
            />
          </div>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Or
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 bg-[#8898ee] text-white"
            type="submit"
          />
        </form>
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <a
            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
            href="#"
          >
            Forgot Password?
          </a>
        </div>

        <div
          onClick={() => {
            Navigate("/signup");
          }}
          className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left"
        >
          Don't have an account?{" "}
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="#"
          >
            Register
          </a>
        </div>
      </div>
    </section>
  );
}

export default Login;
