"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { syntaxSelectOptions } from "@/lib/constrains";
import { DatePicker } from "./custom/DatePicker";
import { Formik, useField, Form } from "formik";
import { pasteSchema } from "@/lib/validation";
import { toast } from "@/hooks/use-toast";
import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { PasteBody } from "@/lib/types";
import { PulseLoader } from "react-spinners";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { add } from "math-helpers";

export function PasteForm() {
  const [syntax, setSyntax] = useState("syntax");
  const [mode, setMode] = useState("public");
  const [date, setDate] = useState<Date>();
  const [experation, setExperation] = useState("1");
  const [content, setContent] = useState("");
  const [extensions, setExtensions] = useState<Extension[]>();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const f = add(1, 3);
  console.log(f);

  const handlePostCreation = async (body: PasteBody) => {
    try {
      const url =
        process.env.NODE_ENV === "development"
          ? import.meta.env.VITE_LOCAL_SERVER_PATH
          : import.meta.env.VITE_SERVER_PATH;

      const response = await fetch(url + "/api/paste/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = (await response.json()) as {
        id: number;
        pasteId: string;
        title: string;
        content: string;
        createdAt: string;
        experation: any;
        mode: string;
        password: any;
        authorId: number;
      };

      if (data?.pasteId) {
        return navigate("/" + data.pasteId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function loadLanguage() {
      let languageExtension: Extension;
      switch (syntax) {
        case "javascript":
          languageExtension = (
            await import("@codemirror/lang-javascript")
          ).javascript();
          break;
        case "python":
          languageExtension = (
            await import("@codemirror/lang-python")
          ).python();
          break;
        case "java":
          languageExtension = (await import("@codemirror/lang-java")).java();
          break;
        case "html":
          languageExtension = (await import("@codemirror/lang-html")).html();
          break;
        case "css":
          languageExtension = (await import("@codemirror/lang-css")).css();
          break;
        case "php":
          languageExtension = (await import("@codemirror/lang-php")).php();
          break;
        case "ruby":
          languageExtension = (await import("@codemirror/lang-css")).css();
          break;
        default:
          languageExtension = (
            await import("@codemirror/lang-javascript")
          ).javascript(); // Default
      }

      setExtensions([languageExtension]);
    }

    loadLanguage();
  }, [syntax]);

  const onChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Create a New Paste
      </h1>
      <Formik
        initialValues={{
          title: "",
          date: undefined,
          password: "",
        }}
        validationSchema={() => pasteSchema(mode === "password")}
        onSubmit={async (values, { setSubmitting }) => {
          const zeroExperation = new Date(0);
          const pasteBody = {
            ...values,
            date: date == undefined ? zeroExperation : date,
            syntax: syntax,
            mode: mode,
            content: content,
            recaptchaToken: recaptchaToken,
          };

          if (!recaptchaToken) {
            return toast({
              variant: "default",
              title: "Please complete the CAPTCHA",
            });
          }
          const currentdate = new Date();
          if (pasteBody.date && date && date < currentdate) {
            return toast({
              variant: "default",
              title: "Please make sure the date is in the future",
            });
          }

          if (content === "") {
            return toast({
              variant: "default",
              title: "Can't create empty paste",
            });
          }

          await handlePostCreation(pasteBody);
          setSubmitting(false); // Stop form submission loading
        }}
      >
        {({ isSubmitting }) => (
          <Form className="min-h-[80vh] max-w-[80vw] mx-auto flex flex-col-reverse xl:flex-row gap-5 xl:gap-3 xl:items-start xl:justify-between p-4">
            <div className="w-full h-full">
              <div className="space-y-2 flex-grow flex flex-col mb-4">
                <CodeMirror
                  height="600px"
                  theme={"dark"}
                  extensions={syntax === "plain" ? undefined : extensions}
                  readOnly={isSubmitting}
                  onChange={onChange}
                  lang="en"
                  className="z-0"
                />
              </div>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_BOX_SITE_KEY}
                onChange={onRecaptchaChange}
                size="normal"
                className="my-5"
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <PulseLoader color="#1f0620" size={10} />
                ) : (
                  "Create Paste"
                )}
              </Button>
            </div>
            <div>
              <div className="space-y-2 mb-4">
                <MyTextInput
                  label="Title"
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Untitled Paste"
                  size={50}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2 mb-4">
                <Select value={syntax} onValueChange={setSyntax}>
                  <SelectTrigger id="syntax">
                    <SelectValue placeholder="Select syntax" />
                  </SelectTrigger>
                  <SelectContent>
                    {syntaxSelectOptions.map((syntax) => (
                      <SelectItem key={syntax.value} value={syntax.value}>
                        {syntax.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 mb-4">
                <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger id="mode">
                    <SelectValue placeholder="public" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">User private</SelectItem>
                    <SelectItem value="password">Password</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {mode === "password" && (
                <div className="space-y-2 mb-4">
                  <MyTextInput
                    label="Password"
                    id="password"
                    name="password"
                    type="text"
                    placeholder="Your Password"
                    size={50}
                    className="border-secondary"
                    disabled={isSubmitting}
                  />
                </div>
              )}

              {experation === "2" ? (
                <DatePicker date={date} setDate={setDate} />
              ) : (
                <Select value={experation} onValueChange={setExperation}>
                  <SelectTrigger id="date">
                    <SelectValue placeholder="No experation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">No expiration</SelectItem>
                    <SelectItem value="2">Choose an expiration date</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

const MyTextInput = ({ ...props }) => {
  // @ts-ignore
  const [field, meta] = useField(props);
  return (
    <div>
      <Input {...field} {...props} className="p-5 placeholder:opacity-50" />
      {meta.touched && meta.error ? (
        <div className="text-destructive mt-3 text-[13px]">{meta.error}</div>
      ) : null}
    </div>
  );
};
