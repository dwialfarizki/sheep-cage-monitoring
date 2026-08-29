import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedLoadcellBadan = async () => {
    try {
        // Fetch existing chip IDs from the database
        const chips = await prisma.domba.findMany({
            select: {
                id: true
            }
        });

        const chipIds = chips.map(chip => chip.id);

        // Data to be inserted
        const dataToInsert = [
            { berat: 15.11, time: '13:21:43' },
            { berat: 15.34, time: '13:10:12' },
            { berat: 15.31, time: '13:20:27' },
            { berat: 15.26, time: '13:30:49' },
            { berat: 15.19, time: '13:50:52' }
        ];
        const targetDate = new Date(2025, 2, 17); // March 17, 2025

        // Generate LoadcellBadan data for each chip ID
        const loadcellBadanData = chipIds.flatMap(chip_id => {
            return dataToInsert.map(({ berat, time }) => {
                const [hours, minutes, seconds] = time.split(':');
                const dateWithTime = new Date(targetDate);
                dateWithTime.setHours(hours, minutes, seconds);

                return {
                    berat: berat,
                    chip_id: chip_id,
                    sensor_id: 2, // Assuming sensor_id 2 corresponds to LoadcellBadan
                    createdAt: dateWithTime,
                    updatedAt: dateWithTime
                };
            });
        });

        // Insert LoadcellBadan data into the database
        await prisma.loadcellBadan.createMany({
            data: loadcellBadanData
        });

        console.log('LoadcellBadan data inserted successfully');
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
};

seedLoadcellBadan().catch(e => {
    console.error(e);
    process.exit(1);
});