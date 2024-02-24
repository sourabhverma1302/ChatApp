import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z from 'zod';

const SignUp = () => {
    const navigate = useNavigate();
    const signUpSchema = z.object({
        name: z.string(),
        email: z.string().email("Please provide valid email"),
        phoneNumber: z.string().min(10, "Please provide valid phoneNumber").max(10, "Please provide valid phoneNumber"),
        password: z.string().min(8, "Password length should me more than or equal to 8")
    });
    type user = z.infer<typeof signUpSchema>;
    const { register, handleSubmit, formState: { errors } } = useForm<user>(
        { resolver: zodResolver(signUpSchema) }
    )
    const submit: SubmitHandler<user> = async (data: user) => {
        console.log("userdata", data);
        const dd: user = {
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: data.password
        };
        try {
            const res = await axios.post('https://chatapp-3.onrender.com/signUp', dd);
            console.log("data", res.data);
            localStorage.setItem('phoneNumber', data.phoneNumber);
            navigate('/chat')
        } catch (error) {
            console.log("error", error);
        }
    }
    return (
        <div className="flex flex-col justify-center w-[100%] h-[735px] p-10" style={{ backgroundColor: '#111827' }}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign up to your account</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-3" action="#" method="POST" onSubmit={handleSubmit(submit)}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-white flex justify-start">Username</label>
                        <input style={{ backgroundColor: '#1d2432', color: 'white' }} id="name" type="name" required {...register("name")} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        {errors?.name ? <p style={{ display: 'flex', justifyContent: 'flex-start', color: 'red' }}>{errors?.name?.message}</p> : ''}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white flex justify-start">Email Adress</label>
                        <input style={{ backgroundColor: '#1d2432', color: 'white' }} id="email" type="text" required {...register("email")} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        {errors?.email ? <p style={{ display: 'flex', justifyContent: 'flex-start', color: 'red' }}>{errors?.email?.message}</p> : ''}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-white flex justify-start">Phone Number</label>
                        <input style={{ backgroundColor: '#1d2432', color: 'white' }} id="phone" type="phone"  {...register("phoneNumber")} required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        {errors?.phoneNumber ? <p style={{ display: 'flex', justifyContent: 'flex-start', color: 'red' }}>{errors?.phoneNumber?.message}</p> : ''}
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">Password</label>
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div>
                        <input style={{ backgroundColor: '#1d2432', color: 'white' }} id="password" type="password" {...register("password")} required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        {errors?.password ? <p style={{ display: 'flex', justifyContent: 'flex-start', color: 'red' }}>{errors?.password?.message}</p> : ''}
                    </div>
                    <div className="text-sm">
                        <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 flex justify-end">Already a user?</a>
                    </div>
                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp