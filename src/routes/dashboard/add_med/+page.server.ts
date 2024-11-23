import type {Actions, PageServerLoad} from './$types'
import {superValidate} from "sveltekit-superforms";
import {zod} from "sveltekit-superforms/adapters";
import { medicineSchema} from "$lib/schema/schema";
import {fail, redirect, type ServerLoadEvent} from "@sveltejs/kit";
import { db } from '$lib/server/db';
import { medicines } from '$lib/server/db/schema';

export const load: PageServerLoad = async ( event: ServerLoadEvent ) =>{
    const form = await superValidate(event, zod(medicineSchema));
    return { form }
}

export const actions: Actions = {
    add: async ({ request, locals }) => {
        const session = await locals.auth();
        if (!session) {
            return fail(401, { message: 'You must be logged in to do this' });
        }

        const form = await superValidate(request, zod(medicineSchema));
        if (!form.valid) {
            return fail(400, { form })
        }

        const userId = session?.user?.id;
        const id = crypto.randomUUID();

        await db.insert(medicines).values({
            id: id,
            medicine_name: form.data.medicine_name,
            quantity: form.data.quantity,
            dosage: form.data.dosage,
            start_date: form.data.start_date,
            end_date: form.data.end_date,
            time: form.data.time,
            frequency: form.data.frequency,
            userId: userId,
        });

        redirect(300, "/");
    },
}
