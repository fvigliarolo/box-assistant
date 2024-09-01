import { createClient } from "@supabase/supabase-js";
const url = "https://wrmmrhqxcedukldtoaqd.supabase.co";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndybW1yaHF4Y2VkdWtsZHRvYXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwODEwMzMsImV4cCI6MjA0MDY1NzAzM30.jhfiVb2Fnt0caJccWjfnjEeHbWt2ZddgLS2mNVMqg1o"

export const supabase = createClient(url, apiKey);
