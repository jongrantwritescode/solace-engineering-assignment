/** @jest-environment node */
import { GET } from './route';

const mockData = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    city: 'NYC',
    degree: 'MD',
    specialties: ['Cardiology'],
    yearsOfExperience: 5,
    phoneNumber: '1234567890',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    city: 'LA',
    degree: 'PhD',
    specialties: ['Oncology'],
    yearsOfExperience: 10,
    phoneNumber: '0987654321',
  },
];

const mockCountResult = [{ count: mockData.length }];

const mockOffset = jest.fn().mockResolvedValue(mockData);
const mockLimit = jest.fn(() => ({ offset: mockOffset }));
export const mockWhereData = jest.fn(() => ({ limit: mockLimit }));
const mockFromData = jest.fn(() => ({ where: mockWhereData, limit: mockLimit }));
const mockWhereCount = jest.fn().mockResolvedValue(mockCountResult);
const mockFromCount = jest.fn(() => {
  const result: any = Promise.resolve(mockCountResult);
  result.where = mockWhereCount;
  return result;
});
const mockSelect = jest.fn((arg?: any) => {
  if (arg && arg.count) {
    return { from: mockFromCount };
  }
  return { from: mockFromData };
});

jest.mock('../../../db', () => ({
  __esModule: true,
  default: { select: mockSelect },
}));

describe('GET /api/advocates', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.DATABASE_URL = 'postgres://test';
  });

  it('returns paginated results', async () => {
    const request = new Request('http://localhost/api/advocates?page=1&limit=2');
    const response = await GET(request);
    const body = await response.json();
    expect(body.data).toHaveLength(2);
    expect(body.pagination).toEqual({
      page: 1,
      limit: 2,
      total: 2,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    });
    expect(mockWhereData).not.toHaveBeenCalled();
  });

  it('applies search filter', async () => {
    const request = new Request('http://localhost/api/advocates?search=John&page=1&limit=20');
    const response = await GET(request);
    const body = await response.json();
    expect(mockWhereData).toHaveBeenCalled();
    expect(body.data).toEqual(mockData);
  });
});
