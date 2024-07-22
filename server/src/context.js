import { PrismaClient } from '@prisma/client';
import supabase from './utils/supabase/supabaseClient.js';

const prisma = new PrismaClient();

export const context = {
    prisma,
    supabase,
};
