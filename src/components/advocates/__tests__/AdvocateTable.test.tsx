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

  it('renders advocate data and handles phone click', async () => {
    const user = userEvent.setup();
    const onPhoneClick = jest.fn();
    render(<AdvocateTable advocates={advocates} onPhoneClick={onPhoneClick} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('NYC')).toBeInTheDocument();
    expect(screen.getByText('MD')).toBeInTheDocument();
    expect(screen.getByText('Cardiology')).toBeInTheDocument();
    expect(screen.getByText('5 years')).toBeInTheDocument();
    const phone = screen.getByText('(123) 456-7890');
    expect(phone).toBeInTheDocument();

    await user.click(phone);
    expect(onPhoneClick).toHaveBeenCalledWith('1234567890');
  });
});
