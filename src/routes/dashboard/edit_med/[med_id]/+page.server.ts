import { medicineSchema } from "$lib/schema/schema";
import { db } from "$lib/server/db";
import { medicines } from "$lib/server/db/schema";
import { fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = (async (event) => {
    const med_id = event.params.med_id;

    const med = await db.select({
        medicine_name: medicines.medicine_name,
        quantity: medicines.quantity,
        dosage: medicines.dosage,
        start_date: medicines.start_date,
        end_date: medicines.end_date,
        time: medicines.time,
        frequency: medicines.frequency,
    }).from(medicines).where(eq(medicines.id, med_id));

    const meds = Object.assign({}, ...med);

    const form = await superValidate(meds, zod(medicineSchema));
 
    return { form }
})

export const actions: Actions = {
    edit: async ({ request, locals, params }) => {
        const session = await locals.auth();
        if (!session) {
            return fail(401, { message: 'You must be logged in to do this' });
        }

        const form = await superValidate(request, zod(medicineSchema));
        if (!form.valid) {
            return fail(400, { form })
        }

        const id = params.med_id;

        await db.update(medicines).set({
            medicine_name: form.data.medicine_name,
            quantity: form.data.quantity,
            dosage: form.data.dosage,
            start_date: form.data.start_date,
            end_date: form.data.end_date,
            time: form.data.time,
            frequency: form.data.frequency,
        }).where(eq(medicines.id, id));

        redirect(300, "/");
    }
}
