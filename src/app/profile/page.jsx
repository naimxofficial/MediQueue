'use client'
import { authClient, useSession } from '@/lib/auth-client';
import { Avatar, Button, FieldError, Form, Input, Label, Modal, TextField } from '@heroui/react';
import { MdAccountCircle } from 'react-icons/md';


const ProfilePage = () => {

    const onSubmit = async (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const image = e.target.image.value;

        await authClient.updateUser({
            name, image
        })
        location.reload();
    }

    const { data, isPending } = useSession();
    if (isPending) {
        return <div className="flex justify-center"><span className="loading loading-spinner text-primary loading-xl"></span></div>
    }
    const user = data?.user;
    return (
        <div className='my-7'>
            <h4 className='text-center font-bold text-4xl not-md:text-2xl my-7'>My Profile</h4>
            <div className='p-10 justify-center flex flex-col w-md mx-auto rounded-4xl  space-y-3 border border-gray-300'>
                <Avatar className='size-30 mx-auto'>
                    <Avatar.Image alt={user?.name} src={user?.image}
                        referrerPolicy='no-referrer' />
                    <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
                </Avatar>
                <h4 className='text-center font-bold text-xl'>Name: {user?.name}</h4>
                <h4 className='text-center font-bold text-xl'>Email: {user?.email}</h4>

                {/* Modal */}
                <Modal>
                    <Button variant='tertiary' className='mt-5 w-full'>Update Information</Button>
                    <Modal.Backdrop>
                        <Modal.Container>
                            <Modal.Dialog>
                                <Modal.CloseTrigger />
                                <Modal.Header>
                                    <MdAccountCircle className='text-4xl' />
                                    <Modal.Heading>Change name and image</Modal.Heading>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form className="flex w-96 flex-col gap-6 " onSubmit={onSubmit} >
                                        <TextField
                                            isRequired
                                            name="name"
                                            type="text"
                                        >
                                            <Label>Name</Label>
                                            <Input placeholder="Enter your name" />
                                            <FieldError />
                                        </TextField>
                                        <TextField
                                            isRequired
                                            name="image"
                                            type="text"
                                        >
                                            <Label>Image</Label>
                                            <Input placeholder="Enter your image URL" />
                                            <FieldError />
                                        </TextField>
                                        <button
                                            slot='close'
                                            type='submit' className="w-full btn btn-outline btn-primary rounded-full">
                                            Update information
                                        </button>
                                    </Form>
                                </Modal.Body>
                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>
                </Modal>
            </div>
        </div>
    );
};

export default ProfilePage;