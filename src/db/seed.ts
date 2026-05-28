import { db } from './index'; 
import { eventTypes } from './schema'

async function seed() {
  await db.insert(eventTypes).values([
    {
      id: 1,
      name: 'Conference',
      description: 'A large meeting for discussion and exchange of ideas.',
    },
    {
      id: 2,
      name: 'Movie',
      description: 'A film screening event.', 
    },
    {
      id: 3,
      name: 'Concert',
      description: 'A live music performance.',
    },
    {
      id: 4,
      name: 'Sports',
      description: 'A competitive physical activity or game.',  
    },
    {
      id: 5,
      name: 'Theater',
      description: 'A live performance of a play or musical.',
    },
    {
      id: 6,
      name: 'Workshop',
      description: 'An interactive session for learning and skill development.',
    }
  ]).onConflictDoNothing();

  console.log('Seeded successfully');
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});