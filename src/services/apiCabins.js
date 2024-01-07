import supabase from "./supabase.js";
import { supabaseUrl } from "./supabase.js";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error(`Cabins could not be found.`);
  }
  return data;
}

// Reusing the create function for both adding and deleting data.

export async function createEditCabin(newCabin, id) {
  // console.log(newCabin, id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // We will create a new cabin only if there is no id which means it is edit cabin

  let query = supabase.from("cabins");

  // A. Create Cabin
  if (!id) {
    // 1. Create cabin
    // query
    //   .insert([{ ...newCabin, image: imagePath }])
    //   .select()
    //   .single(); // By default the insert function will not immediately return the newly created row ;
    // // so we need to return the data from here using .select() and .single()

    query = query.insert([{ ...newCabin, image: imagePath }]);

    const { data, error } = await query.select().single(); // this kind of technique is often used when we want to reuse a query

    if (error) {
      console.error(error);
      throw new Error(`Cabin could not be created.`);
    }
  }

  // 2. Edit Cabin
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

    const { data, error } = await query.select().single();

    if (error) {
      console.error(error);
      throw new Error(`Cabin could not be edited.`);
    }
  }

  // 2. Upload image

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin could not be uploaded and the cabin was not created."
    );
  }
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error(`Cabin cannot be deleted.`);
  }
  return "Deleted successfully";
}
