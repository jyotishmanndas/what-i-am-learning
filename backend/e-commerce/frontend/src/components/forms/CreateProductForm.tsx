import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { createProductFormSchema } from '@/lib/zod'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { ArrowRight, ImageIcon, Package, IndianRupee, FileText } from 'lucide-react'
import axios from "axios"
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { axiosInstance } from '@/config/axiosInstance'

type CreateProductFormValues = z.infer<typeof createProductFormSchema>

const CreateProductForm = () => {
    const navigate = useNavigate()

    const form = useForm<CreateProductFormValues>({
        resolver: zodResolver(createProductFormSchema),
        defaultValues: {
            productName: "",
            productDescription: "",
            price: { amount: 0, currency: "INR" },
            images: [],
        },
    })

    async function onSubmit(data: CreateProductFormValues) {
        try {
            const formData = new FormData()
            formData.append("productName", data.productName)
            if (data.productDescription) formData.append("productDescription", data.productDescription)
            formData.append("price", JSON.stringify({ amount: data.price.amount, currency: data.price.currency }))
            data.images.forEach((file) => formData.append("image", file))
            const res = await axiosInstance.post("/api/v1/product/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            if (res.status === 201) {
                toast.success(res.data.msg ?? "Product created successfully", { position: "bottom-center" })
                form.reset()
                navigate("/home")
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.msg ?? error.response?.data?.error ?? "Failed to create product"
                toast.error(msg, { position: "bottom-center" })
            }
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="productName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Product name</FieldLabel>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Package className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    type="text"
                                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009698] focus:border-transparent transition duration-200"
                                    placeholder="e.g. Wireless Headphones"
                                />
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="productDescription"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Description (optional)</FieldLabel>
                            <div className="relative">
                                <div className="absolute top-3 left-3 pointer-events-none">
                                    <FileText className="h-5 w-5 text-gray-400" />
                                </div>
                                <textarea
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    rows={3}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009698] focus:border-transparent transition duration-200 resize-none"
                                    placeholder="Brief description of the product"
                                />
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Controller
                        name="price.amount"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Price (amount)</FieldLabel>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <IndianRupee className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        {...field}
                                        value={field.value ?? ""}
                                        aria-invalid={fieldState.invalid}
                                        type="number"
                                        min={0}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009698] focus:border-transparent transition duration-200"
                                        placeholder="0.00"
                                    />
                                </div>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="price.currency"
                        control={form.control}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel>Currency</FieldLabel>
                                <select
                                    {...field}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009698] focus:border-transparent transition duration-200 bg-white"
                                >
                                    <option value="INR">INR</option>
                                    <option value="$">$ (USD)</option>
                                </select>
                            </Field>
                        )}
                    />
                </div>
                <Controller
                    name="images"
                    control={form.control}
                    render={({ field: { onChange, value, ...field }, fieldState }) => (
                        <Field>
                            <FieldLabel>Images (1–5, max 5MB each)</FieldLabel>
                            <div className="relative">
                                <div className="absolute top-3 left-3 pointer-events-none">
                                    <ImageIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    {...field}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009698] focus:border-transparent transition duration-200 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[#009698]/10 file:text-[#009698]"
                                    onChange={(e) => {
                                        const files = e.target.files
                                        if (files) onChange(Array.from(files))
                                    }}
                                />
                            </div>
                            {value?.length ? (
                                <p className="text-sm text-gray-500 mt-1">{value.length} file(s) selected</p>
                            ) : null}
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>

            <button
                type="submit"
                className="group w-full px-3 py-3 bg-black text-white mt-5 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors"
            >
                Create product
                <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
            </button>
        </form>
    )
}

export default CreateProductForm
