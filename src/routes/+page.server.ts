import { db } from "$lib/server/db";
import { medicines } from "$lib/server/db/schema";
import { fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth();
    if (!session) {
        return {meds: []};
    }

    const userId = session?.user?.id;

    const allMeds = await db.select({
        id: medicines.id,
        medicine_name: medicines.medicine_name,
        quantity: medicines.quantity,
        dosage: medicines.dosage,
        start_date: medicines.start_date,
        end_date: medicines.end_date,
        time: medicines.time,
        frequency: medicines.frequency,
    }).from(medicines).where(eq(medicines.userId, userId));

    const meds = allMeds.map((med) => ({...med}));

    return { meds: meds };
};

export const actions: Actions = {
    delete: async ({ request, locals }) => {
        const formData = await request.formData();
        const id = formData.get('id');

        const session = await locals.auth();
        if (!session) {
            return fail(401, { message: 'You must be logged in to do this' });
        }

        await db.delete(medicines).where(eq(medicines.id, id));

        return { message: 'Deleted' };
    },
};
