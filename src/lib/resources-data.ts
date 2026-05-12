import { Resource } from "@/types/resource";

export const resources: Resource[] = [
  // ─── NYC HOTLINES ───────────────────────────────────────────────────────
  {
    id: "nyc-dv-hotline",
    name: "NYC 24-Hour Domestic Violence Hotline",
    description:
      "NYC's official 24/7 hotline for domestic violence survivors. Provides crisis intervention, safety planning, referrals to shelter, counseling, and legal services. Available in over 170 languages.",
    category: "hotline",
    location: "nyc",
    phone: "1-800-621-4673",
    website:
      "https://www.nyc.gov/site/hra/help/domestic-violence-support.page",
    hours: "24 hours, 7 days a week",
    cost: "Free",
    languages: ["English", "Spanish", "170+ languages via interpreter"],
  },
  {
    id: "national-dv-hotline",
    name: "National Domestic Violence Hotline",
    description:
      "Confidential 24/7 support for domestic violence survivors anywhere in the US. Offers crisis intervention, safety planning, and referrals. Chat available online.",
    category: "hotline",
    location: "national",
    phone: "1-800-799-7233",
    website: "https://www.thehotline.org",
    hours: "24/7",
    cost: "Free",
    languages: ["English", "Spanish", "Translation for 200+ languages"],
  },
  {
    id: "nys-dv-sa-hotline",
    name: "NYS Domestic & Sexual Violence Hotline",
    description:
      "New York State's confidential 24/7 hotline. Call, text, or chat. Provides emotional support, crisis counseling, safety planning, and referrals to local programs.",
    category: "hotline",
    location: "nyc",
    phone: "1-800-942-6906",
    website: "https://opdv.ny.gov/survivors-victims",
    hours: "24/7",
    cost: "Free",
    languages: ["English", "Spanish", "Most languages via interpreter"],
  },
  {
    id: "safe-horizon-hotline",
    name: "Safe Horizon Crime Victims Hotline",
    description:
      "Safe Horizon is NYC's largest victim services agency. Their hotline provides immediate crisis support, shelter referrals, and connection to ongoing services for DV and sexual assault survivors.",
    category: "hotline",
    location: "nyc",
    phone: "1-800-621-4673",
    website: "https://www.safehorizon.org",
    hours: "24/7",
    cost: "Free",
  },
  {
    id: "anti-violence-project",
    name: "NYC Anti-Violence Project",
    description:
      "The leading LGBTQ+ anti-violence organization in the US. Provides crisis intervention, legal advocacy, and counseling for LGBTQ+ survivors of domestic violence, sexual assault, and hate violence.",
    category: "hotline",
    location: "nyc",
    phone: "(212) 714-1141",
    website: "https://avp.org",
    hours: "24/7",
    cost: "Free",
    lgbtqFriendly: true,
    languages: ["English", "Spanish"],
  },
  {
    id: "sakhi",
    name: "Sakhi for South Asian Women",
    description:
      "Provides culturally competent support to South Asian survivors of gender-based violence in the NYC metro area. Offers crisis support, legal advocacy, and economic empowerment services.",
    category: "hotline",
    location: "nyc",
    phone: "(212) 868-6741",
    website: "https://www.sakhi.com",
    hours: "Mon–Fri, 10 AM–5 PM",
    cost: "Free",
    languages: [
      "English",
      "Hindi",
      "Urdu",
      "Bengali",
      "Gujarati",
      "Punjabi",
    ],
  },
  {
    id: "womankind",
    name: "Womankind",
    description:
      "Serves Asian immigrant and refugee survivors of domestic violence and sexual assault in NYC. Multilingual, culturally sensitive services including emergency shelter, legal advocacy, and counseling.",
    category: "hotline",
    location: "nyc",
    phone: "(888) 888-7702",
    website: "https://www.iamwomankind.org",
    hours: "24/7 hotline",
    cost: "Free",
    languages: [
      "Cantonese",
      "Mandarin",
      "Korean",
      "Japanese",
      "Tagalog",
      "English",
      "Spanish",
    ],
  },
  {
    id: "barrier-free-living",
    name: "Barrier Free Living — Freedom House",
    description:
      "Provides domestic violence shelter and services specifically designed for survivors with disabilities. Offers safe confidential housing, advocacy, and case management.",
    category: "hotline",
    location: "nyc",
    phone: "(212) 533-4358",
    website: "https://www.bflnyc.org",
    hours: "24/7 hotline",
    cost: "Free",
    disabilityAccessible: true,
  },

  // ─── NYC LEGAL ──────────────────────────────────────────────────────────
  {
    id: "sanctuary-for-families",
    name: "Sanctuary for Families",
    description:
      "New York's leading service provider for survivors of domestic violence, sex trafficking, and gender violence. Offers comprehensive legal services including orders of protection, divorce, custody, immigration relief, and economic empowerment.",
    category: "legal",
    location: "nyc",
    phone: "(212) 349-6009",
    address:
      "227 Madison Street, NYC Health + Hospitals/Gouverneur, New York, NY 10002",
    website: "https://sanctuaryforfamilies.org",
    hours: "Mon–Fri, 9 AM–5 PM",
    cost: "Free",
    languages: ["English", "Spanish", "Arabic", "French", "Mandarin"],
  },
  {
    id: "nylag",
    name: "New York Legal Assistance Group (NYLAG)",
    description:
      "NYLAG's Domestic Violence Law program helps survivors achieve safety and stability. Services include orders of protection, divorce, child custody, spousal support, and immigration relief. Walk-in clinics available.",
    category: "legal",
    location: "nyc",
    phone: "(212) 613-5000",
    address: "17 Hanover Square, New York, NY 10004",
    website: "https://nylag.org/domestic-violence-law/",
    hours: "Mon, 9 AM–5 PM (intake line)",
    cost: "Free (income-eligible)",
    languages: ["English", "Spanish"],
  },
  {
    id: "legal-services-nyc",
    name: "Legal Services NYC",
    description:
      "The largest free civil legal services provider in NYC. Serves low-income residents with DV-related legal needs: orders of protection, family court, housing, and immigration. Phone intake in any language.",
    category: "legal",
    location: "nyc",
    phone: "(917) 661-4500",
    website: "https://www.lsnyc.org",
    hours: "Mon–Fri, 10 AM–4 PM",
    cost: "Free (income-eligible)",
    languages: ["English", "Spanish", "Any language via interpreter"],
  },
  {
    id: "safe-horizon-legal",
    name: "Safe Horizon — Domestic Violence Law Project",
    description:
      "Provides legal advocacy and direct representation to low-income DV survivors in family court, housing court, and immigration proceedings.",
    category: "legal",
    location: "nyc",
    phone: "(212) 577-7700",
    address: "2 Lafayette Street, 3rd Floor, New York, NY 10007",
    website: "https://www.safehorizon.org/get-help/legal-advocacy/",
    hours: "Mon–Fri, 9 AM–5 PM",
    cost: "Free",
  },
  {
    id: "city-bar-justice",
    name: "City Bar Justice Center — Legal Hotline",
    description:
      "Provides brief civil legal advice on DV-related issues including family court, orders of protection, and housing. Low-income NYC residents only.",
    category: "legal",
    location: "nyc",
    phone: "(212) 626-7383",
    website: "https://www.citybarjusticecenter.org",
    hours: "Mon–Fri, 9 AM–5 PM",
    cost: "Free (income-eligible)",
  },

  // ─── NYC MEDICAL / SANE ─────────────────────────────────────────────────
  {
    id: "mount-sinai-savi",
    name: "Mount Sinai SAVI Program",
    description:
      "NYS-designated Center of Excellence for sexual assault forensic exams. The SAVI program provides SAFE exams, crisis counseling, follow-up therapy, and legal advocacy — all in one place. No police report required.",
    category: "medical",
    location: "nyc",
    phone: "(212) 423-2140",
    address:
      "1 Gustave L. Levy Place, Mount Sinai Hospital, New York, NY 10029",
    website:
      "https://www.mountsinai.org/patient-care/service-areas/community-medicine/sexual-assault-and-violence-intervention-program-savi",
    hours: "24/7 (ER)",
    cost: "Free to report survivors; insurance billed for medical treatment",
  },
  {
    id: "nyc-health-hospitals-sane",
    name: "NYC Health + Hospitals — Sexual Assault Forensic Exams",
    description:
      "All NYC Health + Hospitals facilities provide sexual assault forensic exams. Trained SAFE examiners available 24/7. Advocates available to accompany you throughout the process.",
    category: "medical",
    location: "nyc",
    phone: "(212) 788-3321",
    website: "https://www.nychealthandhospitals.org",
    hours: "24/7 at all locations",
    cost: "Free for the exam",
  },

  // ─── NYC SHELTER ────────────────────────────────────────────────────────
  {
    id: "safe-horizon-shelter",
    name: "Safe Horizon — DV Shelters",
    description:
      "Safe Horizon operates 8 emergency shelters across all five NYC boroughs for DV survivors. Shelters are confidential. Access is through the NYC DV Hotline. Provides safe housing, counseling, childcare, and case management.",
    category: "shelter",
    location: "nyc",
    phone: "1-800-621-4673",
    website: "https://www.safehorizon.org/domestic-violence-shelters/",
    hours: "Call hotline 24/7 for access",
    cost: "Free",
  },
  {
    id: "uri-nyc",
    name: "Urban Resource Institute (URI)",
    description:
      "URI houses nearly 1,200 DV survivors per night — the largest DV housing provider in the US. Confidential shelter locations across NYC. Accepts adults, children, and pets. Access through the NYC DV Hotline.",
    category: "shelter",
    location: "nyc",
    phone: "1-800-621-4673",
    website: "https://urinyc.org",
    hours: "Call hotline 24/7",
    cost: "Free",
  },
  {
    id: "nyc-family-justice-centers",
    name: "NYC Family Justice Centers (5 Boroughs)",
    description:
      "One-stop locations offering DV services across all five boroughs. Services include safety planning, counseling, legal assistance, immigration support, and shelter referrals. Walk-in, no appointment needed.",
    category: "shelter",
    location: "nyc",
    phone: "1-888-373-8888",
    website:
      "https://www.nyc.gov/site/hra/help/domestic-violence-support.page",
    hours: "Mon–Fri, 9 AM–5 PM",
    cost: "Free",
    languages: ["English", "Spanish", "Many languages available"],
  },

  // ─── NJ HOTLINES & COUNTY RESOURCES ────────────────────────────────────
  {
    id: "nj-dv-hotline",
    name: "NJ Domestic Violence Hotline",
    description:
      "New Jersey's official 24/7 confidential hotline for DV survivors. Provides crisis intervention, safety planning, referrals to shelters, legal resources, and counseling.",
    category: "hotline",
    location: "nj",
    phone: "1-800-572-7233",
    website: "https://www.nj.gov/dcf/women/hotlines/",
    hours: "24/7",
    cost: "Free",
  },
  {
    id: "njcasa",
    name: "NJ Coalition Against Sexual Assault (NJCASA)",
    description:
      "NJCASA provides statewide support and coordinates sexual assault programs in all 21 NJ counties. Their find-help directory connects survivors to local rape crisis programs near them.",
    category: "hotline",
    location: "nj",
    phone: "(609) 631-4450",
    website: "https://njcasa.org/find-help/",
    hours: "Business hours (local programs 24/7)",
    cost: "Free",
  },
  {
    id: "center-for-empowerment",
    name: "Middlesex County Center for Empowerment",
    description:
      "The official Middlesex County government program for survivors of sexual assault, domestic violence, and human trafficking. Provides 24/7 crisis counseling, hospital advocacy, legal support, safety planning, and referrals — all free and confidential. Serves adults and children in Middlesex County.",
    category: "hotline",
    location: "nj",
    phone: "1-877-665-7273",
    address: "841 Georges Road, North Brunswick, NJ 08902",
    website: "https://www.middlesexcountynj.gov/government/departments/health-human-services/center-for-empowerment",
    hours: "24/7",
    cost: "Free",
    languages: ["English", "Spanish", "Interpreter available"],
  },
  {
    id: "180-nj",
    name: "180 Turning Lives Around",
    description:
      "NJ organization providing 24/7 hotlines, counseling, legal advocacy, emergency safe housing, and children's programs for DV and sexual assault survivors in Monmouth and Middlesex counties.",
    category: "hotline",
    location: "nj",
    phone: "(732) 264-4111",
    website: "https://180nj.org",
    hours: "24/7",
    cost: "Free",
  },

  // ─── NJ LEGAL ───────────────────────────────────────────────────────────
  {
    id: "njcedv",
    name: "NJ Coalition to End Domestic Violence (NJCEDV)",
    description:
      "New Jersey's statewide DV coalition. NJCEDV connects survivors to local DV programs in all 21 counties, advocates for survivor-centered policy, and maintains a county-by-county resource directory. If you don't know where to start, start here.",
    category: "legal",
    location: "nj",
    phone: "(609) 584-8107",
    website: "https://njcedv.org/get-help/",
    hours: "Mon–Fri, 9 AM–5 PM (local programs available 24/7)",
    cost: "Free",
    languages: ["English", "Spanish", "Local programs vary"],
  },
  {
    id: "lsnj-middlesex",
    name: "Legal Services of New Jersey — Middlesex County",
    description:
      "Free civil legal aid for income-eligible NJ residents. Handles restraining orders, divorce, child custody, child support, housing eviction defense, and public benefits for DV survivors. Statewide hotline routes to your local office.",
    category: "legal",
    location: "nj",
    phone: "1-888-576-5529",
    website: "https://www.lsnj.org",
    hours: "Mon–Fri, 9 AM–5 PM",
    cost: "Free (income-eligible)",
    languages: ["English", "Spanish", "Interpreter available"],
  },
  {
    id: "180-nj-legal",
    name: "180 Turning Lives Around — Legal Advocacy",
    description:
      "Provides in-court legal advocacy for DV survivors in Middlesex and Monmouth counties. Staff advocates accompany survivors to the courthouse, help file for Temporary Restraining Orders (TROs), and navigate family court. No prior appointment needed for TRO assistance.",
    category: "legal",
    location: "nj",
    phone: "(732) 264-4111",
    website: "https://180nj.org/services/legal-advocacy/",
    hours: "Mon–Fri, 9 AM–5 PM; hotline 24/7",
    cost: "Free",
    languages: ["English", "Spanish"],
  },
  {
    id: "middlesex-prosecutor-advocacy",
    name: "Middlesex County Prosecutor — Victim-Witness Advocacy",
    description:
      "Free advocacy services for crime victims in Middlesex County. Staff guide survivors through the criminal justice process, explain victims' rights, assist with Victim Compensation Fund applications, and connect to community resources. Located inside the Middlesex County Courthouse.",
    category: "legal",
    location: "nj",
    phone: "(732) 745-3394",
    address: "25 Kirkpatrick Street, New Brunswick, NJ 08901",
    website:
      "https://www.middlesexcountynj.gov/government/departments/prosecutor-s-office",
    hours: "Mon–Fri, 8:30 AM–4:30 PM",
    cost: "Free",
  },
  {
    id: "isles-nj",
    name: "Isles — Domestic Violence Legal Assistance",
    description:
      "Isles' DV project provides free legal help to low-income survivors in Mercer and surrounding NJ counties. Assists with protective orders, family law matters, housing stability, and benefits access.",
    category: "legal",
    location: "nj",
    phone: "(609) 341-4700",
    website: "https://isles.org",
    hours: "Mon–Fri, 9 AM–5 PM",
    cost: "Free (income-eligible)",
    languages: ["English", "Spanish"],
  },
  {
    id: "robinhood-nj-legal",
    name: "American Friends Service Committee — Immigrant Rights",
    description:
      "Provides free legal consultations and Know Your Rights education for immigrant survivors in NJ. Helps with VAWA self-petitions, U-visa applications, and DACA renewals. Being undocumented does NOT disqualify you from a restraining order.",
    category: "legal",
    location: "nj",
    phone: "(973) 643-1924",
    website: "https://www.afsc.org/program/newark-nj",
    hours: "Mon–Fri, 9 AM–5 PM",
    cost: "Free",
    languages: ["English", "Spanish", "Portuguese"],
  },
  {
    id: "northeast-nj-legal",
    name: "Northeast NJ Legal Services",
    description:
      "Provides free civil legal assistance to eligible residents of Bergen, Hudson, and Passaic counties. Handles DV-related family law: restraining orders, custody, support, and immigration relief.",
    category: "legal",
    location: "nj",
    phone: "(201) 487-2166",
    website: "https://www.lsnj.org",
    hours: "Mon–Fri, 9 AM–5 PM",
    cost: "Free (income-eligible)",
  },
  {
    id: "jbws-legal",
    name: "JBWS — Legal Advocacy",
    description:
      "Meets survivors at the Morris County Superior Courthouse or in Paterson. Assists with restraining orders, family court proceedings, and safety planning. Also offers 24/7 crisis hotline.",
    category: "legal",
    location: "nj",
    phone: "(973) 267-4763",
    website: "https://jbws.org",
    hours: "Mon–Fri, 9 AM–5 PM; hotline 24/7",
    cost: "Free",
  },

  // ─── NJ MEDICAL ─────────────────────────────────────────────────────────
  {
    id: "nj-sane-programs",
    name: "NJ SANE Programs (Statewide)",
    description:
      "New Jersey has SANE (Sexual Assault Nurse Examiner) programs available through hospital emergency departments across the state. Contact NJCASA to find your nearest program. Evidence can be preserved even if you are unsure about reporting.",
    category: "medical",
    location: "nj",
    phone: "(609) 631-4450",
    website: "https://njcasa.org/find-help/",
    hours: "24/7 (ER-based)",
    cost: "Free for the exam",
  },

  // ─── NJ SHELTER ─────────────────────────────────────────────────────────
  {
    id: "jbws-shelter",
    name: "JBWS — Emergency Safe House",
    description:
      "Provides confidential emergency shelter for DV survivors in Morris County, NJ. Offers counseling, legal advocacy, and transitional housing support. Children welcome.",
    category: "shelter",
    location: "nj",
    phone: "(973) 267-4763",
    website: "https://jbws.org",
    hours: "24/7 hotline for access",
    cost: "Free",
  },
  {
    id: "180-nj-shelter",
    name: "180 Turning Lives Around — Emergency Housing",
    description:
      "Emergency housing and transitional shelter in Monmouth and Middlesex counties, NJ. Provides trauma-informed care, case management, and children's services.",
    category: "shelter",
    location: "nj",
    phone: "(732) 264-4111",
    website: "https://180nj.org",
    hours: "24/7",
    cost: "Free",
  },
];
