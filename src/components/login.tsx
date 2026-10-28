import { useForm, type SubmitHandler } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import FormField from "./form/formField"
import MyButton from "./form/Button"
import { useLoginMutation } from "../store/api/authApi"
import ShowPromise from "./showPromise"
import AuthCard from "./AuthCard"
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
  const [loginFn, { isError, error, isSuccess, isLoading }] = useLoginMutation()
  const nav = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const from: string = useLocation().state?.from ?? "/recipes"
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async function (data) {
    try {
      const res = await loginFn({ email: data.email, password: data.password }).unwrap()
      localStorage.setItem("token", res.token)
      dispatch(setUser(res.user))
      nav(from, { replace: true })
    }
    catch {
    }
  }

  if (user && !isSubmitting) return <Navigate to={from} replace />

  return (
    <AuthCard icon="👋" title="ברוכה השבה" subtitle="התחברי כדי להמשיך לבשל"
      footer={<>עדיין לא רשומה? <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700 hover:underline">להרשמה</Link></>}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <ShowPromise
          isLoading={false}
          isError={isError}
          isSuccess={isSuccess}
          eror={error}
          successText="התחברות הושלמה בהצלחה!"
        />
        <FormField type="email" registration={register("email")} error={errors.email} label="אימייל" placeholder="example@example.com" required />
        <FormField type="password" registration={register("password")} error={errors.password} label="סיסמה" required />
        <MyButton text={isSubmitting || isLoading ? "מתחברת..." : "התחברות"} type="submit" size="lg" fullWidth disabled={isSubmitting} />
      </form>
    </AuthCard>
  );
}
