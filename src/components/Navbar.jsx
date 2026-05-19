'use client'
import Link from "next/link";
import { ThemeSwitch } from "./ThemeSwitch";
import { Avatar, Button } from "@heroui/react";
import { authClient, useSession } from "@/lib/auth-client";
import { ArrowRightFromSquare, Gear, Persons } from "@gravity-ui/icons";
import { Dropdown, Label } from "@heroui/react";

const Navbar = () => {
    const { data, isPending } = useSession();
    if (isPending) {
        return <span className="loading loading-bars loading-xl mx-auto"></span>
    }
    const user = data?.user;

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    location.reload();
                },
            },
        });
    }
    return (
        <nav className=" flex h-16  items-center justify-between px-2 sm:px-6 lg:px-8">

            {/* Left side - MediQueue*/}
            <Link className="flex items-center gap-2" href="/">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap h-5 w-5 text-primary-foreground" aria-hidden="true"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path></svg>
                </div>
                <span className="font-serif lg:text-2xl text-lg not-md:text-xl font-semibold text-foreground ">MediQueue</span>
            </Link>


            {/* Mid part - Navlinks */}
            <div className="hidden items-center gap-3 lg:flex">
                <Link className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary bg-secondary text-foreground" href="/">Home</Link>
                <Link className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary text-muted-foreground" href="/tutors">Tutors</Link>

                {
                    user && <div> <Link className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary text-muted-foreground" href="/add-tutors">Add Tutors</Link>
                        <Link className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary text-muted-foreground" href="/my-tutors">My Tutors</Link>
                        <Link className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary text-muted-foreground" href="/dashboard/my-booked-sessions">My Booked Sessions</Link></div>
                }


            </div>


            {/* right side */}
            <div className="flex items-center gap-2">
                {/* toggle theme */}
                <ThemeSwitch></ThemeSwitch>

                {/* login and signup */}
                {
                    !user && <div className="items-center gap-2 flex">
                        {/* login */}
                        <Link href="/login"><button className="btn btn-soft not-md:btn-xs rounded-full">Log in</button></Link>

                        {/* signUp */}
                        <Link href="/register"><button className="btn btn-primary rounded-full not-md:btn-xs">Sign up</button></Link>
                    </div>
                }

                {
                    user && <div className="navbar-end gap-3">
                        {/* <Link href={'/profile'}>
                            <Avatar>
                                <Avatar.Image alt={user?.name} src={user?.image}
                                    referrerPolicy='no-referrer' />
                                <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>

                            </Avatar>
                        </Link> */}
                        <Dropdown>
                            <Dropdown.Trigger className="rounded-full">
                                <Avatar>
                                    <Avatar.Image alt={user?.name} src={user?.image}
                                        referrerPolicy='no-referrer' />
                                    <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
                                </Avatar>
                            </Dropdown.Trigger>
                            <Dropdown.Popover>
                                <div className="px-3 pt-3 pb-1">
                                    <div className="flex items-center gap-2">
                                        <Avatar size="sm">
                                            <Avatar.Image alt={user?.name} src={user?.image}
                                                referrerPolicy='no-referrer' />
                                            <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
                                        </Avatar>
                                        <div className="flex flex-col gap-0">
                                            <p className="text-sm leading-5 font-medium">{user?.name}</p>
                                            <p className="text-xs leading-none text-muted">{user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <Dropdown.Menu>
                                    <Dropdown.Item id="profile" textValue="Profile">
                                        <Link href={'\profile'}>Profile</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item id="logout" textValue="Logout" variant="danger">
                                        <div className="flex w-full items-center justify-between gap-2">
                                            <button className="text-red-500" onClick={handleLogout}>Log Out</button>
                                            <ArrowRightFromSquare className="size-3.5 text-danger" />
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown>
                        {/* <Button onClick={handleLogout} variant='danger' size="sm">Logout</Button> */}
                    </div>
                }


                {/* hamburger */}
                <div className="lg:hidden dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-xs btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 text-white rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><Link href={'/'}>Home</Link></li>
                        <li><Link href={'/tutors'}>Tutors</Link></li>
                        {
                            user && <div>
                                <li><Link href={'/add-tutors'}>Add Tutors</Link></li>
                                <li><Link href={'/my-tutors'}>My Tutors</Link></li>
                                <li><Link href={'/my-booked-sessions'}>My Booked Sessions</Link></li>
                            </div>
                        }

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;