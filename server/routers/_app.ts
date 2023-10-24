import { UPDATE_PROFILE_TRPC_SCHEMA } from '@/lib/validation-schemas/profile';
import { procedure, router } from '@/server/trpc';

const profileRouter = router({
	updateProfile: procedure.input(UPDATE_PROFILE_TRPC_SCHEMA).mutation(() => {
		// TODO: save profile data to a db of your choosing
	}),
	getProfile: procedure.query(async () => {
		// TODO: get profile data from db
	}),
});

export const appRouter = router({
	profile: profileRouter,
});

export type AppRouter = typeof appRouter;
