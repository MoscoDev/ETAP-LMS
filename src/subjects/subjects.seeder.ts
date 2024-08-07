import { createConnection, getRepository } from 'typeorm';
import { Subject } from './subjects.entity';

const seedSubjects = async () => {
  const connection = await createConnection();
  const subjectRepository = getRepository(Subject);

  const subjects = [
    {
      id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
      name: 'Mathematics',
      description: 'Study of numbers, shapes, and patterns.',
      thumbnail:
        'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
      name: 'Physics',
      description:
        'Study of matter, energy, and the interactions between them.',
      thumbnail:
        'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r',
      name: 'Chemistry',
      description: 'Study of substances, their properties, and reactions.',
      thumbnail:
        'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s',
      name: 'Biology',
      description: 'Study of living organisms and their vital processes.',
      thumbnail:
        'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t',
      name: 'History',
      description: 'Study of past events, particularly in human affairs.',
      thumbnail:
        'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '6a7b8c9d-0e1f-2g3h-4i5j-6k7l8m9n0o1p',
      name: 'Geography',
      description:
        'Study of places and the relationships between people and their environments.',
      thumbnail:
        'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '7b8c9d0e-1f2g-3h4i-5j6k-7l8m9n0o1p2q',
      name: 'Literature',
      description:
        'Study of written works, especially those considered of superior or lasting artistic merit.',
      thumbnail:
        'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '8c9d0e1f-2g3h-4i5j-6k7l-8m9n0o1p2q3r',
      name: 'Art',
      description:
        'Study of various forms of creative expression including painting, sculpture, and music.',
      thumbnail:
        'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '9d0e1f2g-3h4i-5j6k-7l8m-9n0o1p2q3r4s',
      name: 'Music',
      description: 'Study of sound as an artistic form.',
      thumbnail: 'music_thumbnail.png',
    },
    {
      id: '0e1f2g3h-4i5j-6k7l-8m9n-0o1p2q3r4s5t',
      name: 'Computer Science',
      description: 'Study of computation, automation, and information.',
      thumbnail: 'computer_science_thumbnail.png',
    },
    {
      id: '1f2g3h4i-5j6k-7l8m-9n0o-1p2q3r4s5t6u',
      name: 'Economics',
      description:
        'Study of the production, distribution, and consumption of goods and services.',
      thumbnail: 'economics_thumbnail.png',
    },
    {
      id: '2g3h4i5j-6k7l-8m9n-0o1p-2q3r4s5t6u7v',
      name: 'Psychology',
      description: 'Study of the mind and behavior.',
      thumbnail: 'psychology_thumbnail.png',
    },
    {
      id: '3h4i5j6k-7l8m-9n0o-1p2q-3r4s5t6u7v8w',
      name: 'Philosophy',
      description:
        'Study of fundamental questions about existence, knowledge, values, reason, and mind.',
      thumbnail: 'philosophy_thumbnail.png',
    },
    {
      id: '4i5j6k7l-8m9n-0o1p-2q3r-4s5t6u7v8w9x',
      name: 'Political Science',
      description: 'Study of politics and government.',
      thumbnail: 'political_science_thumbnail.png',
    },
    {
      id: '5j6k7l8m-9n0o-1p2q-3r4s-5t6u7v8w9x0y',
      name: 'Sociology',
      description:
        'Study of the development, structure, and functioning of human society.',
      thumbnail: 'sociology_thumbnail.png',
    },
    {
      id: '6k7l8m9n-0o1p-2q3r-4s5t-6u7v8w9x0y1z',
      name: 'Anthropology',
      description: 'Study of humans, past and present.',
      thumbnail: 'anthropology_thumbnail.png',
    },
    {
      id: '7l8m9n0o-1p2q-3r4s-5t6u-7v8w9x0y1z2a',
      name: 'Environmental Science',
      description:
        'Study of the environment and solutions to environmental problems.',
      thumbnail: 'environmental_science_thumbnail.png',
    },
    {
      id: '8m9n0o1p-2q3r-4s5t-6u7v-8w9x0y1z2a3b',
      name: 'Astronomy',
      description: 'Study of celestial objects and phenomena.',
      thumbnail: 'astronomy_thumbnail.png',
    },
    {
      id: '9n0o1p2q-3r4s-5t6u-7v8w-9x0y1z2a3b4c',
      name: 'Engineering',
      description: 'Application of science and mathematics to solve problems.',
      thumbnail: 'engineering_thumbnail.png',
    },
    {
      id: '0o1p2q3r-4s5t-6u7v-8w9x-0y1z2a3b4c5d',
      name: 'Medicine',
      description:
        'Science and practice of diagnosing, treating, and preventing disease.',
      thumbnail: 'medicine_thumbnail.png',
    },
  ];

  await subjectRepository.save(subjects);
  await connection.close();
};

seedSubjects().catch(console.error);
