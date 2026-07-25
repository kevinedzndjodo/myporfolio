export interface FaqItem {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: 'What technologies do you work with?',
    answer: 'React, TypeScript, and Tailwind for the frontend, with Node.js and PostgreSQL when a backend is needed.',
  },
  {
    question: 'Are you available for freelance projects?',
    answer: 'Yes — I\'m currently open to new freelance frontend work. Reach out via the contact section above.',
  },
  {
    question: 'Do you work with clients outside Cameroon?',
    answer: 'Yes, I work remotely with clients anywhere, communicating via email or your preferred tool.',
  },
  {
    question: 'Can i see more of your work?',
    answer: 'You can explore my recently selected projects in the section above. I do not typically write lengthy case-studies here and prefer to show the work live, in-situ, for you to make your own judgements.\n Projects that have undergone significant change since I last worked on them and most projects in general are not shown. This is so you can be confident that every project displayed here is something I have built myself. \n This portfolio is only a fraction of all work I have ever done. Most projects are either unable to be shown due to NDA or not visual enough for me to want to display here (think bug-fixing, feature addition or internal projects).',
  }

]