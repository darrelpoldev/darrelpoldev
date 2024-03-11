'use client';
import { Link } from '@chakra-ui/next-js';

export default async function Page() {
  return (
    //  TODO:
    //  Create the following pages:
    //  1. Header
    //  2. Landing Section
    //  3. ContactMe Section
    //  4. Footer

    <h1>
      Hello, Next.js!
      <Link href="/about" color="blue.400" _hover={{ color: 'blue.500' }}>
        About
      </Link>
    </h1>
  );
}
