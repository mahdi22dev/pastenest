import { Button } from "@/components/ui/button";
import google from "../../assets/google.png";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRef, useState } from "react";
import { Formik, useField, Form } from "formik";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { signInSchema } from "@/lib/validation";
import { PulseLoader } from "react-spinners";
import { toast } from "@/hooks/use-toast";
import ReCAPTCHA from "react-google-recaptcha";

function SignIn(): JSX.Element {
  return (
    <div className="flex flex-col gap-10 justify-center">
      <div>paste nest agly logo</div>
      <h1 className="text-xl">Welcome Back! Please enter your details </h1>
      <SignInForm />
    </div>
  );
}

const SignInForm = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const recaptchaRef: any = useRef();
  let [searchParams, _] = useSearchParams();

  const onSubmitWithReCAPTCHA = async (): Promise<string | null> => {
    if (recaptchaRef.current) {
      const token = await recaptchaRef.current.executeAsync();
      return token;
    }
    return null;
  };

  const handleSignin = async (values: any) => {
    try {
      let next = searchParams.get("next");
      const captchaToken = await onSubmitWithReCAPTCHA();
      if (!captchaToken) {
        return toast({
          variant: "default",
          title: "Please Try again later",
          description: "internal server error at " + new Date().toISOString(),
        });
      }

      localStorage.setItem("remember_me", "true");
      setMessage("");

      const url =
        process.env.NODE_ENV === "development"
          ? import.meta.env.VITE_LOCAL_SERVER_PATH
          : import.meta.env.VITE_SERVER_PATH;

      const response = await fetch(url + "/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Recaptcha-Token": captchaToken,
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      let token = await response.json();
      if (response.status == 503) {
        return toast({
          variant: "default",
          title: "Service Unavailable",
          description: "Couldn't complete the reques right now",
        });
      }
      if (!response.ok) {
        setMessage(token.message.message);
        return;
      }

      if (token?.access_token) {
        try {
          localStorage.setItem("auth_token", token.access_token);
          document.cookie =
            "pastenest_access_token=" +
            token.access_token +
            "; path=/; SameSite=None; Secure; max-age=2592000";
          return navigate(next ? next : "/");
        } catch (error) {
          return toast({
            variant: "default",
            title: "Please Try again later",
            description: "internal server error at " + new Date().toISOString(),
          });
        }
      }
    } catch (error) {
      console.log(error);

      return toast({
        variant: "default",
        title: "Please Try again later",
        description:
          "internal server error at " +
          new Date().toISOString() +
          ", error type : " +
          error,
      });
    }
  };

  return (
    <div className="max-w-7x flex gap-3 flex-col">
      <Button className="bg-white text-black hover:bg-white flex justify-center items-center gap-3 p-6 font-extrabold w-full">
        <div className="w-5">
          <img src={google} />
        </div>
        Log in with Google{" "}
      </Button>

      <div className="flex items-center justify-center gap-3">
        <Separator className="w-[40%]" />
        <p>Or</p>
        <Separator className="w-[40%]" />
      </div>

      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={signInSchema}
        onSubmit={async (values, {}) => {
          await handleSignin(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              hidden
            />
            {message && (
              <p className="text-destructive p-2 mb-4 text-center text-[16px]">
                {message}
              </p>
            )}
            <div className="flex flex-col gap-5 ">
              <MyTextInput
                label="username"
                name="username"
                type="text"
                placeholder="username"
                disabled={isSubmitting}
              />
              <MyTextInput
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
                disabled={isSubmitting}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="mt-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                <Button variant={"link"}>Forget password</Button>
              </div>

              <Button
                type="submit"
                className="mt-5 p-6 font-extrabold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <PulseLoader color="#1f0620" size={10} />
                ) : (
                  "Sign in"
                )}
              </Button>
              <div className="text-sm mx-auto flex justify-center items-center">
                Don't have account?
                <Button asChild variant={"link"}>
                  <Link to={"/auth/signup"}>Sign up for free</Link>
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const MyTextInput = ({ ...props }) => {
  // @ts-ignore
  const [field, meta] = useField(props);
  return (
    <div>
      <Input
        {...field}
        {...props}
        className="gap-5 p-6 font-extrabold placeholder:opacity-80"
      />

      {meta.touched && meta.error ? (
        <div className="text-destructive mt-3 text-[13px]">{meta.error}</div>
      ) : null}
    </div>
  );
};
export default SignIn;
