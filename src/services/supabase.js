import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://nvdyofwpczpyjrqpfkjn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52ZHlvZndwY3pweWpycXBma2puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwMDIwMDksImV4cCI6MjAxOTU3ODAwOX0.un7u6icQRob0vn-wfUvMBW1qRoNqRf-gwr0HDFIzhwA";
// since RLS is enabled , exposing the key is safe as user will only be able to read the data.
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
