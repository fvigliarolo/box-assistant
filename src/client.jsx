import { createClient } from "@supabase/supabase-js";
const url = "https://wrmmrhqxcedukldtoaqd.supabase.co";
const apiKey = ""

export const supabase = createClient(url, apiKey);