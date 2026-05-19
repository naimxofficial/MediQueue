"use client";
import { authClient } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const Login = () => {
    const [isVisible, setIsVisible] = useState(false);
    const onSubmit = async (e) => {

        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const userData = Object.fromEntries(formData.entries())

        const { data, error } = await authClient.signIn.email({
            email: userData.email,
            password: userData.password,
            rememberMe: true,
            callbackURL: '/',
        })
        console.log('sign up response:', { data, error });
        if (error) {
            toast.error('Login error:' + error.message)
        }
        if (data) {
            toast.success('Login Successful.')
        }
    };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
        })
    }
    return (
        <div className="my-7 not-md:my-5">
            <h2 className='text-4xl not-md:text-2xl text-center font-bold'>LOGIN TO YOUR ACCOUNT</h2>

            <Form className="p-7 my-5  mx-auto rounded-2xl flex w-96 flex-col gap-4" onSubmit={onSubmit}>

                {/* email */}
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>
                <TextField isRequired
                    minLength={6} validate={(value) => {
                        if (value.length < 6) {
                            return "Password must be at least 6 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[a-z]/.test(value)) {
                            return "Password must contain at least one lowercase letter";
                        }
                        
                        return null;
                    }} name="password">
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroup.Input

                            type={isVisible ? "text" : "password"} placeholder="Enter Password"
                        />
                        <InputGroup.Suffix className="pr-0">
                            <Button
                                isIconOnly
                                aria-label={isVisible ? "Hide password" : "Show password"}
                                size="sm"
                                variant="ghost"
                                onPress={() => setIsVisible(!isVisible)}
                            >
                                {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                            </Button>
                        </InputGroup.Suffix>
                    </InputGroup>
                </TextField>
                <div className="flex gap-2">
                    <button className="btn btn-primary rounded-full"  type="submit">
                        <Check />
                        Login
                    </button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
                <h4 className="text-center font-bold text-gray-500">Or</h4>
                <Button onClick={handleGoogleLogin} variant="outline" className={'w-full'}><FcGoogle />Login with Google</Button>
            </Form>
            <p className="text-center"><span className="font-semibold text-red-500">Note: </span>If your don&apos;t have an account, please <Link className="font-bold underline" href='/register'>create an account</Link> before trying to login.</p>
        </div>

    );
};

export default Login;