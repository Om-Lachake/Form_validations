import { useEffect, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import type { FormValues, PostResponse } from "../types/form";
import { validateData } from "../utils/validation";
import "./FormComponent.css";
import type { FormErrors } from "../types/formError";
import { useDebounce } from "../hooks/Debounce";

const initialFormValues: FormValues = {
  name: "",
  email: "",
};

function FormComponent() {
  
  const baseURL = "http://localhost:3000/api";

  const [values, setValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<Partial<FormErrors>>({});
  const [status, setStatus] = useState<"idle" | "pending" | "submitted">("idle");
  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    name: false,
    email: false
  });
  const [valid, setValid] = useState<string | null>(null);

  const debouncedValue = useDebounce(values, 500);

  useEffect(() => {

    setValid(null);

    let validationErors = validateData(debouncedValue);
    setErrors(validationErors);

    if(Object.keys(validationErors).length !== 0){
      return;
    }

    let searchEmail = debouncedValue.email;
    fetchDetails(`${baseURL}/lookUser`, {email: searchEmail})
      .then((res) => {
        if(res?.message === "User alrady exists"){
          setErrors((prev) => ({...prev, email:"This email is already registered"}));
          setValid(null);
        }else if(res?.message === "User Email available"){
          setValid("User Email available");
        }
      })
    
  }, [debouncedValue])

  const handleBlur = (e:ChangeEvent<HTMLInputElement>) => {
    const {name} = e.target;
    setTouched((prev) => ({...prev, [name]:true}));
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setValues((prev) => ({...prev, [name]: value}));
  }


  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    setValid(null);

    let validationErors = validateData(values);
    setErrors(validationErors);

    if(JSON.stringify(validationErors) === JSON.stringify({})){
      setStatus("pending");
      fetchDetails(`${baseURL}/addUser`, { ...values }).then((res) => {
        if (res?.message === "Email already exists") {
          setErrors((prev) => ({
            ...prev,
            email: "This email is already registered",
          }));
          setValid(null);
          setStatus("idle")
        } else if (res?.message === "User added successfully") {
          setStatus("submitted");
          setTouched({
            name: false,
            email: false,
          });
          setValues({
            name: "",
            email: "",
          });
        } else if (res?.message === "ValidationError") {
          setStatus("idle");
          alert("Please fill all fields correctly");
        }else{
          setStatus("idle");
          console.log(res);
        }
      });
      return;
    }
  }

  async function fetchDetails(searchUrl = "", data: any): Promise<PostResponse|null> {
    try {
      const response = await fetch(searchUrl, {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      return (await response.json()) as PostResponse;
    } catch (error) {
      console.log("Error Posting data: ", error);
      return null;
    }
  }

  return (
    <div className="form-card">
      <div className="form-card__header">
        <p className="eyebrow">Quick connect</p>
        <h2>Tell us about yourself</h2>
        <p className="form-card__subtitle">
          Share your name and email so we can follow up with updates and
          resources.
        </p>
      </div>

      <form className="form-card__form" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Name</span>
          <input
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Jane Doe"
          />
          {touched.name && errors.name && (
            <span className="field-error">{errors.name}</span>
          )}
        </label>

        <label className="form-field">
          <span>Email</span>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="jane@example.com"
          />
          {touched.email && errors.email && (
            <span className="field-error">{errors.email}</span>
          )}
          {touched.email && !errors.email && valid && (
            <span className="field-valid">{valid}</span>
          )}
        </label>

        <button type="submit" className="form-button">
          Send message
        </button>

        {status === "submitted" && (
          <p className="form-success">
            Thanks! Your request has been received.
          </p>
        )}
      </form>
    </div>
  );
}

export default FormComponent;
