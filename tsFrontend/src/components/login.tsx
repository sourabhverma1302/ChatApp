import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z from 'zod';

const Login = () => {
    const navigate = useNavigate();
    const loginSchema = z.object({
        email: z.string().email("Enter a valid email"),
        password: z.string().min(8, "Please enter a valid pass")
    });
    type loginUser = z.infer<typeof loginSchema>;
    const { register, handleSubmit, formState: { errors } } = useForm<loginUser>(
        { resolver: zodResolver(loginSchema) }
    );
    const submit: SubmitHandler<loginUser> = async (data: loginUser) => {
        console.log("loginUser", data);
        const newdata: loginUser = {
            email: data.email,
            password: data.password
        };
        await axios.post('https://chatapp-1-31e7.onrender.com/login', newdata)
            .then((res) => {
                console.log("res", res);
                localStorage.setItem('phoneNumber', res?.data?.checkUser?.phoneNumber);
                navigate('/chat');
            })
            .catch((err) => { console.log("err", err) })
    }
    return (

        <div className="flex min-h-full flex-col justify-center h-[730px] w-[100%]" style={{ backgroundColor: '#111827' }}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign In to your account</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-3" action="#" method="POST" onSubmit={handleSubmit(submit)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white flex justify-start">Email Adress</label>
                        <input style={{ backgroundColor: '#1d2432', color: 'white' }} id="email" type="text" required {...register("email")} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        {errors?.email ? <p style={{ display: 'flex', justifyContent: 'flex-start', color: 'red' }}>{errors?.email?.message}</p> : ''}
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">Password</label>
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div>
                        <input style={{ backgroundColor: '#1d2432', color: 'white' }} id="password" type="password" {...register("password")} required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        {errors?.password ? <p style={{ display: 'flex', justifyContent: 'flex-start', color: 'red' }}>{errors?.password?.message}</p> : ''}
                    </div>
                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login