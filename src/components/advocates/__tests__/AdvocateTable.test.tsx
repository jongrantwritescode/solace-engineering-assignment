import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AdvocateTable } from '../AdvocateTable';
import type { Advocate } from '../../../types/advocate.types';

describe('AdvocateTable', () => {
  const advocates: Advocate[] = [
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
  ];

  it('renders advocate data with phone link', async () => {
    const user = userEvent.setup();
    render(<AdvocateTable advocates={advocates} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('NYC')).toBeInTheDocument();
    expect(screen.getByText('MD')).toBeInTheDocument();
    expect(screen.getByText('Cardiology')).toBeInTheDocument();
    expect(screen.getByText('5 years')).toBeInTheDocument();
    
    const phone = screen.getByText('(123) 456-7890');
    expect(phone).toBeInTheDocument();
    
    // Check that the phone number is a link with tel: href
    expect(phone.closest('a')).toHaveAttribute('href', 'tel:1234567890');
  });

  it('renders multiple advocates correctly', () => {
    const multipleAdvocates: Advocate[] = [
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
        degree: 'DO',
        specialties: ['Pediatrics'],
        yearsOfExperience: 3,
        phoneNumber: '9876543210',
      },
    ];

    render(<AdvocateTable advocates={multipleAdvocates} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('NYC')).toBeInTheDocument();
    expect(screen.getByText('LA')).toBeInTheDocument();
    expect(screen.getByText('Cardiology')).toBeInTheDocument();
    expect(screen.getByText('Pediatrics')).toBeInTheDocument();
  });
});
