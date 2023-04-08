interface SeedEntry {
    description: string;
    createdAt: number;
    status: string;
}

interface SeedData {
    entries: SeedEntry[];
}

export const seedData: SeedData = {
    entries: [
        {
            description:
                'Pendiente: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel rhoncus velit. Proin placerat ante ac sapien euismod tristique. Aliquam id sapien libero. Mauris vehicula arcu et ultrices laoreet',
            createdAt: Date.now(),
            status: 'In-Progress',
        },
        {
            description:
                'En Progreso: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel rhoncus velit. Proin placerat ante ac sapien euismod tristique. Aliquam id sapien libero. Mauris vehicula arcu et ultrices laoreet',
            createdAt: Date.now() - 1000000,
            status: 'Pending',
        },
        {
            description:
                'Terminada: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel rhoncus velit. Proin placerat ante ac sapien euismod tristique. Aliquam id sapien libero. Mauris vehicula arcu et ultrices laoreet',
            createdAt: Date.now() - 11000,
            status: 'Finished',
        },
    ],
};
