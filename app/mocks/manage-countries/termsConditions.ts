import type { LegalDocumentRecord, TermsConditionsDocument } from '~/types/legalDocuments'

export const mockTermsConditions: LegalDocumentRecord<TermsConditionsDocument>[] = [
  {
    id: 'document-terms-europe',
    countryId: 'country-europe',
    type: 'terms',
    status: 'published',
    version: 1,
    updatedAt: '2026-10-27T09:00:00.000Z',
    published: {
      title: 'Europe',
      slug: 'europe',
      code: 'eu',
      lastUpdated: '27 October 2026',
      sections: [
        {
          id: 0,
          title: 'TERMS AND CONDITIONS',
          SubTitle: 'Demo regulatory information',
          description: 'This illustrative scalar description is not approved production legal wording.',
        },
        {
          id: 1,
          title: 'Definitions',
          description: [
            'This sample section demonstrates an array description.',
            {
              parts: [
                { type: 'text', text: 'See the ' },
                { type: 'link', text: 'sample page', href: 'https://example.com/terms' },
                { type: 'text', text: '.' },
              ],
            },
          ],
          list: [
            { term: 'Agreement', meaning: 'A sample definition for editor demonstration.' },
            { meaning: 'This entry shows a meaning without a term.' },
          ],
        },
        {
          id: 2,
          title: 'Using the service',
          subsections: [
            {
              id: '1.1',
              title: 'Eligibility',
              description: [
                'This titled subsection has a description and a definition list.',
                {
                  parts: [
                    { type: 'text', text: 'For a demo enquiry, email ' },
                    { type: 'email', text: 'support@example.com', href: 'mailto:support@example.com' },
                    { type: 'text', text: '.' },
                  ],
                },
              ],
              list: [
                {
                  term: '1.1.1',
                  meaning: 'A sample subsection definition.',
                  children: [{ term: '1.1.1.1', meaning: 'One supported nested child.' }],
                },
              ],
            },
            {
              id: '1.2',
              description: ['An untitled subsection includes a sample paragraph.'],
            },
            {
              id: '1.3',
              title: 'Description and list',
              description: ['Subsection descriptions and lists render in sequence.'],
              list: [{ term: '1.3.1', meaning: 'Another sample definition.' }],
            },
          ],
        },
      ],
    },
  },
  {
    id: 'document-terms-au',
    countryId: 'country-australia',
    type: 'terms',
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
          id: 0,
          title: 'TERMS AND CONDITIONS',
          SubTitle: 'Illustrative document',
          description: [
            'This demo content illustrates a section with paragraphs.',
            'Replace it with approved wording before production use.',
          ],
        },
        {
          id: 1,
          title: 'Contact',
          list: [
            { term: 'Website', meaning: 'https://example.com' },
            { meaning: 'The service help area is represented by this sample entry.' },
          ],
          subsections: [
            {
              id: '1.1',
              title: 'Support',
              description: ['This subsection is sample-only content.'],
              list: [
                { term: 'Contact', meaning: 'support@example.com', children: [] },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: 'document-terms-uk',
    countryId: 'country-united-kingdom',
    type: 'terms',
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
          id: 0,
          title: 'Terms and Conditions',
          description: [{
            parts: [
              { type: 'text', text: 'This document, along with any materials referenced within it (collectively referred to as the "Terms & Conditions"), sets out the terms under which Roze Int (Pvt) Ltd, (Trading as Roze Remit) whose registered address is available at ' },
              { type: 'link', text: 'https://rozeremit.com', href: 'https://rozeremit.com' },
              { type: 'text', text: ', provides its Services (as defined below).' },
            ],
          }],
        },
        {
          id: 1,
          title: 'Interpretation and Definitions',
          description: ['In these Terms & Conditions:'],
          list: [
            { term: 'Roze Remit, We, Us, Our', meaning: 'means Roze Int (Pvt) Ltd.' },
            { term: 'Roze Remit Channel or Channel', meaning: 'means the Roze Remit Website and/or the mobile application or "App" through which We provide the money transfer services.' },
            { term: 'Roze Remit Service or Services', meaning: 'means money transfer services which We provide through the Channel.' },
            { term: 'Roze Remit Website or Website', meaning: 'means the website which We operate in order to provide money transfer services.' },
            { term: 'Roze Remit mobile application or mobile application', meaning: 'means the mobile application through which We provide money transfer services.' },
            { term: 'Applicable Law', meaning: 'means all statutory instruments, regulations, orders, and other legislative provisions which in any way relate to these Terms & Conditions or the provision of the Services.' },
            { term: 'Fee', meaning: 'refers to the Fee and charges published or displayed on the Channel.' },
            { term: 'Payment Method', meaning: 'means the options available to the Sender to fund a money transfer through the Roze Remit Service, which may vary between jurisdictions and may include bank card, bank account, and other payment methods.' },
            { term: 'Receiver', meaning: 'means the person named as the beneficiary of the money transfer.' },
            { term: 'Sender', meaning: 'refers to the person who initiated a money transfer through the Roze Remit Service.' },
            { term: 'Transaction', meaning: 'means every money transfer that You initiate through the Roze Remit Service.' },
            { term: 'You, Your or Yours', meaning: 'means every and any person using the Roze Remit Channel as a Sender.' },
          ],
        },
        {
          id: 2,
          title: 'About Us and Our Services',
          subsections: [
            {
              id: '1.1',
              description: [{
                parts: [
                  { type: 'text', text: 'The Roze Remit Service is operated by Roze Int (Pvt) Ltd, a company registered in the United Kingdom. Roze Int (Pvt) Ltd is authorised and regulated by the Financial Conduct Authority (FCA) to provide payment services. The FCA is the official regulatory body in the United Kingdom responsible for supervising financial conduct. More information about the FCA can be found on its website at ' },
                  { type: 'link', text: 'https://www.fca.org.uk/', href: 'https://www.fca.org.uk/' },
                  { type: 'text', text: '.' },
                ],
              }],
            },
            {
              id: '1.2',
              description: [{
                parts: [
                  { type: 'text', text: 'You may access Our Services through Our Website ' },
                  { type: 'link', text: 'https://rozeremit.com', href: 'https://rozeremit.com' },
                  { type: 'text', text: " or via Our mobile application, available on the Google Play Store and iOS App Store, under the name 'Roze Remit'." },
                ],
              }],
            },
            {
              id: '1.3',
              description: ['To use Our Services, You must first create a Profile through Our Channel. In doing so, We will collect and store certain information about You. This information is used to determine Your eligibility to access Our Services, including monitoring for fraud and other risks. To create a Profile and qualify to use Our Services, You must meet the following criteria:'],
              list: [
                { term: '1.3.1', meaning: 'You must agree to these Terms & Conditions, Our Privacy Policy, and any other documents referenced in these Terms & Conditions.' },
                { term: '1.3.2', meaning: 'You must be at least eighteen (18) years of age.' },
                { term: '1.3.3', meaning: 'You must be a resident of the Jurisdictions mentioned in 4.1.7.' },
                { term: '1.3.4', meaning: 'You must provide complete, accurate, and truthful information about Yourself and Your intended use of Our Services. This may include any documents or details We reasonably require to verify Your identity, residency, or eligibility to access Our Services.' },
              ],
            },
            { id: '1.4', description: ['By providing the required information to initiate a money transfer and accepting these Terms & Conditions, You, as the Sender, instruct Us to carry out a specific Transaction. Each individual money transfer constitutes a separate agreement between You and Us, solely for the execution of that particular transfer. At no point does a framework agreement exist obligating Us to process any future or additional money transfers. It is the responsibility of the Sender to inform the Receiver regarding the details of the transfer.'] },
            { id: '1.5', description: ['The Service must not be used to breach or circumvent the law, or to violate fair trading rules, including making payments using instruments that do not belong to You. You agree to use the Service and Channel strictly in accordance with the law and solely for the purpose of completing legitimate Transactions.'] },
            { id: '1.6', description: ["We may update or amend these Terms & Conditions at any time for any reasonable purpose, including complying with legal obligations. Any updates will be published on Our Website, showing the revised Terms & Conditions with an updated revision date. In certain cases, the current version of the Terms & Conditions may be made available to You when You instruct Us to execute a Transaction. If any amendment constitutes a 'material change' (see section 1.8), We will provide at least 60 days' prior notice. During this period, a copy of the previous Terms & Conditions will remain available on Our Website, and a notice highlighting the update will be displayed. Where applicable, You will also receive separate written notice of changes if required. Until You receive such notice, You may rely on the previous version of the Terms & Conditions."] },
            { id: '1.7', description: ['After the notice period has expired, the modified Terms & Conditions will immediately apply to any new agreements between You and Us. Continuing to use or access the Service or Channel after this date indicates Your acceptance of the updated Terms & Conditions. If You do not agree with the revised Terms before initiating a Transaction or using the Services, You are free to discontinue use.'] },
            {
              id: '1.8',
              description: ["For clarity, a 'material change' under clause 1.6 does not include changes that:"],
              list: [
                { term: '1.8.1', meaning: 'provides a benefit to You.' },
                { term: '1.8.2', meaning: 'introduce a new product or service or clarify an existing term; or' },
                { term: '1.8.3', meaning: 'are required to comply with applicable laws, regulations, or regulatory authority requirements.' },
              ],
            },
          ],
        },
        {
          id: 3,
          title: 'Accessing and Utilizing Our Services',
          subsections: [
            { id: '2.1', description: ['Our Services must not be used for any unlawful purpose. This includes, without limitation, activities related to money laundering, fraud, terrorist financing or proliferation, sexually explicit content or services, gambling, trading in tobacco or tobacco-related products, firearms, prescription drugs, or other controlled substances.'] },
            {
              id: '2.2',
              description: ['When using Our Services, You must comply with the following requirements:'],
              list: [
                { term: '2.2.1', meaning: 'You may create a single Profile for personal, non-commercial use. We may limit the number of email addresses, phone numbers, and Payment Methods that can be linked to a Profile. Creating additional profiles or using Our Services on behalf of another person is strictly prohibited.' },
                { term: '2.2.2', meaning: 'Our Services are intended exclusively for consumer use, meaning personal, non-commercial purposes. Use of Our Services for business or professional purposes is prohibited. We reserve the right to terminate Your access if this restriction is violated.' },
                { term: '2.2.3', meaning: 'You must provide accurate, complete, and up-to-date information when creating Your Profile. You are also responsible for promptly updating any changes to Your Profile information.' },
                { term: '2.2.4', meaning: 'If You move outside the Jurisdictions mentioned in clause 4.1.7, You may be required to accept Roze Remit Terms & Conditions applicable to Your new location. Be aware that some or all of Our Services may not be available in all jurisdictions.' },
                { term: '2.2.5', meaning: 'Legal and regulatory restrictions may prevent Us from offering Services in certain countries or to certain individuals. You are prohibited from using Our Services if You are in, or intend to send money to, a jurisdiction where We are not authorized to operate.' },
              ],
            },
            { id: '2.3', description: ['We reserve the right to suspend or terminate Your access to Our Services or Channel and to report any suspected illegal activity to the relevant authorities if You do not comply with these Terms & Conditions.'] },
            { id: '2.4', description: ['We agree to provide Services in accordance with these Terms & Conditions and Applicable Law. To verify Your identity, We may carry out additional checks, including but not limited to credit reference checks, sanctions screening, news checks, and other information sources. All such checks will be conducted in line with Our Privacy Policy and applicable data protection laws.'] },
          ],
        },
        {
          id: 4,
          title: 'Communications',
          subsections: [
            { id: '3.1', description: ['All official communications from Us will be sent through Our Channel and, where applicable, via email or telephone. You are responsible for regularly checking the Channel to stay informed of any communication or updates from Us.'] },
            { id: '3.2', description: ['This does not limit Your ability to contact Us through other means. You may reach Us by email at support@rozeremit.com, addressed to Customer Services, or via other contact options provided on Our Website.'] },
          ],
        },
        {
          id: 5,
          title: 'Your Obligations',
          subsections: [{
            id: '4.1',
            description: ['While We take a range of measures to protect the security of Your Profile and personal information, You also have an important role in maintaining a safe and secure environment when using Our Services and Channel. To comply with these Terms and safeguard Your security, You must:'],
            list: [
              { term: '4.1.1', meaning: 'Take all reasonable precautions to prevent any unauthorized access to Your Profile and the Channel.' },
              { term: '4.1.2', meaning: 'Keep Your equipment, login credentials, and any other tools used to access Our Services or Channel secure. This includes computers, mobile devices, and any related hardware or software. Do not disclose Your login details to anyone.' },
              { term: '4.1.3', meaning: 'Follow any specific security instructions We provide from time to time to maintain the integrity and safety of the Services.' },
              { term: '4.1.4', meaning: 'Avoid sharing any content through Our Services or Channel that may contain viruses, malware, or other harmful elements.' },
              { term: '4.1.5', meaning: 'Do not transfer, sell, or allow anyone other than Yourself, directly or indirectly, to use Your Profile or login credentials.' },
              { term: '4.1.6', meaning: 'Only send money to individuals You know and trust, refrain from transferring funds to unknown parties.' },
              { term: '4.1.7', meaning: 'Access to Our Services is limited to residents of the United Kingdom or other jurisdictions listed on Our Website. If You are not a resident of these regions, You are not permitted to use Our Services or Channel.' },
              { term: '4.1.8', meaning: 'Do not use tools, proxies, VPNs, or other methods to conceal Your identity or location when accessing Our Services.' },
              {
                term: '4.1.9',
                meaning: 'You must provide Us with correct, accurate, complete, and truthful details concerning:',
                children: [
                  { term: '4.1.9.1', meaning: 'Details of the money transfer order(s).' },
                  { term: '4.1.9.2', meaning: 'Correct and complete information about the Receiver, such as name, address, bank account details, or any other required information.' },
                  { term: '4.1.9.3', meaning: 'Your full name, address, bank account details, and any other requested information; and' },
                  { term: '4.1.9.4', meaning: 'Any other information required by Applicable Law or requested by Us before completing the Services.' },
                ],
              },
              { term: '4.1.10', meaning: 'Do not use Our Services to commit fraud, money laundering, terrorism financing, financial crime, or any similar illegal activity. We have the immediate right to suspend or cancel any Services, Channel access, or Your account without notice if We suspect or detect such activity by You or the Receiver. We may also report it to the relevant authorities.' },
              { term: '4.1.11', meaning: 'You authorize Us to share Your personal information, including name and address, with third parties to verify Your identity or obtain information about You, such as credit reports or other checks necessary to authenticate Your identity.' },
            ],
          }],
        },
        {
          id: 6,
          title: 'Transfer Instructions',
          subsections: [
            { id: '5.1', description: ["When initiating a money transfer, You act as the Sender and are transferring funds to a Receiver. You agree to pay Us the amount You wish to send (the Transfer Amount), plus any applicable transfer fees. Your instruction to Us to disburse the Transfer Amount to the Receiver constitutes the Transaction. The amount received by the Receiver is referred to as the Payout, which will equal the Transfer Amount in the currency selected for the Receiver."] },
            { id: '5.2', description: ['You are responsible for ensuring that all information provided in the order form — including Transfer Amount, Payout, and Receiver details — is accurate and complete. If We process the Transaction based on the information You supply, it will be considered correctly executed, even if the details are incorrect. We shall not be liable for any loss resulting from inaccurate information provided by You.'] },
            { id: '5.3', description: ['As Transactions are processed at Your request, We reserve the right to accept or decline any Transaction. Declines will generally occur only for valid reasons, such as breaches of these Terms. To avoid delays or issues, please provide accurate, current information about Yourself, the Transfer Amount, and any applicable fees.'] },
            { id: '5.4', description: ['To comply with Applicable Law, regulations, and regulatory expectations — including anti-money laundering (AML) and Know Your Customer (KYC) requirements — all Transactions are subject to screening and ongoing monitoring. We may request documentation or information to verify Your identity, the purpose of the Transaction, or details about the Receiver. This may include phone calls to obtain necessary information.'] },
            { id: '5.5', description: ['We may need to place a Transaction on hold until the required information is provided. We reserve the right to cancel any Transaction if, in Our sole discretion, it does not comply with regulatory requirements or falls outside Our risk parameters.'] },
            { id: '5.6', description: ['If You fail to provide the requested information within 30 days of initiating the Transaction, We may cancel the Transaction and refund the Transfer Amount in accordance with these Terms.'] },
            { id: '5.7', description: ['During the transfer process, You must supply accurate and truthful details about Yourself and the Receiver using the digital form. The specific information required may vary depending on the Transaction. Providing correct information is essential for the successful completion of the transfer. Errors or inconsistencies may cause delays or prevent the Transaction from being completed.'] },
            { id: '5.8', description: ['We are not obliged to accept any instruction to carry out a Transaction. We shall not be liable for any refusal to process a Transaction, or for suspending, terminating, or restricting Your access to Our Services or Channel. These Terms will apply only to Transactions We choose to accept.'] },
          ],
        },
        {
          id: 7,
          title: 'Price',
          subsections: [
            { id: '6.1', description: ['The costs and charges for using Our Services are displayed on the Channel and are presented to You before You complete a money transfer. This includes any transfer fees, applicable currency exchange rates, and other related charges. Unless specifically stated otherwise, prices do not include VAT. You can view the current fees at any time prior to confirming a transfer.'] },
            { id: '6.2', description: ['It is Your responsibility to review and understand the Fee Schedule before initiating a transfer. All relevant fees will be clearly presented before You finalize a Transaction. Subject to clauses 1.6, 1.7, and 1.8, We may update the Fee Schedule from time to time. The Fee Schedule in effect at the time of Your Transaction will apply, with fees communicated to and agreed by You before completing the transfer.'] },
            { id: '6.3', description: ['Certain jurisdictions may impose taxes or additional charges on particular money transfers or bill payments. When sending funds to a Receiver in such locations, these amounts will be deducted from the Transaction Amount. You may contact Us if You require further details.'] },
            { id: '6.4', description: ['The Sender is responsible for covering all fees required to complete a money transfer, unless Applicable Law in the destination country provides otherwise. Transfers may also be subject to local taxes and service charges, and the Receiver may incur additional fees for receiving funds via bank account, mobile wallet, or other methods.'] },
            { id: '6.5', description: ["Transfers can only be made in certain currencies, generally those used in the Receiver's country or region, though other currencies may also be supported. Our online forms calculate the available currency and the exchange rate that will apply. You will be able to review this information before instructing a Transaction, and it will also be included in the Transaction confirmation notice. You acknowledge that We may derive revenue from the exchange rate applied, and by instructing a Transaction, You accept the rate calculated for that transfer."] },
            { id: '6.6', description: ['We do not accept liability for any costs, losses, or fees incurred by the Sender or any account holder resulting from the currency conversion or exchange rate applied to the Transaction.'] },
          ],
        },
        {
          id: 8,
          title: 'Paying for Money Transfers',
          subsections: [
            { id: '7.1', description: ['We provide multiple secure and convenient options for paying for Your money transfers, including debit and credit cards or other alternative payment methods listed in the order form. Payments from bank accounts or cards linked to businesses or organizations may not be accepted.'] },
            { id: '7.2', description: ['To safeguard Your Transaction and protect against fraud, We may require additional verification or authorization steps during the payment process. This may include confirming Your billing address or receiving a one-time code from Your card issuer.'] },
            { id: '7.3', description: ['By using Our Services, You represent that You have the legal authority to use the selected Payment Method. You are solely responsible for ensuring that Your account has sufficient funds to cover the full cost of the money transfer, including any applicable fees.'] },
            { id: '7.4', description: ['We use industry-standard security measures to protect Your financial information. However, no transmission over the internet can be guaranteed as fully secure. We shall not be liable for any unauthorized access or disclosure of Your financial information caused by circumstances beyond Our reasonable control. You acknowledge and accept the inherent risks of using the internet while using Our Services or Channel.'] },
            { id: '7.5', description: ['Payment Methods are provided by third-party financial institutions. We do not guarantee their availability, functionality, or security. Any issues arising from their use, including unavailability or technical problems, must be resolved directly with the relevant financial institution. You agree to comply with the terms and conditions governing Your chosen Payment Method.'] },
            { id: '7.6', description: ['By placing a money transfer order, You authorize Us to debit the full amount, including applicable fees, from Your chosen Payment Method as specified in the order form. Payments will be deducted and cleared from Your account before We process and deliver the transfer.'] },
            { id: '7.7', description: ['If You provide incorrect information about Your payment instrument or if Your account lacks sufficient funds to cover the Transfer Amount plus fees, We may cancel the transfer or suspend Your use of Our Services immediately, without prior notice.'] },
          ],
        },
        {
          id: 9,
          title: 'Transfer Process and Provision of Services',
          subsections: [
            { id: '8.1', description: ['To initiate a money transfer, You must complete the digital order form available in Your Profile within the Channel. You are responsible for ensuring that all information provided during the creation of the Transaction is accurate and complete.'] },
            { id: '8.2', description: ['All countries, regions, payout methods, payout entities, and operators available for Transfers are listed on Our Channel. You must select the intended country, payout method, and payout partner (where applicable) correctly. If Your preferred payout option or partner is not listed, You may contact Us for assistance.'] },
            { id: '8.3', description: ['You must provide all required Receiver information accurately, including but not limited to bank account number, full name, phone number, address (if applicable), and any additional details requested. It is Your responsibility to ensure the information is correct. If incorrect details are submitted, the transfer will proceed, and We may be unable to recover or redirect the funds once the payment instruction has been processed.'] },
            {
              id: '8.4',
              description: ['All Transactions created by You are subject to Our acceptance. Notwithstanding any prior arrangement to initiate a money transfer, We are not obliged to initiate, process, or execute a Transaction if:'],
              list: [
                { term: '8.4.1', meaning: 'We have reason to suspect that Your account is being used for illegal, fraudulent, or prohibited purposes, or that the Transaction details are incorrect, unauthorized, or falsified.' },
                { term: '8.4.2', meaning: 'A competent court or regulatory authority directs Us to withhold execution of the Transaction.' },
                { term: '8.4.3', meaning: 'We have reasonable grounds to believe that You are using Our Services in violation of this Agreement or Applicable Law, including, without limitation, for money laundering or terrorism financing purposes.' },
                { term: '8.4.4', meaning: 'We are unable to verify Your identity, or You fail or refuse to provide required due diligence or verification documents.' },
                { term: '8.4.5', meaning: 'You have provided incorrect, incomplete, or untimely Transaction information, preventing Us from ensuring the timely execution of the requested money transfer.' },
                { term: '8.4.6', meaning: 'Your card issuer declines authorization for the use of Your bank card to fund the Transaction or pay Our fees.' },
              ],
            },
            { id: '8.5', description: ['We reserve the right to refuse to provide the Services, in whole or in part, if We determine that such use would breach Roze Remit policies (including those related to fraud prevention, anti-money laundering, or counter-terrorism financing), Applicable Law, a court order, or requirements from any regulatory or governmental authority with jurisdiction over Us. We may also refuse Services if We consider it necessary to protect Our own interests. Where possible, We will notify You of any refusal and provide reasons, unless legal constraints prevent Us from doing so.'] },
            { id: '8.6', description: ['We may partially or fully suspend the Services if circumstances beyond Our control make it necessary or appropriate to do so. In the event of any interruption to the Services on the Channel, whether caused by Us, a third-party provider, or any other factor, We will take reasonable measures to minimize the duration of such interruption.'] },
            { id: '8.7', description: ['Our obligations for delivering Services under these Terms commence only upon Our successful receipt of funds, either directly from You or via confirmation from third-party financial institutions collecting funds on Our behalf, in accordance with the transfer instructions You provide. Until We have received the full Transfer Amount, We are not required to initiate the money transfer process.'] },
            { id: '8.8', description: ['Once We have received the Transfer Amount, We will issue a confirmation notice. This notice may be delivered by email or as a notification or update of transaction status on the Channel. You are responsible for reviewing the information in the confirmation notice and may print and retain a copy for Your records.'] },
            { id: '8.9', description: ["The Services will be executed and the funds delivered to the Receiver according to the Payment Method selected by You in the order form. The Receiver may receive the funds into their designated bank account, mobile wallet, or as a cash payment at an authorized pay-out location, using the name and telephone number provided in the order form. Any delivery dates indicated are approximate, and occasional delays may occur due to unforeseen circumstances."] },
            {
              id: '8.10',
              description: ['We aim to process Your money transfers efficiently. However, delays may occasionally occur due to factors beyond Our control, including but not limited to:'],
              list: [
                { term: '8.10.1', meaning: 'Compliance requirements in the regulated sector applicable on Us or Our Partners, including additional verification for anti-money laundering purposes or confirmation of transfer details.' },
                { term: '8.10.2', meaning: 'Delays arising as funds pass through intermediary banks and multiple partners.' },
                { term: '8.10.3', meaning: 'Transfers initiated on weekends, public holidays, or outside the operational hours of the sending or receiving bank.' },
                { term: '8.10.4', meaning: 'Unforeseen technical issues affecting Our systems or those of intermediary banks.' },
              ],
            },
            { id: '8.11', description: ["While We will use commercially reasonable efforts to minimize delays, We shall not be liable for any loss or damage resulting from transfers processed outside Our standard timeframe due to circumstances beyond Our control. We have no control over the time it takes for the Receiver's bank or payment provider to credit and make the funds available."] },
            { id: '8.12', description: ['We reserve the right to cancel money transfers that are not collected by the Receiver within 60 days of availability. We will make reasonable efforts to refund the transfer amount to Your original Payment Method. Where Our payment processing partners require additional steps to process the refund, You may be asked to provide an alternate bank account and supporting account statement.'] },
          ],
        },
        {
          id: 10,
          title: 'Transaction Cancelling and Refunds',
          subsections: [
            { id: '9.1', description: ['You may cancel a Transaction at any time prior to Our receipt of the funds and issuance of a confirmation notice.'] },
            { id: '9.2', description: ['In accordance with clause 9.1, You may also cancel a Transaction via the option provided in Your Profile. If funds have not yet been received by Us, no refund is due, and the transfer order will be cancelled.'] },
            { id: '9.3', description: ['If We have received the funds and a confirmation notice has been issued and received, You may still request to cancel the Transaction and apply for a refund, provided that the Service has not yet been completed by Us.'] },
            {
              id: '9.4',
              description: ['You will no longer have the right to cancel a Transaction once You have explicitly given consent and We have completed the Service or sent instructions to Our partners to deliver it. Examples of when the Service is considered complete include:'],
              list: [
                { term: '9.4.1', meaning: "Funds have been deposited into the Receiver's designated bank account, wallet, or mobile number." },
                { term: '9.4.2', meaning: 'The Receiver has accessed or collected the transferred funds.' },
              ],
            },
            { id: '9.5', description: ['Once delivery instructions are sent to the designated pay-out partner, the Transaction cannot be cancelled unless We receive confirmation from the pay-out partner that the funds are still available. If the pay-out partner confirms the funds have been collected or accessed by the Receiver, the Transaction is final and cannot be cancelled.'] },
            { id: '9.6', description: ['Where cancellation is possible, We will refund the full transfer amount or part thereof (subject to applicable processing fees) to the account used to initiate the Transaction.'] },
            { id: '9.7', description: ['We reserve the right to deduct a reasonable processing fee from any refund to cover costs incurred in delivering the Service.'] },
          ],
        },
        {
          id: 11,
          title: 'How Your Money is Protected',
          subsections: [
            { id: '10.1', description: ["When You use Our Services, any funds You provide are held securely by Us until the Transaction is fully completed. Your money is kept in dedicated client money accounts at regulated commercial or central banks, which are separate from Our own operating accounts. This segregation ensures that Your funds remain protected and cannot be used for Our operational purposes."] },
            { id: '10.2', description: ["The safeguarding of Your funds continues until the Transaction reaches completion, which means the payment has been successfully delivered to the intended recipient or the recipient's payment service provider and confirmed in accordance with Our internal procedures. Only upon confirmation of successful delivery will the Transaction be considered complete, and the funds fully released."] },
          ],
        },
        {
          id: 12,
          title: 'Complaints',
          subsections: [
            { id: '11.1', description: ['We are committed to providing high-quality customer service and resolving any issues You may experience. If You are dissatisfied with Our Services, You may contact Our customer support team by using contact details available on Our channel. This will allow Us to understand and attempt to resolve Your issue informally. If Your concern is not resolved at this stage, You have the right to submit a formal complaint. For clarity, We may request that You submit the complaint in writing via email to ensure a full understanding of the matter.'] },
            { id: '11.2', description: ['Upon receipt of a formal complaint, We will acknowledge it in writing as soon as reasonably possible and, in any case, within five business days of receipt. This requirement will not apply if the complaint has been resolved to Your satisfaction within that period.'] },
            { id: '11.3', description: ['We will provide a full response to Your complaint within a reasonable period and, in any event, no later than 15 business days from receipt. In exceptional cases, We may issue a holding response explaining the reasons for the delay and indicating the date by which a full reply will be provided. Our aim is to issue a final response addressing all points raised no later than 35 business days from receipt of Your complaint.'] },
            { id: '11.4', description: ['If You remain dissatisfied with Our handling of Your complaint, You may refer Your complaint to the Financial Ombudsman Service (FOS), an independent external dispute resolution scheme. FOS can be contacted free of charge and will independently review eligible complaints. Further details of FOS and how to lodge a complaint will be provided in Our final response to Your complaint.'] },
          ],
        },
        {
          id: 13,
          title: 'Data Protection and Privacy',
          subsections: [
            { id: '12.1', description: ['The collection, processing, and use of Your personal data and information is governed by Our Privacy Policy, available at our Channel ("Privacy Policy"). By using Our Services and Channel, and agreeing to these Terms & Conditions, You also agree to the terms of Our Privacy Policy and consent to the processing described therein. You are advised to print or save a copy of the Privacy Policy together with these Terms & Conditions for Your records.'] },
            { id: '12.2', description: ['Your access to and use of the Channel and Services are subject to the Privacy Policy. By using the Channel and Services, You acknowledge and agree that We may collect, retain, and process personal or other information about You, the Sender, the Receiver, and the device used to access the Channel and Services.'] },
            { id: '12.3', description: ['While We implement reasonable technical, organizational and security measures to protect Your personal data, no online system is completely secure. By providing Your information, You acknowledge and accept the inherent risk of unauthorized access.'] },
          ],
        },
        {
          id: 14,
          title: 'Intellectual Property',
          subsections: [
            { id: '13.1', description: ['All content on Our Channel, including its design, trademarks, patents, databases, and other intellectual property rights (collectively, "Intellectual Property"), is owned by Us or Our licensors. This includes materials, works, methods, software, source code, data, technical information, branding elements such as trade names, service marks, goodwill, presentation and style of Our Services, creations, inventions, improvements to existing inventions, confidential information, know-how, and research related to Our Services. Such Intellectual Property is protected under Applicable Laws worldwide, whether registered or unregistered, and We reserve the right to seek protection and enforce such rights globally.'] },
            { id: '13.2', description: ['By using Our Channel, You acknowledge that all content and materials remain the property of Us or Our licensors.'] },
            { id: '13.3', description: ['You are permitted to download or copy content from Our Channel strictly for personal, non-commercial purposes. Any use for commercial purposes is strictly prohibited.'] },
            { id: '13.4', description: ['You may access and display our Channel content on Your computer, store it electronically on a personal device (not a network server), or print a copy for personal, non-commercial use. You must retain all copyright and proprietary notices.'] },
            { id: '13.5', description: ['Unauthorized use of Our Channel content is strictly prohibited. This includes, without limitation, copying, reproducing, transmitting, publishing, displaying, distributing, commercial exploitation, or creating derivative works without Our explicit permission.'] },
            { id: '13.6', description: ['These Terms do not grant You any rights to use Our trademarks or those of Our affiliates.'] },
            { id: '13.7', description: ["The Services We offer, and the Channel's content may be subject to intellectual property rights owned by third parties. We acknowledge and respect these rights."] },
            { id: '13.8', description: ['You may not create hyperlinks to Our Channel from any other website, document, or source without first obtaining Our written consent. We may revoke consent at any time without notice or reason. Upon receiving notice of withdrawal, You must immediately remove the link and confirm to Us that this has been done.'] },
          ],
        },
        {
          id: 15,
          title: 'Our Liability',
          subsections: [
            {
              id: '14.1',
              description: ['Subject to Applicable Law and to the maximum extent permitted:'],
              list: [
                { term: '14.1.1', meaning: 'Our liability to You under these Terms is limited to direct and foreseeable losses or damages arising solely from Our breach of these Terms or failure to exercise reasonable skill and care in fulfilling Our obligations. We shall not, under any circumstances, be liable for indirect, consequential, incidental, special, or punitive damages, even if We were advised of the possibility of such damages.' },
                { term: '14.1.2', meaning: 'You acknowledge and agree that We will not be liable for any loss of profit, revenue, goodwill, business opportunity, data, or similar intangible loss, even where We were advised of the possibility of potential risk of such losses.' },
                { term: '14.1.3', meaning: 'We accept no responsibility for any loss or damage that was unforeseeable, unavoidable, or beyond Our reasonable control (including, for example, viruses or malware introduced by third parties). We are likewise not liable for any loss arising from Our compliance with legal obligations, or where We have lawfully refused, suspended, cancelled, or delayed the provision of Our Services, or where You have breached these Terms or any related agreement.' },
              ],
            },
            { id: '14.2', description: ['Our Services are intended solely for Your personal and private use. Any commercial, business, or resale use is strictly prohibited. To the maximum extent permitted by Applicable Law, We and Our partners (including affiliates, officers, agents, contractors, and employees) disclaim all liability for any loss of profit, business revenue, business interruption, or lost business opportunity arising from unauthorized commercial use.'] },
            { id: '14.3', description: ['We shall use reasonable efforts to maintain the provision of Our Services and the operational functionality of Our Channel. Nevertheless, uninterrupted, or error-free service cannot be guaranteed. To the fullest extent permitted by Applicable Law, We shall not be liable for any loss, cost, or expense arising directly or indirectly from delays in performance or periods of downtime or unavailability.'] },
            { id: '14.4', description: ['Our Services are intended for personal, non-commercial money transfers. If You use Our Website for business-related payments, We expressly disclaim all liability for such use. This includes, without limitation, the delivery of funds, the quality or nature of goods or services purchased, or any disputes arising from business transactions. By using Our Services and Channel for such purposes, You acknowledge and accept this limitation and agree to hold Us harmless from any resulting loss or damage.'] },
            {
              id: '14.5',
              description: ['Without limiting the above, We will not be liable for:'],
              list: [
                { term: '14.5.1', meaning: 'goods or services which You pay for using the Services, nor their delivery.' },
                { term: '14.5.2', meaning: 'malfunctions in communication facilities over which We have no control.' },
                { term: '14.5.3', meaning: 'the loss of data or the delay in transmissions caused by using an Internet service provider or a browser or other software over which We have no control.' },
                { term: '14.5.4', meaning: 'the services provided by Your card issuer.' },
                { term: '14.5.5', meaning: 'viruses originating from third parties.' },
                { term: '14.5.6', meaning: 'errors on the Channel that are the result of incomplete or wrong information that You or a third party provided.' },
                { term: '14.5.7', meaning: 'the unauthorized use or interception of information prior to reaching the Channel; or' },
                { term: '14.5.8', meaning: 'the unauthorized use of or unauthorized access to data in conjunction with Yourself or Your Transactions which We process unless such use or such access is the result of negligence on Our behalf.' },
              ],
            },
          ],
        },
        {
          id: 16,
          title: 'Force Majeure',
          subsections: [
            {
              id: '15.1',
              description: ['We are not responsible for any delay or failure to perform Our obligations under these Terms caused by a Force Majeure Event. A Force Majeure Event refers to any event beyond Our reasonable control that prevents Us from fulfilling Our duties or delays performance. Examples of Force Majeure include, but are not limited to:'],
              list: [
                { term: '15.1.1', meaning: 'Strikes, lockouts, or other industrial action.' },
                { term: '15.1.2', meaning: 'Shortages of labour, services, power, supplies, or resources.' },
                { term: '15.1.3', meaning: 'Late, defective performance, or non-performance by suppliers or subcontractors.' },
                { term: '15.1.4', meaning: 'Civil commotion, riot, invasion, terrorist attack or threat of terrorist attack, war (declared or not), or threat or preparation for war.' },
                { term: '15.1.5', meaning: 'Fire, explosion, storm, flood, earthquake, subsidence, epidemic, or other natural disaster or extreme weather conditions.' },
                { term: '15.1.6', meaning: 'Impossibility of using railways, shipping, aircraft, motor transport, or other means of public or private transport for service delivery.' },
                { term: '15.1.7', meaning: 'Acts, decrees, legislation, regulations, or restrictions of any government.' },
              ],
            },
            { id: '15.2', description: ['During the continuance of a Force Majeure Event, Our obligations under these Terms shall be temporarily suspended. The period of suspension shall correspond to the duration of the event. We will make reasonable efforts to reduce the impact of the delay and to identify alternative means of fulfilling Our obligations. We will notify You promptly of the occurrence of any Force Majeure Event, outlining its nature and anticipated duration.'] },
            { id: '15.3', description: ['If a Force Majeure Event continues for more than thirty (30) days from the date of notification, either party may terminate the agreement governed by these Terms with immediate effect by giving written notice to the other.'] },
          ],
        },
        {
          id: 17,
          title: 'External Links',
          subsections: [
            {
              id: '16.1',
              description: ['To enhance Your experience and convenience, We may include links to or integrate services from external websites or resources, which You may choose to access at Your own discretion and risk. By selecting any such third-party link, You acknowledge and agree that:'],
              list: [
                { term: '16.1.1', meaning: 'We are not responsible for the availability or functionality of any external sites or resources.' },
                { term: '16.1.2', meaning: 'We do not control, monitor, endorse, or guarantee any content, including advertisements, products, services, or materials provided on those external sites.' },
                { term: '16.1.3', meaning: 'We shall not be held liable for any loss, damage, or offense arising from or in connection with Your use of, or reliance upon, any such third-party content, products, or services.' },
              ],
            },
            { id: '16.2', description: ["We recommend that You review the terms of use and privacy policies of any linked websites before accessing them. Your use of such external sites is entirely at Your own risk."] },
          ],
        },
        {
          id: 18,
          title: 'General',
          subsections: [
            { id: '17.1', description: ['Subject to clauses 1.6, 1.7, and 1.8 of these Terms and Conditions, We reserve the right to modify Our Channel, website domain, Services, products, pricing, specifications, or availability at any time. You are advised to review these Terms and Conditions periodically to stay informed of any updates or changes.'] },
            {
              id: '17.2',
              description: ['We make every effort to ensure that the information on Our Channel regarding the availability of Services is accurate and up to date. However, We do not guarantee that all Services will be available at the time You place an order. If a Service becomes unavailable after Your order has been submitted, We will:'],
              list: [
                { term: '17.2.1', meaning: 'Notify You promptly of the unavailability.' },
                { term: '17.2.2', meaning: 'Offer a comparable alternative, where possible; or.' },
                { term: '17.2.3', meaning: 'Issue a full refund if no suitable alternative can be provided.' },
              ],
            },
            { id: '17.3', description: ['If a court or other competent authority decides that any part of these Terms and Conditions is invalid or cannot be enforced, the rest of the Terms — and any remaining part of that specific provision — will remain valid and effective.'] },
            { id: '17.4', description: ['Our Channel primarily provides content and materials in English. From time to time, localized translations may be available for Your ease of understanding, but these are intended only as reference. Should any difference arise, the English version will take precedence and be regarded as the authoritative version.'] },
            { id: '17.5', description: ['If, at any point during the term of this Agreement, We do not enforce strict compliance with any of Your obligations under these Terms and Conditions or the Agreement, such inaction shall not be considered a waiver of those rights or remedies. A waiver shall only be valid if it is expressly identified as such and provided to You in writing.'] },
            { id: '17.6', description: ['By taking part in a rewards programme, you agree to be bound by any and all specific terms and conditions that govern that programme.'] },
          ],
        },
        {
          id: 19,
          title: 'Governing Law and Jurisdiction',
          description: ['All rights, duties, disputes, claims, and legal relationships stemming from these Terms & Conditions are governed by the laws of England and Wales.'],
        },
      ],
    },
  },
]
