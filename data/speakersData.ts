export interface Speaker {
  id: string;
  name: string;
  designation: string;
  institution?: string;
  location?: string;
  qualifications?: string;
  awards: string[];
  memberships?: string[];
  experience: string[];
  publications?: string[];
  image?: string; // Left undefined/empty so image slot remains a clean placeholder
}

export const SPEAKERS_DATA: Speaker[] = [
  {
    id: "dr-dhiren-modi",
    name: "Dr. Dhiren Modi",
    designation: "Director, Community Health Project & Trustee",
    institution: "SEWA Rural",
    location: "Bharuch, Gujarat",
    qualifications: "MBBS, MD (Community Medicine)",
    awards: [
      "Contributed to the development and implementation of ImTeCHO, a mobile-health initiative supporting community-based maternal, newborn and child health services in rural and tribal Gujarat."
    ],
    memberships: [
      "Trustee, SEWA Rural."
    ],
    experience: [
      "Medical graduate with postgraduate training in Community Medicine.",
      "Work in community health programmes serving rural and tribal populations.",
      "Areas of contribution include maternal and newborn health, community-based care, and use of digital tools to support frontline health services."
    ],
    publications: [
      "Research on the development and formative evaluation of an mHealth intervention for community-based maternal, newborn and child health services in rural India (Global Health Action, 2015).",
      "Research on weekly iron and folic acid supplementation through peer educators in tribal Gujarat (Indian Journal of Community Medicine, 2016)."
    ]
  },
  {
    id: "dr-ankit-sheth",
    name: "Dr. Ankit Sheth",
    designation: "Medical Scientist 'F' and Head, Health Sciences Division",
    institution: "ICMR – National Institute of Occupational Health Research",
    location: "Ahmedabad, Gujarat",
    qualifications: "MD (Community Medicine)",
    awards: [
      "Dr. C. K. Ramchandar Centenary Award for Best Scientific Paper, Indian Association of Occupational Health."
    ],
    memberships: [
      "Indian Association of Preventive and Social Medicine (IAPSM)."
    ],
    experience: [
      "Heads the Health Sciences Division at ICMR–National Institute of Occupational Health Research.",
      "Research contributions in occupational health, occupational epidemiology and public health.",
      "Research areas include workplace exposure and workers’ health."
    ]
  },
  {
    id: "dr-bharti-koria",
    name: "Dr. Bharti Koria",
    designation: "Associate Professor, Department of Preventive and Social Medicine (Community Medicine)",
    institution: "Pandit Deendayal Upadhyaya Government Medical College",
    location: "Rajkot, Gujarat",
    qualifications: "MBBS, MD (Preventive and Social Medicine / Community Medicine)",
    awards: [
      "Recognition during World Breastfeeding Week, 2013."
    ],
    memberships: [
      "IAPSM."
    ],
    experience: [
      "MBBS, M. P. Shah Medical College, Jamnagar; completed February 2006.",
      "MD (PSM/Community Medicine), B. J. Medical College, Ahmedabad; completed April 2011.",
      "Teaching experience: 17 years at undergraduate level and 10 years at postgraduate level.",
      "Research areas represented in published work include infectious disease outbreak investigation, smoking awareness and community-based public health."
    ],
    publications: [
      "“The Role of Religious Places in Disease Prevention, Notification, and Control: A Public Health Interface.” Journal of the Epidemiology Foundation of India, 2025.",
      "“An Epidemic Investigation of Acute Encephalitis at Jetpur Taluka, Rajkot District, Gujarat.” SSR Institute of International Journal of Life Sciences, 2025.",
      "“A Cross Sectional Study of Awareness Regarding Smoking and Its Adverse Health Effects among the Visitors of Tertiary Care Hospital, Western Part of Gujarat.” International Journal of Pharmaceutical and Clinical Research, 2024.",
      "“Outbreak Investigation of Acute Diarrheal Disease in Palitana Urban, Gujarat.” International Journal of Community Medicine and Public Health, 2017."
    ]
  },
  {
    id: "dr-derrick-muneene",
    name: "Dr. Derrick Muneene",
    designation: "Team Lead, Assessment, Planning and Partnerships Team (APP)",
    institution: "Insights, Capacity and Operations Unit (ICO), Data, Digital Health, Analytics and AI Department (DDA), World Health Organization",
    location: "Geneva, Switzerland",
    qualifications: "PhD, MSc Public Health, MSc Information Systems Management, BSc Computer Science; PRINCE2 and CompTIA Project+ certifications.",
    awards: [
      "Contributed to development of electronic antiretroviral treatment records, laboratory software and smartcard-based patient records in Zambia.",
      "Served as WHO Regional Office for Africa eHealth/mHealth technical adviser, supporting digital health strategy development and implementation across 47 African countries.",
      "Worked with the US Centers for Disease Control and Prevention on national electronic health records and automation of birth and death registration systems in Zambia.",
      "Contributed to WHO initiatives on digital adaptation kits, interoperability standards and implementation of digital health recommendations.",
      "Co-authored research on artificial intelligence, health-data transformation and pandemic preparedness in Africa."
    ],
    experience: [
      "International experience in digital health, public health informatics, health information systems and digital transformation.",
      "Areas of expertise include digital health governance, strategic planning, international partnerships, capacity development and health-system strengthening.",
      "Experience supporting national and regional digital health programmes, electronic health records and technology-enabled public health services."
    ],
    publications: [
      "“Data revolution, health status transformation and the role of artificial intelligence for health and pandemic preparedness in the African context.” BMC Proceedings, 2021.",
      "“Impact of Information and Communication Technology Diffusion on HIV and Tuberculosis Health Outcomes among African Health Systems.” Informatics, 2020.",
      "“eHealth or e-Chaos: The use of Digital Health Interventions for Health Systems Strengthening in sub-Saharan Africa over the last 10 years: A scoping review.” 2022.",
      "“Leveraging artificial intelligence to assist the ethical and science-based distribution of COVID-19 vaccines.” Journal of Global Health, 2021.",
      "“Policy analysis and expert consultation on cross-border telehealth services.” Bulletin of the World Health Organization, 2026."
    ]
  },
  {
    id: "mr-yazdi-maneksha-italia",
    name: "Mr. Yazdi Maneksha Italia",
    designation: "Physician, Microbiologist and Public Health Scientist",
    location: "Gujarat, India",
    qualifications: "Public health and microbiology professional based in Gujarat, India.",
    awards: [
      "Padma Shri (2024), Medicine.",
      "Prime Minister’s Award for Excellence in Public Administration (2011), associated with Gujarat’s Sickle Cell Anaemia Control Programme.",
      "Lifetime Achievement Award, Indian Society of Blood Transfusion and Immunohaematology (ISBTI), 2019.",
      "Chief Minister’s Award, Government of Gujarat (2023)."
    ],
    memberships: [
      "Chairman, ISBTI West Zone.",
      "Member, Technical Resource Group on Blood Safety, Ministry of Health and Family Welfare, Government of India."
    ],
    experience: [
      "Known for work in sickle cell disease prevention and tribal healthcare in South Gujarat.",
      "Former Director, Government–NGO Partnership Sickle Cell Anaemia Control Programme, Gujarat (2006–2012).",
      "Associated with Valsad Raktdan Kendra, a regional blood bank and haematology research centre.",
      "Areas of expertise include haemoglobinopathies, sickle cell disease, blood banking, haematology research and tribal health."
    ],
    publications: [
      "Author of 18 research publications.",
      "Research interests include sickle cell disease, haemoglobinopathies, blood banking and clinical biochemistry."
    ]
  },
  {
    id: "dr-mahua-moitra",
    name: "Dr. Mahua Moitra",
    designation: "Preventive Oncologist",
    institution: "Bharat Cancer Hospital & Research Institute",
    location: "Surat, Gujarat",
    qualifications: "MBBS, MD Community Medicine",
    awards: [
      "Academic and research contributions in community medicine and preventive healthcare.",
      "Research contributions in public health and healthcare delivery."
    ],
    experience: [
      "Academic experience in Community Medicine at Government Medical College, Surat.",
      "Current professional role in preventive oncology at Bharat Cancer Hospital, Surat.",
      "Research interests include preventive healthcare, health promotion, women's health, health education and community-based disease prevention."
    ],
    publications: [
      "Obstetric Referrals: Scenario at a Primary Health Centre in Gujarat. National Journal of Community Medicine, 2012.",
      "Working Conditions of Male Construction Worker and Its Impact on Their Life: A Cross Sectional Study in Surat City. National Journal of Community Medicine, 2012.",
      "Knowledge, Attitude and Practices on Tuberculosis among People Living in an Urban Slum of Surat.",
      "Gynecological Morbidities in Women of Reproductive Age Group in Urban Slums of Bhavnagar City."
    ]
  }
];

