import type { FaqCategoryRecord } from '~/types/genericFaq'

const updatedAt = '2026-01-15T09:00:00.000Z'

export const mockFaqCategories: FaqCategoryRecord[] = [
  {
    id: 'faq-category-getting-started',
    status: 'published',
    version: 1,
    updatedAt,
    published: {
      title: 'Getting Started',
      slug: 'getting-started',
      image: '/images/icons/file-image.svg',
      seo: { title: 'Getting Started FAQs', description: 'Illustrative answers to common setup questions.' },
      questions: [
        { question: 'How do I create an account?', answer: 'Choose Sign up and follow the on-screen instructions. This is sample content for the admin preview.' },
        {
          question: 'Where can I get help getting started?',
          answer: {
            parts: [{ type: 'text', text: 'Visit the ' }, { type: 'link', text: 'help centre', href: 'https://example.com/help' }, { type: 'text', text: ' for sample guidance.' }],
            intro: 'Before you begin:',
            list: [
              'Use an email address you can access.',
              { title: 'Check your details', text: 'Make sure your contact information is current.' },
              { text: 'Keep your account safe', subList: ['Choose a unique password.', 'Never share your sign-in code.'] },
              { title: 'Email support', href: 'mailto:support@example.com', text: 'Contact the sample support team' },
            ],
            table: { headers: ['Status', 'Description'], rows: [{ status: 'Ready', description: 'You can start a sample request.' }] },
            outro: [{ type: 'text', text: 'Questions? ' }, { type: 'email', text: 'Email us', href: 'mailto:support@example.com' }],
          },
        },
      ],
    },
  },
  {
    id: 'faq-category-account',
    status: 'published',
    version: 1,
    updatedAt,
    published: {
      title: 'Account',
      slug: 'account',
      image: '/images/icons/file-image.svg',
      seo: { title: 'Account FAQs', description: 'Sample account and profile information.' },
      questions: [
        { question: 'How can I update my profile?', answer: { intro: 'You can review your profile in account settings.', list: ['Open your profile.', 'Update the relevant information.'], outro: 'Some changes may require verification.' } },
        { question: 'How do I contact support?', answer: { intro: [{ type: 'text', text: 'Email ' }, { type: 'email', text: 'support@example.com', href: 'mailto:support@example.com' }, { type: 'text', text: ' with your question.' }], outro: 'Do not include passwords or sign-in codes.' } },
      ],
    },
  },
  {
    id: 'faq-category-payments',
    status: 'published',
    version: 1,
    updatedAt,
    published: {
      title: 'Payments',
      slug: 'payments',
      image: '/images/icons/file-image.svg',
      seo: { title: 'Payments FAQs', description: 'Illustrative payment and status guidance.' },
      questions: [
        { question: 'How do I check a payment status?', answer: { intro: 'Open your transaction history to review the latest status.', table: { headers: ['Status', 'Description'], rows: [{ status: 'Pending', description: 'The payment is being reviewed.' }, { status: 'Complete', description: 'The transaction has finished processing.' }] }, outro: 'Status labels are examples only.' } },
        { question: 'Can I update payment details?', answer: { parts: [{ type: 'text', text: 'Contact support through ' }, { type: 'link', text: 'the help page', href: 'https://example.com/help' }, { type: 'text', text: ' to discuss an eligible change.' }] } },
      ],
    },
  },
  {
    id: 'faq-category-transfers',
    status: 'published',
    version: 1,
    updatedAt,
    published: { title: 'Transfers', slug: 'transfers', image: '/images/icons/file-image.svg', questions: [{ question: 'Can I track a transfer?', answer: 'Open your transaction history for a sample status view.' }] },
  },
  {
    id: 'faq-category-verification',
    status: 'published',
    version: 1,
    updatedAt,
    published: { title: 'Verification', slug: 'verification', image: '/images/icons/file-image.svg', questions: [{ question: 'Why might verification be needed?', answer: 'Verification can help protect accounts and satisfy applicable requirements. This is sample content.' }] },
  },
  {
    id: 'faq-category-security',
    status: 'published',
    version: 1,
    updatedAt,
    published: { title: 'Security', slug: 'security', image: '/images/icons/file-image.svg', questions: [{ question: 'How can I protect my account?', answer: { intro: 'Use good security habits:', list: ['Use a unique password.', 'Do not share one-time codes.'], outro: 'Contact support if you notice unexpected activity.' } }] },
  },
]
