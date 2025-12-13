import { render, screen } from '@testing-library/react';
import Magnetic from '@/components/ui/magnetic';

// Mock framer-motion to avoid animation complexity in unit tests
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    useMotionValue: () => ({ set: jest.fn() }),
    useSpring: () => ({ set: jest.fn() }),
}));

describe('Magnetic Component', () => {
    it('renders children correctly', () => {
        render(
            <Magnetic>
                <button>Click me</button>
            </Magnetic>
        );
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });
});
