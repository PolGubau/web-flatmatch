/// <reference types="vite/types/importMeta.d.ts" />

import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "~/config";
import type { Database } from "./types";

export const supabase = createClient<Database["public"]>(SUPABASE_URL, SUPABASE_ANON_KEY);
