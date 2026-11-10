import type { LegalDocumentRecord, PrivacyPolicyDocument } from '~/types/legalDocuments'

export const mockPrivacyPolicies: LegalDocumentRecord<PrivacyPolicyDocument>[] = [
  {
    id: 'document-privacy-nz',
    countryId: 'country-new-zealand',
    type: 'privacy',
    status: 'published',
    version: 1,
    updatedAt: '2026-10-15T09:00:00.000Z',
    published: {
      title: 'New Zealand',
      slug: 'new-zealand',
      code: 'nz',
      lastUpdated: '15 October 2026',
      sections: [
        {
          id: 1,
          title: 'Introduction',
          description: [
            'This illustrative demo explains how the service may handle personal information.',
            {
              parts: [
                { type: 'text', text: 'Read the ' },
                { type: 'link', text: 'service website', href: 'https://example.com' },
                { type: 'text', text: ' for more information.' },
              ],
            },
            {
              parts: [
                { type: 'text', text: 'Contact ' },
                { type: 'email', text: 'privacy@example.com', href: 'mailto:privacy@example.com' },
                { type: 'text', text: ' with privacy questions.' },
              ],
            },
          ],
          subsections: [
            {
              id: '1.1',
              title: 'Scope',
              description: [
                'This subsection contains sample plain-text information.',
                {
                  parts: [
                    { type: 'text', text: 'See our ' },
                    { type: 'link', text: 'privacy resource', href: 'https://example.com/privacy' },
                    { type: 'text', text: ' for a demonstration.' },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 2,
          title: 'Information',
          description: [
            'This sample section demonstrates additional paragraphs.',
            'It is illustrative content, not approved production legal wording.',
          ],
        },
      ],
    },
  },
  {
    id: 'document-privacy-au',
    countryId: 'country-australia',
    type: 'privacy',
    status: 'published',
    version: 1,
    updatedAt: '2026-10-10T09:00:00.000Z',
    published: {
      title: 'Australia',
      slug: 'australia',
      code: 'au',
      lastUpdated: '10 October 2026',
      sections: [
        {
          id: 1,
          title: 'About this policy',
          description: [
            'This illustrative demo policy is provided to show the editor structure.',
            {
              parts: [
                { type: 'text', text: 'Visit ' },
                { type: 'link', text: 'example.com', href: 'https://example.com' },
                { type: 'text', text: ' for sample information.' },
              ],
            },
          ],
          subsections: [
            {
              id: '1.1',
              title: 'Questions',
              description: [
                'Contact the demo privacy team with a question.',
                {
                  parts: [
                    { type: 'email', text: 'privacy@example.com', href: 'mailto:privacy@example.com' },
                  ],
                },
              ],
            },
            {
              id: '1.2',
              title: 'Coverage',
              description: ['The sample subsection includes more than one paragraph.'],
            },
          ],
        },
        {
          id: 2,
          title: 'Information we use',
          description: ['This is sample content for preview and editing only.'],
        },
      ],
    },
  },
  {
    id: 'document-privacy-uk',
    countryId: 'country-united-kingdom',
    type: 'privacy',
    status: 'published',
    version: 1,
    updatedAt: '2026-10-15T09:00:00.000Z',
    published: {
      title: 'UK',
      slug: 'united-kingdom',
      code: 'gb',
      lastUpdated: '15 October 2026',
      sections: [
        {
          id: 1,
          title: 'Introduction',
          description: [
            'Roze Int (Pvt) Ltd ("Roze Remit", "we", "us", or "our") is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.',
            'Roze Int (Pvt) Ltd is authorised and regulated by the Financial Conduct Authority (FCA), UK to provide payment services.',
            {
              parts: [
                { type: 'text', text: 'This policy applies to all users of our services, including individuals and businesses who use our website at ' },
                { type: 'link', text: 'https://rozeremit.com/', href: 'https://rozeremit.com/' },
                { type: 'text', text: ', our mobile applications, and all related services we provide.' },
              ],
            },
            'By using our services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with our policies and practices, please do not use our services. We may update this policy from time to time, and your continued use of our services after any changes indicates your acceptance of the updated terms.',
          ],
        },
        {
          id: 2,
          title: 'Information We Collect',
          description: ['We collect various types of information to provide, maintain, and improve our services, comply with legal obligations, and protect against fraud and financial crime.'],
          subsections: [
            {
              id: '2.1',
              title: 'Personal Information You Provide',
              description: [
                'When you use our services, we may collect information needed to verify your identity and provide our services. This may include your full name, date of birth, contact details, nationality, employment information, source of funds, banking details and location data.',
                'We may also collect information about your transactions, such as payment amounts, currencies, recipients, and the methods you use to fund transfers. To comply with due diligence and regulatory checks, we may request copies of identity and address documents, tax details, or conduct video or facial verification.',
                'When you interact with our customer support team, we collect and retain records of your communications including emails, chat transcripts, and feedback. We may record telephone calls for training and quality assurance purposes, and we will always notify you when a call is being recorded. We also keep records of any complaints you make and your responses to customer satisfaction surveys.',
              ],
            },
            {
              id: '2.2',
              title: 'Information We Collect Automatically',
              description: [
                'When you visit our website or use our mobile app, we may automatically collect certain technical details about your device and how you interact with our services. This may include your IP address, device identifiers, browser type, operating system, and mobile network details. With your permission, we may also collect approximate location data to help prevent fraud and offer relevant features.',
                'We may collect usage information such as the pages or features you use, how often you log in, how long sessions last, and general navigation patterns to help us improve performance and user experience.',
                'We also use cookies, web beacons, and similar technologies to remember your preferences, maintain secure sessions, and understand how our services are used. You can learn more about our use of cookies in Section 11 of this policy.',
              ],
            },
            {
              id: '2.3',
              title: 'Information from Third Parties',
              description: [
                'To provide our services and meet our legal obligations, we may receive information about you from various third-party sources. We work with identity verification service providers who help us confirm that you are who you say you are. We receive information from credit reference agencies and fraud prevention agencies which helps us assess risk and prevent financial crime. Our banking partners and payment networks provide us with information necessary to process your transactions. We also consult publicly available sources such as company registries, government sanctions lists, and databases of Politically Exposed Persons.',
                'When required by law or with your explicit consent, we may receive information from other financial institutions you have dealt with. In some cases, our marketing partners and affiliates may provide us with information about your interests and preferences to help us deliver more relevant communications.',
              ],
            },
            {
              id: '2.4',
              title: 'Information You Provide About Third Parties',
              description: [
                'When you share information about others, such as transfer recipients, we may collect and process that data to complete your requested transaction. By providing this information, you confirm that you have the authority or consent to share it and that the individuals concerned are aware of how their information may be used in line with this Privacy Notice.',
              ],
            },
          ],
        },
        {
          id: 3,
          title: 'How We Use Your Information',
          description: ['We use the personal information we collect for several purposes, all of which are essential to providing our services, meeting our legal obligations, and running our business effectively.'],
          subsections: [
            {
              id: '3.1',
              title: 'Service Provision and Account Management',
              description: ['We use your information primarily to provide and manage our services. This may include creating and maintaining your account, processing money transfer requests, and facilitating payments between you and third parties. We may use your contact details to communicate with you about transactions, send service updates, or notify you of changes to our terms. We may also use the information you provide to respond to your inquiries, deliver customer support, and manage our ongoing relationship with you.'],
            },
            {
              id: '3.2',
              title: 'Legal and Regulatory Compliance',
              description: ['As a regulated financial institution, we may collect and use personal information to meet our legal and regulatory obligations. This may include verifying identities, monitoring transactions, and preventing financial crimes such as money laundering and fraud. We may also maintain records of customer information and transactions for legally required periods and share relevant information with regulators or law enforcement authorities when required by law.'],
            },
            {
              id: '3.3',
              title: 'Fraud Prevention and Security',
              description: ['Protecting you and our other customers from fraud and financial crime is one of our highest priorities. We use your information and sophisticated analytical tools to detect, prevent, and investigate fraud, money laundering, and other illegal activities. By monitoring transaction patterns and comparing them against known fraud indicators, we can identify suspicious activity and take appropriate action. We analyze your transactions to verify their legitimacy and protect against unauthorized access to your account.'],
            },
            {
              id: '3.4',
              title: 'Business Operations and Continuous Improvement',
              description: ['We may use your information to enhance our services and develop new features. This may include analyzing usage patterns to identify valuable features and areas for improvement across our website and mobile applications. We may also use aggregated or anonymized data for market research, staff training, and service optimization. Additionally, we may share limited information with our banking, technology, and service partners as necessary to manage our business operations.'],
            },
            {
              id: '3.5',
              title: 'Marketing and Communications',
              description: ['We have a legitimate business interest in keeping our customers informed about our services, new features, and special offers that might benefit them. We may use your information to keep you informed about our services, new features, and offers that may benefit you. We may send promotional communications, newsletters, and industry updates to customers who have not opted out of such messages. We may also conduct customer satisfaction surveys and occasionally invite you to events or webinars relevant to our services.'],
            },
          ],
        },
        {
          id: 4,
          title: 'Legal Basis for Processing',
          description: ['Under data protection law, we must have a valid legal basis for processing your personal information. We rely on several different legal bases depending on the type of information and how we use it.'],
          subsections: [
            {
              id: '4.1',
              title: 'Contractual Necessity',
              description: ['Much of our processing is necessary to perform the contract we have with you when you sign up for our services. We may process your information as required to perform our contract with you. This includes providing money transfer and payment services, managing and securing your account, processing transactions, and delivering customer support. Such processing is essential to fulfilling our obligations and cannot be objected to while you continue using our services.'],
            },
            {
              id: '4.2',
              title: 'Legal Obligations',
              description: ['As a regulated Financial Institution, we may process certain information to meet our legal and regulatory obligations. This may include verifying identities, conducting Know Your Customer and anti-money laundering checks, screening against sanctions lists, reporting suspicious activities to relevant authorities, and maintaining records for legally prescribed periods. These obligations apply independently of our contract with you and are mandatory for us to operate as a regulated institution.'],
            },
            {
              id: '4.3',
              title: 'Legitimate Interests',
              description: ['We may process certain information based on our legitimate business interests, where we have a fair and reasonable purpose that does not override your rights. This includes sending marketing communications to customers about new features, offers, or service updates, with clear options to opt out at any time. We also rely on legitimate interests to strengthen security, prevent fraud, improve our services, perform analytics, and manage relationships with our partners.'],
            },
            {
              id: '4.4',
              title: 'Consent',
              description: ['We may seek your explicit consent in specific situations, such as tracking your location to enable certain features, sending marketing communications where required by law, or using non-essential cookies and tracking technologies. We may also request consent before sharing your information with third parties for their marketing purposes. You can withdraw your consent at any time through your account settings, by contacting customer support, or by following the instructions provided. Withdrawal will not affect any processing completed before consent was withdrawn.'],
            },
          ],
        },
        {
          id: 5,
          title: 'How We Share Your Information',
          description: ['We are careful about who we share your information with, we only share what is necessary, and we put appropriate safeguards in place to protect your information when it is shared.'],
          subsections: [
            {
              id: '5.1',
              title: 'Corporate Affiliates',
              description: ['We may share personal data with our corporate affiliates, including our parent company, affiliates and subsidiaries. Such corporate affiliates process personal data on our behalf to provide services or in other circumstances with your consent or as permitted or required by law.'],
            },
            {
              id: '5.2',
              title: 'Service Providers and Business Partners',
              description: [
                'We may share your information with trusted service providers who help us deliver our services efficiently and securely. These include payment processors, banking partners, identity verification providers, cloud hosting and IT support services, customer relationship management platforms, and marketing or analytics providers. Some customer interactions may also be managed through customer support platforms.',
                'All service providers are carefully selected and bound by contractual obligations to protect your data and use it only for authorized purposes. They are not permitted to use or share your information independently.',
              ],
            },
            {
              id: '5.3',
              title: 'Financial Institutions',
              description: ['We may share certain information with banks, payment networks, and other financial institutions to process transactions and provide you services. When you send money, details such as the beneficiary\'s name, account number, and in some cases address or sender information, may be shared with the beneficiary\'s bank in line with international payment regulations. We also work with and share data with sending banks, correspondent partners, and card networks such as Visa and Mastercard to receive and process payments securely.'],
            },
            {
              id: '5.4',
              title: 'Regulatory and Legal Authorities',
              description: ['We may share information with regulatory, tax, and law enforcement authorities to meet our legal and compliance obligations. This may include responding to supervisory requests, reporting suspicious activities, fulfilling tax reporting requirements, or complying with lawful requests related to criminal investigations, court proceedings, or customer disputes. All such disclosures are carefully managed and made only when required by law or in response to legitimate requests from authorized authorities.'],
            },
            {
              id: '5.5',
              title: 'Fraud Prevention Agencies',
              description: ['We may share information with credit reference agencies, fraud prevention databases, and anti–money laundering networks to detect and prevent fraud or other financial crimes. These agencies may record that a check has been carried out, and this information may be used by other financial institutions when assessing service eligibility. We also use sanctions screening providers to check customer information against updated lists of restricted individuals and entities as part of our ongoing compliance measures.'],
            },
            {
              id: '5.6',
              title: 'Business Transactions',
              description: ['In the event that Roze Remit is involved in a merger, acquisition, reorganization, or sale of assets, your information may be transferred to the successor entity as part of the business transfer. In such circumstances, we will notify you via email and through a prominent notice on our website before your information is transferred and becomes subject to a different privacy policy. You will be informed about any choices you may have regarding your information in connection with such a transfer.'],
            },
            {
              id: '5.7',
              title: 'Other instances',
              description: ['In some cases, we may share your information with third parties outside the categories listed above. This may include partners involved in referral programs, co-branded services, or third-party integrations you choose to connect with. In such cases, we will always seek your explicit consent beforehand and clearly explain what information will be shared, with whom, and for what purpose.'],
            },
          ],
        },
        {
          id: 6,
          title: 'International Data Transfers',
          description: [
            'As Roze Remit UK provides international money transfer services, we may need to transfer your personal information to recipients located outside the United Kingdom in order to provide our services, comply with legal obligations, and support our business operations.',
            'Personal information that we collect may be transferred to, stored in, and processed in countries where Roze Remit UK, its group companies, service providers, banking partners, payment processors, recipient partners, contractors, or other third-party service providers operate. These countries may include member states of the European Economic Area (EEA) and other countries in which our service providers or recipient partners maintain facilities.',
            'Your personal information may also be processed by personnel located outside the United Kingdom who work for us or for our service providers. Such personnel may be involved in, among other things, processing payment transactions, conducting identity verification and compliance checks, providing customer support, maintaining technology systems, and preventing fraud and financial crime.',
            'By using our services and providing your personal information, you acknowledge that your personal information may be transferred, stored, and processed outside the United Kingdom for the purposes described in this Privacy Policy.',
            'Where we transfer personal information to overseas recipients, we will take reasonable steps to ensure that such information is protected in accordance with applicable privacy and data protection laws. Where required, we will implement appropriate safeguards, including contractual arrangements, data protection obligations, security measures, and other lawful transfer mechanisms designed to ensure that your personal information receives an adequate level of protection.',
            'We will only disclose personal information to overseas recipients where such disclosure is necessary for the provision of our services, compliance with legal and regulatory requirements, fraud prevention, risk management, or other legitimate business purposes.',
          ],
        },
        {
          id: 7,
          title: 'Data Retention',
          description: ['We keep your personal information only as long as necessary to meet the purposes it was collected for and to comply with legal and regulatory requirements. For active customers, we retain account and transaction data for the duration of the relationship. After an account is closed, we must retain identity and transaction records for at least five years in line with anti-money-laundering laws.'],
        },
        {
          id: 8,
          title: 'Your Rights and Choices',
          description: ['Data protection law provides you with a range of rights regarding your personal information. These rights are designed to give you control over your information and ensure we use it appropriately. We are committed to facilitating the exercise of your rights and will respond to requests promptly and thoroughly.'],
          subsections: [
            {
              id: '8.1',
              title: 'Right of Access',
              description: ['You have the right to request access to the personal information we hold about you, known as a "subject access request." Upon request, we will provide a copy of your data in a commonly used format, along with details about how it is processed, who it is shared with, how long it is retained, and your related rights. This ensures transparency and allows you to confirm that your information is being handled lawfully.'],
            },
            {
              id: '8.2',
              title: 'Right to Rectification',
              description: ['You have the right to request correction of any inaccurate or incomplete personal information. Some details can be updated directly through your account settings, while others such as name or identification changes may require verification and supporting documents. Keeping your information accurate, especially contact and identification details, is essential for processing transactions and meeting our regulatory obligations.'],
            },
            {
              id: '8.3',
              title: 'Right to Erasure',
              description: [
                'You have the right to request deletion of your personal information in certain circumstances, also known as the "right to be forgotten." This applies when the data is no longer needed for its original purpose, when you withdraw consent and no other legal basis applies, when you successfully object to processing, or when the data has been unlawfully processed.',
                'We may, however, retain information where required by law such as for anti–money laundering recordkeeping or where necessary to establish, exercise, or defend legal claims, or for other legitimate reasons.',
              ],
            },
            {
              id: '8.4',
              title: 'Right to Restrict Processing',
              description: [
                'You may request that we limit how your personal information is used without asking for it to be deleted. This right applies when you dispute the accuracy of your data, when processing is unlawful but you prefer that we retain it, when you need the data for legal claims, or when you have objected to processing and we are assessing that objection.',
                'While processing is restricted, we will store your information but will not use it unless you consent, it is needed for legal purposes, to protect others\' rights, or for important public interest reasons.',
              ],
            },
            {
              id: '8.5',
              title: 'Right to Data Portability',
              description: ['You have the right to obtain your personal information in a structured and commonly used format and, where technically feasible, request that it be transferred to another service provider. This right applies when your data is processed based on consent or a contract, and the processing is carried out through automated means. It is intended to give you greater control over your information and flexibility to move it between different services.'],
            },
            {
              id: '8.6',
              title: 'Right to Object',
              description: ['You have the right to object to the processing of your personal information in certain circumstances. If we process your data based on our legitimate interests, you may object at any time, and we will stop processing unless we can demonstrate overriding legal or legitimate grounds. You also have an absolute right to object to the use of your data for direct marketing, including any related profiling, in which case we will stop sending such communications immediately. You may also object to processing for research or statistical purposes unless it is required for reasons of public interest.'],
            },
            {
              id: '8.7',
              title: 'Rights Related to Automated Decision-Making',
              description: ['You have the right not to be subject to decisions made solely through automated processing, including profiling, where such decisions have legal or significant effects on you. We may use automated systems for activities like identity verification, fraud detection, and assessing transaction risk. If an automated decision affects you, you can request a human review, share your perspective, and challenge the outcome. We will ensure that your case is reviewed fairly before a final decision is made.'],
            },
            {
              id: '8.8',
              title: 'Right to Withdraw Consent',
              description: ['If we process your information based on your consent, you can withdraw that consent at any time. Doing so will not affect any processing that took place before withdrawal, but we will stop processing your data going forward. You can withdraw consent through your account settings, by contacting customer support, or by using the tools we provide, such as unsubscribe links or opt-out options.'],
            },
            {
              id: '8.9',
              title: 'How to Exercise Your Rights',
              description: [
                {
                  parts: [
                    { type: 'text', text: 'You can exercise your data protection rights by contacting us at ' },
                    { type: 'email', text: 'privacy@rozeremit.com', href: 'mailto:privacy@rozeremit.com' },
                    { type: 'text', text: ' or using the privacy settings in your account. We may need to verify your identity before processing your request to ensure your data is protected. We aim to respond within one month, though in complex cases this may take up to two additional months. If an extension is needed, we will notify you and explain why. Requests are free of charge unless they are clearly unfounded, excessive, or repetitive, in which case we may charge a reasonable fee or decline to act.' },
                  ],
                },
              ],
            },
            {
              id: '8.10',
              title: 'Right to Complain',
              description: ['If you have concerns about how we handle your personal information or respond to requests to exercise your rights, please contact us first so we have the opportunity to address your concerns. If you remain unsatisfied, you have the right to lodge a complaint with the Information Commissioner\'s Office (ICO). Further information about the ICO and how to lodge a complaint is available at www.ico.org.uk.'],
            },
          ],
        },
        {
          id: 9,
          title: 'Security Measures',
          description: ['We apply strong technical and organizational safeguards to protect your personal information against unauthorized access, loss, or misuse. All data transmitted between you and our systems is encrypted and sensitive data is also encrypted at rest. Our infrastructure includes firewalls, intrusion detection, continuous monitoring, and regular vulnerability and penetration testing to ensure system resilience. Access to data is restricted through role-based controls, strong authentication, and password security. Beyond technology, we enforce strict internal policies, conduct employee background checks, and provide ongoing security and data protection training. All staff are bound by confidentiality obligations, and we maintain formal incident response procedures to quickly identify and contain potential breaches.'],
          subsections: [
            {
              id: '9.1',
              title: 'Data Breach Notification',
              description: ['While we maintain strong security measures, no system is entirely immune to risk. If a personal data breach occurs that may affect your rights and freedoms, we will promptly assess the impact and notify the relevant supervisory authority within 72 hours, as required by law. Where the breach presents a high risk to you, we will also inform you without undue delay, explaining the nature of the incident, its possible consequences, and the steps taken to contain and mitigate it. All breaches and our responses are documented to support transparency and continual improvement of our security practices.'],
            },
            {
              id: '9.2',
              title: 'Your Responsibility for Security',
              description: ['While we implement strong safeguards, you also play an important role in protecting your information. Keep your login details secure and never share your password, even with anyone claiming to represent Roze Remit. Use a strong, unique password and enable multi-factor authentication for added protection. Ensure your contact details are up to date so we can alert you to any suspicious activity. Always log out when using shared or public devices and promptly report any unusual account activity or suspected fraudulent communications to support@rozeremit.com.'],
            },
          ],
        },
        {
          id: 10,
          title: "Children's Privacy",
          description: ['Our services are not intended for individuals under eighteen, and we do not knowingly collect personal information from minors. To register or use Roze Remit, you must be at least eighteen years old and legally capable of entering into a binding agreement. If we learn that we have collected information from a minor without verified parental consent, we will promptly delete it. Parents or guardians who believe their child has provided personal data should contact us at privacy@rozeremit.com for immediate assistance.'],
        },
        {
          id: 11,
          title: 'Cookies and Tracking Technologies',
          description: ['We use cookies and similar tracking technologies on our website and in our mobile applications to enhance your user experience, analyze how our services are used, and deliver relevant advertising. Understanding how these technologies work and how you can control them is an important part of your privacy.'],
          subsections: [
            {
              id: '11.1',
              title: 'What Are Cookies and How Do We Use Them',
              description: [
                'Cookies are small files stored on your device that help us recognize you, remember your preferences, and improve your browsing experience. We use several types of cookies to make our website work smoothly and securely.',
                'Essential cookies are required for our website and services to function properly, for example, to keep you logged in, process payments, and maintain security. These cannot be disabled, although you can block them through your browser (which may limit functionality).',
                'Analytics cookies help us understand how visitors use our site, such as which pages are most popular or if any errors occur. The data collected is aggregated and anonymous, allowing us to improve performance and user experience.',
                'Functional cookies remember your preferences, like language or region and enable a more personalized experience.',
                'Marketing cookies track browsing activity to show you relevant advertisements and measure the effectiveness of campaigns. These may be set by us or by trusted advertising partners.',
              ],
            },
            {
              id: '11.2',
              title: 'Third-Party Cookies and Tracking',
              description: ['We may allow third parties to place cookies on our website for specific purposes. Analytics providers help us understand site usage and identify areas for improvement. Advertising partners use cookies to deliver targeted ads, while social media features may set cookies when you interact with them. Customer support tools, such as live chat, may use cookies to maintain session continuity. We carefully select third-party partners and require them to handle your information responsibly, but we do not control their use of cookies. We recommend reviewing their privacy and cookie policies to understand their practices.'],
            },
            {
              id: '11.3',
              title: 'Managing Your Cookie Preferences',
              description: [
                'You can control and manage cookies in several ways. On your first visit, our cookie consent banner lets you accept or reject different categories of cookies. You can update your preferences at any time through the cookie management tool in the website footer or your account settings. Most browsers accept cookies by default, but you can adjust your browser settings to decline them. Note that blocking or deleting cookies may affect website functionality and personalization.',
                {
                  parts: [
                    { type: 'text', text: 'If you use multiple devices or browsers, preferences must be set separately for each. Mobile devices may also offer options to limit ad tracking. To opt out of interest-based advertising across multiple networks, you can visit sites such as ' },
                    { type: 'link', text: 'www.youronlinechoices.eu', href: 'https://www.youronlinechoices.eu' },
                    { type: 'text', text: ' or ' },
                    { type: 'link', text: 'www.aboutads.info', href: 'https://www.aboutads.info' },
                    { type: 'text', text: '.' },
                  ],
                },
              ],
            },
            {
              id: '11.4',
              title: 'Do Not Track Signals',
              description: ['Some browsers offer a "Do Not Track" feature to signal that you prefer not to have your online activities tracked. Currently, there is no consistent industry standard for responding to these signals, and browser implementations vary. As a result, we do not respond to Do Not Track signals at this time but will monitor developments and update our practices if standards evolve.'],
            },
          ],
        },
        {
          id: 12,
          title: 'Third-Party Links and Services',
          description: [
            'Our website and apps may include links to third-party sites or services for convenience or additional resources. We do not control their content, privacy practices, or security. When you use these links or services, you are subject to the third party\'s privacy policy and terms of service.',
            'Third parties may collect information about you, use cookies or tracking technologies, and have their own rules for handling data. Before sharing personal information or using their services, we encourage you to review their policies.',
          ],
        },
        {
          id: 13,
          title: 'Marketing Communications',
          description: ['We believe that keeping our customers informed about our services, new features, and special offers is valuable and enhances your experience with Roze Remit. However, we also respect your right to control the communications you receive from us.'],
          subsections: [
            {
              id: '13.1',
              title: 'Our Approach to Marketing',
              description: ['We rely on legitimate interest to send marketing communications to our existing customers, as we believe it is reasonable for users to expect updates about our services. These communications may include service updates, new features, special offers, educational content, customer surveys, and occasional event invitations. Our aim is to ensure that such messages are relevant, useful, and not excessive.'],
            },
            {
              id: '13.2',
              title: 'Personalization and Targeting',
              description: ['To make our marketing communications more relevant and valuable to you, we may personalize them based on your transaction history, the countries you send money to, the frequency of your transfers, your communication preferences, and other information about how you use our services. For example, if you frequently send money to a particular country, we might send you information about improved exchange rates or faster transfer options to that destination. This personalization helps ensure that you receive information that is actually useful rather than generic messages that may not be relevant to your needs.'],
            },
            {
              id: '13.3',
              title: 'Your Right to Opt Out',
              description: [
                {
                  parts: [
                    { type: 'text', text: 'You have the right to opt out of marketing communications at any time. Every marketing email includes an unsubscribe link for immediate removal, and you can also update your preferences through your account settings or by contacting us at ' },
                    { type: 'email', text: 'privacy@rozeremit.com', href: 'mailto:privacy@rozeremit.com' },
                    { type: 'text', text: '. Once we receive your request, we process it promptly, though you may still receive messages already scheduled. Please note that even if you opt out of marketing, we will continue to send essential service-related communications such as transaction confirmations, account notifications, and regulatory updates.' },
                  ],
                },
              ],
            },
            {
              id: '13.4',
              title: 'Opting Back In',
              description: ['If you previously opted out of marketing communications but later decide you would like to receive them again, you can easily opt back in through your account settings or by contacting customer support. We will then resume sending marketing communications in accordance with your updated preferences.'],
            },
          ],
        },
        {
          id: 14,
          title: 'Automated Decision-Making and Profiling',
          description: [
            'We may use automated systems to support our services and meet legal obligations, particularly for fraud prevention, identity verification, and risk assessment. These systems analyze factors such as transaction details, customer behavior, and identification documents to make real-time decisions, for example, automatically approving, declining, or flagging a transaction for manual review.',
            'When using our services, automated identity checks verify the authenticity of your documents and match your photo to ensure accuracy.',
            'We use profiling techniques to detect fraud and enhance our services. Our systems identify normal customer patterns to spot suspicious activity and help us tailor services, such as suggesting preferred transfer routes or providing relevant exchange rate alerts.',
            {
              parts: [
                { type: 'text', text: 'You have rights regarding automated decisions that significantly affect you. You may request human review, provide additional information, or contest a decision. While we may not disclose full technical details of our fraud prevention algorithms, we will explain the outcome and reasoning behind the decision. If you believe an automated decision was incorrect or unfair, please contact us at ' },
                { type: 'email', text: 'privacy@rozeremit.com', href: 'mailto:privacy@rozeremit.com' },
                { type: 'text', text: ', and we will promptly arrange for manual review.' },
              ],
            },
          ],
        },
        {
          id: 15,
          title: 'Changes to This Privacy Policy',
          description: ['We may update this Privacy Policy from time to time to reflect changes in our practices, services, legal requirements, or for other operational, legal, or regulatory reasons. When our information practices change significantly, we will update this policy to reflect those changes and inform you through appropriate channels.'],
          subsections: [
            {
              id: '15.1',
              title: 'How We Notify You of Changes',
              description: ['When we make changes to this Privacy Policy, we will update the "Last Updated" date at the top of this document. For minor changes that do not materially affect your rights or how we process your information, we may simply update the policy and post the new version on our website. For significant changes affecting your rights or how we use your information, we will give clear notice, such as by email, on our website, or within the app. In some cases, you may be asked to review and accept the updated policy before continuing to use our services.'],
            },
            {
              id: '15.2',
              title: 'Your Options When the Policy Changes',
              description: ['Your continued use of our services after we post changes to this Privacy Policy, or after we notify you of changes, constitutes your acceptance of the updated terms. If you do not agree with the changes we have made, you should discontinue use of our services. You can contact our customer support team to close your account if you do not wish to accept the updated policy. However, please note that even if you close your account, we will retain your information for the periods described in this policy to comply with our legal and regulatory obligations.'],
            },
          ],
        },
        {
          id: 16,
          title: 'Contact Information and Questions',
          description: [
            'We are committed to protecting your privacy and handling your personal information responsibly. If you have questions, concerns, or requests regarding this Privacy Policy or our data protection practices, we want to hear from you.',
            'You can contact our Data Protection Officer and privacy team through several channels. For written inquiries, you can write to us at Data Protection Officer, 14 High Street, Barkingside, Ilford, IG6 2DF, United Kingdom. For email inquiries, you can contact us at privacy@rozeremit.com for privacy-specific questions.',
          ],
        },
      ],
    },
  },
]
