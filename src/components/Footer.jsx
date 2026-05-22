import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";


const Footer = () => {
    return (
        <footer>

            <div className="footer sm:footer-horizontal not-md:p-5 p-8 flex flex-col lg:flex-row justify-between">
                <aside className="">
                    <div className=''>
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap h-5 w-5 text-primary-foreground" aria-hidden="true"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path></svg>
                            </div>
                            <strong className='text-xl'>MediQueue – Tutor Booking System</strong>
                        </div>
                        <br />
                        <em className='font-light'>MediQueue is a modern tutor booking platform that connects students with <br /> qualified tutors through seamless scheduling, <br /> smart session management, and an organized online learning experience.
                        </em>
                    </div>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <Link href={'/tutors'} className="link link-hover">Tutors</Link>
                    <Link href={'/add-tutors'} className="link link-hover">Add Tutors</Link>
                    <Link href={'/my-tutors'} className="link link-hover">My Tutors</Link>
                    <Link href={'/my-booked-sessions'} className="link link-hover">My Booked Sessions</Link>
                </nav>
                <nav>
                    <h6 className="footer-title">About Us</h6>
                    <Link href={'#featured-tutors'} className="link link-hover">Featured Tutors</Link>
                    <Link href={'#stats'} className="link link-hover">Stats</Link>
                    <Link href={'#testimonials'} className="link link-hover">Testimonials</Link>
                </nav>
                <div>
                    <h6 className="footer-title">Contact Us</h6>
                    <ul className=' grid gap-2'>
                        <li className="link link-hover"><a href="mailto:mediqueue.bd@gmail.com">Email: mediqueue.bd@gmail.com</a></li>
                        <li className="link link-hover"><a href="tel:+88012345678"></a>Phone: +880 1234 5678</li>
                    </ul>
                </div>
                <nav>
                    <h6 className="footer-title">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                        <a className="flex items-center text-xl mr-1" href='https://www.x.com'>
                            <BsTwitterX />
                        </a>
                        <a href='https://www.youtube.com'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                        <a href='https://www.facebook.com/'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                    </div>
                </nav>
            </div>

            {/* copyright */}
            <div className="footer sm:footer-horizontal footer-center p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by MediQueue Ltd.</p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;