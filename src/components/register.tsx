import { useForm,type SubmitHandler } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import FormField from "./form/formField"
import type { FieldConfig } from "./form/formField"
import MyButton from "./form/Button"
import { useRegisterMutation } from "../store/api/authApi"
import { useAppDispatch } from "../store/hook"
import { setUser } from "../store/state/userSlice"


import ShowPromise from "./showPromise"
import type { errResponse } from "../types/eror"
const schema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("שם מלא הוא שדה חובה")
    .min(2, "השם חייב להכיל לפחות 2 תווים")
    .max(50, "השם יכול להכיל עד 50 תווים"),
  email: yup
    .string()
    .trim()
    .required("אימייל הוא שדה חובה")
    .max(254, "האימייל ארוך מדי")
    .email("אימייל לא תקין"),
  password: yup
    .string()
    .required("סיסמה היא שדה חובה")
    .min(8, "הסיסמה חייבת להכיל לפחות 8 תווים")
    // השרת סופר בתים ולא תווים: אות עברית = 2 בתים
    .test("max-bytes", "הסיסמה ארוכה מדי (עד 72 תווים באנגלית)", (value) => new TextEncoder().encode(value ?? "").length <= 72)
    .matches(/[A-Za-z֐-׿]/, "הסיסמה חייבת לכלול לפחות אות אחת")
    .matches(/\d/, "הסיסמה חייבת לכלול לפחות ספרה אחת"),
  confirmPassword: yup
  .string()
  .required("אימות סיסמה הוא שדה חובה")
  .oneOf([yup.ref("password")], "סיסמאות חייבות להיות זהות"),
  
})

type Inputs = yup.InferType<typeof schema>
type FieldDef = Omit<FieldConfig, "registration"| "error"> & { name: keyof Inputs }



export default function Register() {
  const[ registerFn,{isSuccess,isError,isLoading,error}] = useRegisterMutation()
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors, isSubmitting ,},
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit", // ולידציה בעת שליחת הטופס
    defaultValues: {
      fullName: "",
      email: "",

      password: "",
      confirmPassword: "",

    },
  });
  const onSubmit: SubmitHandler<Inputs> = async function (data) {
  try{
  const res=await registerFn({name:data.fullName,email:data.email,password:data.password}).unwrap()
 
  localStorage.setItem("token",res.token)
  dispatch(setUser(res.user))
  }
    catch (e) {
  const err = (e as { data?: errResponse }).data?.error
  if (!err) return

  // 409 - המייל כבר רשום
  if (err.code === "EMAIL_TAKEN") {
    setError("email", { message: "האימייל הזה כבר רשום" })
  }

  
}

}

  const schemaFields: FieldDef[] = [
    { name: "fullName", label: "שם מלא", type: "text" , placeholder: "אנונימי", required: true,instructions:"השם בין 2 ל-50 תווים"},
    { name: "email", label: "אימייל", type: "email" , placeholder: "example@example.com", required: true,instructions:"כתובת אימייל תקינה, עד 254 תווים"},
   
    { name: "password", label: "סיסמה", type: "password", required: true ,instructions:"לפחות 8 תווים, כולל אות אחת וספרה אחת"},
    { name: "confirmPassword", label: "אימות סיסמה", type: "password", required: true ,instructions:"הקלידו שוב את אותה סיסמה"}
  ];

  // שגיאת אימייל תפוס כבר מוצגת ליד השדה - לא מציגים אותה שוב למעלה
  const emailTaken = (error as { data?: errResponse } | undefined)?.data?.error?.code === "EMAIL_TAKEN"

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
     <h2>טופס הרשמה</h2>

<ShowPromise
  isLoading={isLoading}
  isError={isError && !emailTaken}
  isSuccess={isSuccess}
  eror={error}//api eror exp 500
  successText="ההרשמה הושלמה בהצלחה!"
/>

      
      
      {schemaFields.map((field) =>  (
        <FormField
          key={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          required={field.required}
          registration={register(field.name)}
          error={errors[field.name]}//vlidation eror schema or email exist
          instructions={field.instructions}
        />
      ))
    }


      {/* todo link to login */}
      <MyButton text={isSubmitting ? "שולח..." : "שלח"} type="submit" disabled={isSubmitting} />


    </form>
  );
}



