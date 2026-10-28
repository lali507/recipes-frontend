import { useForm,type SubmitHandler } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import FormField from "./form/formField"

import MyButton from "./form/Button"
import { useLoginMutation } from "../store/api/authApi"

import ShowPromise from "./showPromise"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { selectUser, setUser } from "../store/state/userSlice"
import { Link, Navigate, useLocation, useNavigate } from "react-router"
const schema = yup.object({
  
  email: yup
      .string()
      .trim()
      .required("אימייל הוא שדה חובה")
      .email("אימייל לא תקין"),
    
      
    password: yup
      .string()
      .required("סיסמה היא שדה חובה")
    
})

type Inputs = yup.InferType<typeof schema>





  
  
  
export default function Login() {
  const [loginFn,{isError,error,isSuccess,isLoading}]=useLoginMutation()
  const nav = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  // Protected שולח ב-state את הדף שביקשו לפני ההפניה להתחברות
  const from: string = useLocation().state?.from ?? "/recipes"
  const {
    register,
    handleSubmit,
    
    formState: { errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit", // ולידציה בעת שליחת הטופס
    defaultValues: {
      
      email: "",
     
     
      password: "",
   
      
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async function (data) {
    try{
     const res = await loginFn({email:data.email,password:data.password}).unwrap()
     localStorage.setItem("token",res.token)
      dispatch(setUser(res.user))
      nav(from, { replace: true })
    }
    catch(e)
    {
      console.log(e);
      
    }
   
}

  // כבר מחוברת (למשל חזרה אחורה לדף ההתחברות) - אין סיבה להציג את הטופס
  if (user && !isSubmitting) return <Navigate to={from} replace />

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>טופס התחברות</h2>
    <ShowPromise
  isLoading={isLoading}
  isError={isError}
  isSuccess={isSuccess}
  eror={error}//api eror exp 500
  successText="התחברות הושלמה בהצלחה!"
/>

        <FormField  type="email" registration={register("email")} error={errors.email} label="אימייל" placeholder="example@example.com" required/>
        <FormField  type="password" registration={register("password")} error={errors.password} label="סיסמה" required/>

     
     
      <MyButton text={isSubmitting ? "שולח..." : "שלח"} type="submit" disabled={isSubmitting} />
      <Link to="/register">עדיין לא רשומה? להרשמה</Link>

      
    </form>
  );
}
      

    
