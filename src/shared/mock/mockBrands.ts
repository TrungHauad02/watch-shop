import { BrandDTO } from '../types';

const mockBrands: BrandDTO[] = [
  {
    id: '1',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'Rolex',
    image:
      'https://images.unsplash.com/photo-1575077659190-fa71c1cdc56d?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Rolex is a Swiss luxury watchmaker known for its high-quality, precision-crafted watches.',
  },
  {
    id: '2',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'Omega',
    image:
      'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Omega is a Swiss watchmaker renowned for its precision and technological innovations.',
  },
  {
    id: '3',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'Tag Heuer',
    image:
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Tag Heuer is known for its sport watches and chronographs, combining style with precision.',
  },
  {
    id: '4',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'Patek Philippe',
    image:
      'https://images.unsplash.com/photo-1589988574803-455587b19171?q=80&w=773&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Patek Philippe is a Swiss luxury watch manufacturer known for its traditional and high-end timepieces.',
  },
  {
    id: '5',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'Audemars Piguet',
    image:
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Audemars Piguet is a Swiss luxury watchmaker famous for its innovative designs and mechanical expertise.',
  },
  {
    id: '6',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'Seiko',
    image:
      'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Seiko is a Japanese brand known for its precision, affordability, and long history of innovation.',
  },
  {
    id: '7',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'Casio',
    image:
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Casio is famous for its durable, affordable, and innovative watches, especially digital models.',
  },
  {
    id: '8',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'IWC Schaffhausen',
    image:
      'https://images.unsplash.com/photo-1579684912150-f9a99d300cea?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'IWC Schaffhausen is known for its precision and luxury mechanical watches, blending tradition with innovation.',
  },
  {
    id: '9',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'Breitling',
    image:
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Breitling is a luxury watch brand known for its aviation-inspired designs and precise chronographs.',
  },
  {
    id: '10',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'Cartier',
    image:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Cartier is a French luxury brand that is well-known for its elegant and timeless watch designs.',
  },
];

export { mockBrands };
