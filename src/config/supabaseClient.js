import envConfig from "./env.js";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = envConfig.dbUrl;
const supabaseKey = envConfig.dbKey;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;