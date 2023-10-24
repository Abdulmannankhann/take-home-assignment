import { Profile } from '@/components/Profile';
import { ProfileForm } from '@/components/ProfileForm';
import axios from 'axios';
import { NextPage } from 'next';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

const ProfilePage = ({userData}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<div className='mt-32 container space-x-8 flex justify-center mx-auto'>
			<Profile userData={userData}/>
			<ProfileForm />
		</div>
	);
};

export default ProfilePage;

  export const getServerSideProps = (async (context) => {
	try{
		const domain = context.req.headers.host
		const res = await fetch(`http://${domain}/api/user` ,{
			method:"GET"
		})
		const userData = await res.json()
	return { props:{
		userData:userData.data.length > 0 ? userData.data[0] : {}
	} }
	}
	catch {
		return { props: {
			userData:{}
		}  }
	}
  }) satisfies GetServerSideProps<{
	userData: any
  }>