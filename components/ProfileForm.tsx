import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem,FormLabel,FormControl,FormDescription,FormMessage,useFormField } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import axios from "axios";

export function ProfileForm() {
	const [uploading, setUploading] = useState(false);
	const [selectedImage, setSelectedImage] = useState("");
	const [selectedFile, setSelectedFile] = useState<File>();

	function checkFileType(file: File) { // file type checking
		if (file?.name) {
			const fileType = file.name.split(".").pop();
			if (["gif", "png", "jpg"].includes(fileType)) return true; 
		}
		return false;
	}

	// TODO: ensure the form is typesafe
	const formSchema = z.object({
		username:z.string().nonempty("Username is mandatory"),
		bio:z.string().nonempty("Bio is mandatory"),
		profileUrl: z.any().refine((file: File) => file?.length !== 0, "File is required")
		.refine((file) => checkFileType(selectedFile), "Only .jpg, .gif, .png formats are supported.")
	})
	const form = useForm({
		resolver:zodResolver(formSchema),
		defaultValues: {
			username: "",
			bio:""
		  },
	});

	const updateProfile = form.handleSubmit(async (values) => {
		console.log(values)
		if(values.username && values.bio && selectedImage){
			localStorage.setItem("userData",JSON.stringify({
			username:values?.username,
			bio:values?.bio,
			profileUrl:selectedImage
		}))
		window.location.reload()
		}
		// TODO: submit the values here
		// 1. upload the photo to the /api/upload route
		// 2. after storing the image return a url to it and store that into
		// the profile data
	});

	const handleUpload = async () => {
		setUploading(true);
		try {
		  if (!selectedFile) return;
		  const formData = new FormData();
		  formData.append("myImage", selectedFile);
		  const { data } = await axios.post("/api/upload", formData);
		  const url = data?.done?.myImage[0]?.newFilename;
		  if(url){
			setSelectedImage(url)
		  }
		} catch (error: any) {
		  console.log(error.response?.data);
		}
		setUploading(false);
	  };

	  useEffect(()=>{
		handleUpload()
	  },[selectedFile])

	return (
		<Form {...form}>
			<form
				onSubmit={updateProfile}
				className='space-y-8 max-w-md w-full border rounded-md px-8 py-10'
			>
				<h2 className='text-xl'>Profile form</h2>
				{/* Username */}
				<FormField 
				control={form.control}
				name="username"
				render={({ field }) => (
				<FormItem>
					<FormLabel>Username</FormLabel>
					<FormControl>
						<Input placeholder="Username..." {...field} />
						</FormControl>
						<FormMessage />
				</FormItem>
				)}
				/>

				{/* Profile Photo */}
				<FormField 
				control={form.control}
				name="profileUrl"
				render={({ field }) => {
					return (
				<FormItem>
					<FormLabel>Profile Photo</FormLabel>
					<FormControl >
						<Input type='file' placeholder="Profile Photo..." {...field}
						onChange={({ target }) => {if (target.files) {
							const file = target.files[0];
							setSelectedFile(file);
						}
					}}
						/>
						</FormControl>
						<FormMessage />
				</FormItem>
				)}}

				//Bio
				/>
				<FormField 
				control={form.control}
				name="bio"
				render={({ field }) => (
				<FormItem>
					<FormLabel>Bio</FormLabel>
					<FormControl>
						<Textarea placeholder="Bio..." {...field} />
						</FormControl>
						<FormMessage />
				</FormItem>
				)}
				/>

				{/*<p>replace me with shadcn file input</p>*/}

				{/*<p>replace me with shadcn textarea</p>*/}

				{/*<p>don&apos;t forget the error messages</p>*/}

				<Button type='submit'>Update Profile</Button>
			</form>
		</Form>
	);
}
