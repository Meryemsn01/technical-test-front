import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import KpiCard from './KpiCard';

describe('KpiCard', () => {

  test('should render title and value correctly', () => {
    render(<KpiCard title="Titre de test" value={123} />);
    
    expect(screen.getByText('Titre de test')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  test('should render skeleton when isLoading is true', () => {
    render(<KpiCard title="Titre de test" value={123} isLoading={true} />);
    
    expect(screen.queryByText('123')).not.toBeInTheDocument();
    expect(screen.getByText('Titre de test')).toBeInTheDocument();
  });

});