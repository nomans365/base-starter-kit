import type { CorridorFaqCollection } from '~/types/corridorFaq'

const updatedAt = '2026-01-15T09:00:00.000Z'

export const mockCorridorFaqs: CorridorFaqCollection[] = [
  {
    countryId: 'country-ghana',
    version: 1,
    updatedAt,
    published: [
      {
        id: 1,
        question: 'How long does a transfer to Ghana take?',
        content: [
          { type: 'paragraph', text: 'Delivery times depend on the payout method and partner processing hours. This is illustrative FAQ content.' },
          {
            type: 'paragraph',
            parts: [
              { type: 'text', text: 'Check the estimated arrival time before confirming your transfer to ' },
              { type: 'link', text: 'Ghana', href: 'https://example.com/ghana' },
              { type: 'text', text: '.' },
            ],
          },
        ],
      },
      {
        id: 2,
        question: 'What details may I need for a Ghana transfer?',
        content: [
          { type: 'paragraph', text: 'Requirements depend on the selected payout method. Review the transfer form for current details.' },
          {
            type: 'list',
            items: [
              { text: 'The recipient’s full name as shown on their account.' },
              { parts: [{ type: 'text', text: 'For a bank payout, enter the account details requested in the form. See ' }, { type: 'link', text: 'our sample guide', href: 'https://example.com/guide' }] },
            ],
          },
        ],
      },
      {
        id: 3,
        question: 'Which payout methods are available?',
        content: [
          { type: 'paragraph', text: 'Availability can vary by destination and change over time.' },
          { type: 'table', headers: ['Payout method', 'Typical information'], rows: [['Bank deposit', 'Bank and account details'], ['Mobile wallet', 'Mobile number and wallet provider']] },
        ],
      },
    ],
  },
  {
    countryId: 'country-india',
    version: 1,
    updatedAt,
    published: [
      {
        id: 1,
        question: 'What information should I have before sending to India?',
        content: [
          { type: 'paragraph', text: 'Have the recipient’s details available before starting. The exact information depends on the payout method you choose.' },
          { type: 'list', items: [{ text: 'Recipient’s name and contact details.' }, { text: 'Bank or payout information requested during checkout.' }] },
        ],
      },
      {
        id: 2,
        question: 'Can I track a transfer to India?',
        content: [
          { type: 'paragraph', parts: [{ type: 'text', text: 'Use your account to review the latest status. For help, visit ' }, { type: 'link', text: 'the support page', href: 'https://example.com/support' }, { type: 'text', text: '.' }] },
        ],
      },
    ],
  },
  {
    countryId: 'country-nigeria',
    version: 1,
    updatedAt,
    published: [
      {
        id: 1,
        question: 'How can a recipient collect a transfer in Nigeria?',
        content: [
          { type: 'paragraph', text: 'The collection method is selected when the sender creates the transfer and depends on availability.' },
          { type: 'list', items: [{ text: 'Check the payout option shown in the transfer summary.' }, { parts: [{ type: 'text', text: 'Bring any required identification and the transfer reference. Read ' }, { type: 'link', text: 'the sample collection guide', href: 'https://example.com/collect' }] }] },
        ],
      },
      {
        id: 2,
        question: 'What should I do if recipient details are incorrect?',
        content: [
          { type: 'paragraph', text: 'Contact support promptly. Whether details can be changed depends on the transfer status and payout partner.' },
          { type: 'table', headers: ['Status', 'Suggested next step'], rows: [['Not processed', 'Ask support about updating details'], ['Completed', 'Contact support for guidance']] },
        ],
      },
    ],
  },
]
