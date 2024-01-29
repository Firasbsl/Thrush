import React from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios';
import Swal from 'sweetalert2'


export default function Reviews() {

    const YupForm = Yup.object().shape({
        name: Yup.string().required('Name is required').min(2, 'Provide 2 characters at least'),
        email: Yup.string().required('Email is required').email('Invalid email format'),
        review: Yup.string().required('Please write your review').min(5, 'Provide 5 characters at least')

    })
    const resolverForm = { resolver: yupResolver(YupForm) }
    const { register, handleSubmit, reset, formState } = useForm(resolverForm)
    const { errors } = formState


    async function onSubmitForm(values) {
        let config = {
            method: 'post',
            url: 'http://localhost:3000/api/contact',
            headers: {
                'Content-Type': 'application/json'
            },
            data: values
        };

        try {
            const response = await axios(config);
            console.log(response);
            if (response.status == 200) {
                reset();
                Swal.fire({
                    toast: true,
                    icon: 'success',
                    title: 'Thank you. We will reach out to you soon.',
                    animation: false,
                    position: "top",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: false,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="mx-auto mt-1 w-full max-w-2xl rounded-xl bg-white p-8 shadow">
            <form
                onSubmit={handleSubmit(onSubmitForm)}
                className="grid grid-cols-1 gap-y-6">
                <div>
                    <label htmlFor="name" className="sr-only">
                        Full name
                    </label>
                    <input
                        type="text"
                        {...register('name')}
                        className={`block w-full py-3 px-4 placeholder-gray-500 focus:ring-orange-500 focus:border-orange-500 
                        border-gray-300 rounded-md focus:outline-none focus:ring-2`}
                        placeholder="Full name"
                    />
                    <span className="text-red-400 font-bold text-sm py-2">
                        {errors?.name?.message}
                    </span>
                </div>
                <div>
                    <label htmlFor="email" className="sr-only">
                        Email
                    </label>
                    <input
                        type="text"
                        {...register('email')}
                        className={`block w-full py-3 px-4 placeholder-gray-500 focus:ring-orange-500 focus:border-orange-500 
                                border-gray-300 rounded-md focus:outline-none focus:ring-2`}
                        placeholder="Email"
                    />
                    <span className="text-red-400 font-bold text-sm py-2">
                        {errors?.email?.message}
                    </span>
                </div>

                <div>
                    <label htmlFor="review" className="sr-only">
                        Review
                    </label>
                    <textarea
                        rows="4"
                        {...register('review')}
                        className={`block w-full py-3 px-4 placeholder-gray-500 focus:ring-orange-500 focus:border-orange-500 
                                border-gray-300 rounded-md focus:outline-none focus:ring-2`}
                        placeholder="Review">
                    </textarea>
                    <span className="text-red-400 font-bold text-sm py-2">
                        {errors?.review?.message}
                    </span>
                </div>

                <div>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-3 px-6 border border-transparent shadow text-l font-medium rounded-md text-white bg-[#ec5c0c] hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
