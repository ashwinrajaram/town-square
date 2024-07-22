import { PrismaClient } from '@prisma/client';
import supabase from './utils/supabase/supabaseClient.js';

const prisma = new PrismaClient();

export const context = {
    prisma,
    supabase,
};

export const closeClients = async () => {
    await prisma.$disconnect();
    console.log('Prisma client disconnected.');
};