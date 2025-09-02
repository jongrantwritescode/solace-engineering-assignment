// Test the sanitizeInput function directly
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/[&]/g, '&amp;') // Encode ampersands
    .replace(/["]/g, '&quot;') // Encode quotes
    .replace(/[']/g, '&#x27;') // Encode single quotes
    .slice(0, 100); // Limit length to prevent abuse
};

describe('sanitizeInput', () => {
  it('removes HTML tags', () => {
    expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert(&quot;xss&quot;)/script');
    expect(sanitizeInput('<div>content</div>')).toBe('divcontent/div');
  });

  it('encodes special characters', () => {
    expect(sanitizeInput('John & Jane')).toBe('John &amp; Jane');
    expect(sanitizeInput('He said "Hello"')).toBe('He said &quot;Hello&quot;');
    expect(sanitizeInput("It's a test")).toBe('It&#x27;s a test');
  });

  it('trims whitespace', () => {
    expect(sanitizeInput('  John Doe  ')).toBe('John Doe');
  });

  it('limits length to 100 characters', () => {
    const longInput = 'a'.repeat(150);
    expect(sanitizeInput(longInput)).toHaveLength(100);
    expect(sanitizeInput(longInput)).toBe('a'.repeat(100));
  });

  it('handles empty input', () => {
    expect(sanitizeInput('')).toBe('');
    expect(sanitizeInput('   ')).toBe('');
  });

  it('handles normal text without special characters', () => {
    expect(sanitizeInput('John Doe')).toBe('John Doe');
    expect(sanitizeInput('Cardiology')).toBe('Cardiology');
  });
});
