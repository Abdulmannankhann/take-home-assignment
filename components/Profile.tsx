import { trpc } from '@/lib/trpc';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Label } from '@radix-ui/react-label';
import { FC, useEffect, useState } from 'react';

export const Profile: FC = () => {
	const query = trpc.profile.getProfile.useQuery(); // TODO: fix the error
	const [userData,setUserData]= useState({
		username:"",
		bio:"",
		profileUrl:""
	})

	useEffect(() => {
		const localData:any = localStorage.getItem('userData') || {};
		const data = JSON.parse(localData)
		setUserData(data)
	  }, [])

	  return (
		<div className='space-y-8 max-w-md w-full border rounded-md px-8 py-10'>
			<h2 className='text-xl'>Profile Info</h2>
			<Avatar>
              <AvatarImage src={`images/${userData?.profileUrl}`} width={100} className='rounded-full'/>
              <AvatarFallback><strong>Profile Photo :</strong></AvatarFallback>
            </Avatar>
			<Label htmlFor="text"><strong>Username : </strong>{userData?.username}</Label>
			<br/>
			<Label htmlFor="text"><strong>Bio : </strong>{userData?.bio}</Label>
		</div>
	);
};
