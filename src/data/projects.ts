import { images, original, type ImageEntry } from "./images";

export type Project = {
  slug: "palm-serenity" | "royal-park" | "dollars-colony";
  name: string;
  subtitle: string;
  tag: string;
  listTag: string;
  listMeta: string;
  listText: string;
  chips: string[];
  meta: { title: string; description: string };
  hero: ImageEntry;
  facts: { value: string; label: string }[];
  overview: { eyebrow: string; title: string; text: string; specs: { label: string; value: string }[] };
  whoFor: string;
  highlightsTitle: string;
  highlights: { title: string; text: string }[];
  amenitiesTitle: string;
  amenities: string[];
  gallery: ImageEntry[];
  location: { eyebrow: string; title: string; text?: string; figures?: { value: string; label: string }[] };
  approvals: { label: string; value: string; note?: string; needsReview?: boolean }[];
  faqs: { q: string; a: string; needsReview?: boolean }[];
  cta: { title: string; body: string; button: string };
};

export const projects: Project[] = [
  {
    slug: "palm-serenity",
    name: "Palm Serenity",
    subtitle: "An 8-Acre Boutique Farm Resort & Managed Farmland Community in Mysuru",
    tag: "Pre-Launch Opportunity",
    listTag: "Pre-Launch",
    listMeta: "Mysuru • Managed Farmland",
    listText: "An 8-acre boutique farm resort community in Mysuru with premium farm plots starting from 6,024 sq. ft. Designed for luxury sustainable living and weekend retreats.",
    chips: ["8 Acres Enclave", "Plots from 6,024 sq.ft", "Price on Request"],
    meta: {
      title: "Palm Serenity Mysuru | 8-Acre Managed Farmland | Royal Infra",
      description: "Palm Serenity: 8-acre boutique managed farmland in Mysuru with farm plots from 6,024 sq. ft., orchards, pool and cafes. Pre-launch bookings open.",
    },
    hero: images.palmSerenity,
    facts: [
      { value: "Mysuru", label: "Prime Location" },
      { value: "Managed Farm", label: "Property Type" },
      { value: "8 Acres", label: "Enclave Size" },
      { value: "6,024+ sq.ft.", label: "Plot Sizes" },
    ],
    overview: {
      eyebrow: "Estate Overview",
      title: "A Harmonious Blend of Nature & Luxury",
      text: "Escape to tranquility at Palm Serenity, a boutique 8-acre managed farmland and luxury resort sanctuary situated along the high-growth corridor of Mysuru. Created for visionary families and investors, Palm Serenity offers expansive farm plots starting from 6,024 sq. ft., surrounded by organic orchards, sandalwood groves, and world-class resort amenities.",
      specs: [
        { label: "Plot Dimensions", value: "From 6,024 sq. ft." },
        { label: "Project Type", value: "Managed Farmland & Farm Resort" },
        { label: "Approval Status", value: "Clear Titles & Approvals Ready" },
      ],
    },
    whoFor: "Palm Serenity is created for visionary families and investors looking for managed farmland near Mysuru: a low-density, gated enclave for nature enthusiasts who want a weekend retreat, organic orchards and sandalwood groves, without the work of tending the land themselves.",
    highlightsTitle: "Project Highlights",
    highlights: [
      { title: "Resort Lifestyle", text: "Integrated luxury farm resort experience with dedicated recreation zones." },
      { title: "Boutique Community", text: "Low-density, gated enclave designed for like-minded nature enthusiasts." },
      { title: "Managed Farms", text: "Professional sandalwood & fruit tree plantation upkeep and maintenance." },
      { title: "24/7 Security", text: "Gated perimeter with round-the-clock guarding and CCTV surveillance." },
      { title: "High ROI Potential", text: "Rapidly appreciating corridor near Mysuru on the NH 275 expressway." },
      { title: "Nature Connected", text: "Surrounded by scenic green vistas, clean air, and serene landscapes." },
    ],
    amenitiesTitle: "World-Class Amenities",
    amenities: ["Swimming Pool", "Yoga Zones", "Senior Citizen Areas", "Cafes", "Underground Power & Water", "CCTV Surveillance", "Walking Paths", "Restaurant"],
    gallery: [
      images.palmSerenityView,
      images.palmSerenityHouse,
      images.palmSerenity5,
      images.palmSerenity6,
      images.palmSerenity,
      images.palmSerenity4,
      images.palmSerenity1,
      images.palmSerenity2,
      images.palmSerenity3,
    ],
    location: {
      eyebrow: "Location Advantages",
      title: "Strategic Connectivity",
      text: "Positioned in the peaceful outskirts of Mysuru with rapid connectivity to the Bangalore-Mysore expressway, heritage landmarks, and healthcare corridors.",
    },
    approvals: [{ label: "Approval Status", value: "Clear Titles & Approvals Ready" }],
    faqs: [
      {
        q: "What is Palm Serenity?",
        a: "Palm Serenity is a resort-themed farm plot development designed for people who value nature, open spaces and a more relaxed way of living. The project combines landscaped farm plots with resort-style amenities, creating a setting for leisure, family time and a closer connection to nature."
      },
      {
        q: "Where is Palm Serenity located?",
        a: "Palm Serenity Resort & Plots is located at Survey No. 233, Mysore Mahadevapura Main Road, next to Vinayaka Central School, Taripura, Karnataka - 571477."
      },
      {
        q: "What makes Palm Serenity different from a conventional plotted development?",
        a: "Palm Serenity combines farm plots with a resort-inspired environment. In addition to individual plots, the development features landscaped surroundings, coconut groves and a range of recreational and leisure amenities designed to offer a nature-led lifestyle."
      },
      {
        q: "How large is the Palm Serenity development?",
        a: "The website describes Palm Serenity as an 8-acre development, comprising 6 acres of farm plots and 2 acres allocated to resort-style amenities. The homepage also highlights plots starting from 6,000 sq. ft."
      },
      {
        q: "Who is Palm Serenity suitable for?",
        a: "Palm Serenity may appeal to families seeking a nature-oriented retreat, individuals looking for a farm plot, and buyers interested in a property they can enjoy over the long term. Buyers should verify the permitted use of the plots and their intended activities before purchasing."
      },
      {
        q: "Is Palm Serenity suitable as a weekend getaway?",
        a: "The resort-themed concept and leisure amenities may appeal to buyers looking for a weekend retreat. However, overnight stays, private construction, guest accommodation and the frequency of personal use depend on the project's approved use and applicable rules."
      },
      {
        q: "What plot sizes are available at Palm Serenity?",
        a: "The Palm Serenity website advertises farm plots starting from 6,000 sq. ft. Please contact the sales team for the available plot sizes, dimensions, locations and current inventory."
      },
      {
        q: "Can I choose my preferred plot?",
        a: "Plot selection is subject to availability. Prospective buyers can enquire about plot dimensions, location within the development and proximity to landscaped areas or amenities."
      },
      {
        q: "Are the plots surrounded by greenery?",
        a: "Palm Serenity is positioned around a nature-led setting featuring coconut groves and landscaped farm plots. The exact landscaping and planting provisions for an individual plot should be confirmed with the project team."
      },
      {
        q: "Are sandalwood trees included in the plots?",
        a: "The website describes the development as featuring premium tree species, including sandalwood. Buyers should confirm the planting specifications, number and placement of trees, maintenance arrangements and any applicable restrictions for their selected plot."
      },
      {
        q: "Can I visit my plot whenever I want?",
        a: "Access arrangements, visiting hours and any security procedures should be confirmed with the management team. Buyers should review the applicable property rules before booking."
      },
      {
        q: "Can I cultivate plants or grow trees on my plot?",
        a: "Permitted cultivation and landscaping depend on the plot's approved use, project rules, water availability and applicable regulations. Please confirm which activities are allowed before purchase."
      },
      {
        q: "Can I combine two plots or subdivide a plot?",
        a: "Combining or subdividing plots is subject to the approved layout, minimum plot-size requirements and applicable planning regulations. Written confirmation and the necessary permissions should be obtained before making any changes."
      },
      {
        q: "What amenities are available at Palm Serenity?",
        a: "The website lists a range of amenities designed around recreation, wellness and social experiences, including: Swimming pool with deck, yoga pavilion, clubhouse, hammock lawn and tropical lawn, party lawn, cascading waterfall, barbecue area, children's play area, multi-hoop basketball court, tennis facilities, bonfire area, restaurant and guest rooms, farm assistance, and 24/7 security with CCTV. Please confirm the operational status, access conditions and availability of each facility with the sales team."
      },
      {
        q: "Is there a swimming pool at Palm Serenity?",
        a: "Yes, a swimming pool with a deck is listed among the project's amenities. Please check with the management team regarding its current operational status and usage policies."
      },
      {
        q: "Does Palm Serenity have a clubhouse?",
        a: "Yes, the clubhouse is listed among the amenities. Contact the project team for details on its facilities, operating hours and access arrangements."
      },
      {
        q: "Are there facilities for children?",
        a: "The listed amenities include a children's play area. Families can enquire about the available equipment, safety provisions and operating arrangements."
      },
      {
        q: "Are there facilities for fitness and wellness?",
        a: "The project lists a yoga pavilion, swimming pool, tennis facilities and a multi-hoop basketball court. Buyers can confirm the availability, operating hours and any usage conditions for these facilities."
      },
      {
        q: "Can I host family gatherings or celebrations at Palm Serenity?",
        a: "The party lawn, barbecue area and clubhouse may support social gatherings, subject to the facilities' intended use and the management's booking policies. Please check capacity, advance booking requirements, charges and applicable restrictions."
      },
      {
        q: "Are food and accommodation facilities available?",
        a: "A restaurant and guest rooms are listed on the website. Please contact the management team to confirm whether they are operational, whether reservations are required and what charges or eligibility conditions apply."
      },
      {
        q: "Is security provided at Palm Serenity?",
        a: "The website lists 24/7 security with CCTV. Buyers should confirm the precise coverage, access-control arrangements and scope of security services with the project management team."
      },
      {
        q: "Are the amenities included in the plot purchase price?",
        a: "The website does not specify the complete commercial terms for amenity access. Please request the official cost sheet and amenity policy to understand what is included in the purchase price and whether separate membership, maintenance or usage charges apply."
      },
      {
        q: "How do I reach Palm Serenity?",
        a: "Palm Serenity is located on Mysore Mahadevapura Main Road, next to Vinayaka Central School, Taripura, Karnataka - 571477. You can use the location link on the official website to view the mapped location and plan your visit."
      },
      {
        q: "Are hospitals located near Palm Serenity?",
        a: "The website lists Manipal Hospital, Narayana Hospital and Dr. Karunakara and Nagarajegowda Multispeciality Hospital among nearby healthcare facilities. Please verify the precise distances and travel times before your visit."
      },
      {
        q: "Are schools and educational institutions nearby?",
        a: "The website identifies St. Francis School, Delhi Public School and St. Joseph's College for Women among nearby educational institutions. Buyers can check the location map and verify the nearest relevant facilities based on their requirements."
      },
      {
        q: "Are supermarkets and shopping facilities available nearby?",
        a: "The website lists Zaka World Super Market, HR Super Market and Pooja Bangle Store among nearby retail options. Actual travel distances and current operating status should be verified."
      },
      {
        q: "Are there resorts or recreational destinations nearby?",
        a: "The website lists White Orchid Resorts, Green Finch Resort and VA The Country House in the surrounding area. These may offer additional options for leisure, subject to their location and current availability."
      },
      {
        q: "Can I visit Palm Serenity before making a booking?",
        a: "Yes. Prospective buyers can contact the sales team to arrange a site visit, explore the development and learn more about plot availability, amenities and purchase terms."
      },
      {
        q: "What is the price of a plot at Palm Serenity?",
        a: "Plot prices depend on the available configuration and the project's current pricing policy. Contact the sales team for the latest price list, plot availability and applicable charges."
      },
      {
        q: "What is included in the plot price?",
        a: "The inclusions should be confirmed through the official cost sheet. Ask the sales team to clarify the plot price, development charges, applicable taxes, registration costs, maintenance deposits and any separate amenity charges."
      },
      {
        q: "What is the booking amount?",
        a: "The booking amount and payment schedule should be confirmed by the sales team. Request the applicable booking terms in writing before making a payment."
      },
      {
        q: "Can I pay in instalments?",
        a: "Please contact the sales team to learn about the available payment plans, instalment milestones and payment deadlines. Any applicable payment plan should be documented in the booking terms or sale agreement."
      },
      {
        q: "What payment methods are accepted?",
        a: "Please confirm the approved payment methods and official payment account details with the sales team. Always retain payment receipts and other transaction records."
      },
      {
        q: "Are there additional charges apart from the plot price?",
        a: "Additional charges may apply depending on the transaction and project terms. These could include stamp duty, registration fees, applicable taxes, maintenance contributions, utility connections and other disclosed charges. Request a complete written cost breakdown before booking."
      },
      {
        q: "Can I apply for a loan to purchase a Palm Serenity plot?",
        a: "Buyers may explore financing with banks or other lending institutions, subject to lender policies, property eligibility and the applicant's financial profile. Confirm whether the property and its documentation meet the requirements of your chosen lender."
      },
      {
        q: "What is the booking process?",
        a: "The booking process generally includes: 1. Contacting the sales team for project details. 2. Reviewing available plots and pricing. 3. Arranging a site visit. 4. Examining the relevant legal and approval documents. 5. Reviewing the cost sheet, booking terms and sale agreement. 6. Completing the booking formalities and making the agreed payment. 7. Completing the applicable registration and handover process. The precise process and required documentation should be confirmed by the sales team."
      },
      {
        q: "What documents do I need to book a plot?",
        a: "Commonly requested documents may include identity proof, address proof, PAN details where applicable, photographs and the completed booking application. Additional documents may be required for joint purchasers or other ownership arrangements."
      },
      {
        q: "Can I cancel my booking?",
        a: "Cancellation is subject to the booking terms, sale agreement and applicable law. Please review the cancellation conditions, any deductions and refund timelines before paying the booking amount."
      },
      {
        q: "Is Palm Serenity legally approved?",
        a: "Prospective buyers should request the relevant land-title documents, layout approvals, land-use permissions and other applicable statutory clearances from the project team. These should be independently reviewed before purchase."
      },
      {
        q: "Is Palm Serenity registered under RERA?",
        a: "Please confirm the project's applicable RERA registration status and registration number with the developer. Where registration is required, verify the details through the relevant state RERA authority before booking."
      },
      {
        q: "How can I verify the legal title of a plot?",
        a: "Request the title documents and supporting land records. An independent property lawyer should review the ownership history, registered encumbrances, applicable land-use permissions, survey details and any relevant disputes or restrictions."
      },
      {
        q: "Will I receive a registered sale deed?",
        a: "The applicable conveyance or sale deed should be completed in accordance with the transaction documents and legal requirements. Please confirm the registration process, timeline and documents to be provided to the buyer with the sales team."
      },
      {
        q: "What does farm plot ownership allow me to do?",
        a: "The permitted activities depend on the property's legal classification, approved land use, project conditions and applicable regulations. Do not assume that purchasing a farm plot automatically permits residential construction, commercial use, subdivision or agricultural activities of every kind."
      },
      {
        q: "Can I build a house or a private cottage on my plot?",
        a: "Construction rights depend on the applicable land-use classification, planning permissions, approved layout and local regulations. Obtain written confirmation from the developer and relevant authorities before purchasing if private construction is a key requirement."
      },
      {
        q: "Are there any restrictions on using or transferring my plot?",
        a: "There may be restrictions arising from applicable laws, the approved layout, the sale agreement or valid project rules. Buyers should review the governing documents to understand their rights and obligations."
      },
      {
        q: "Who will maintain the common amenities?",
        a: "Maintenance responsibility depends on the project's management arrangements and governing documents. Please confirm who manages the common areas, landscaping, security and recreational facilities, along with the associated charges."
      },
      {
        q: "Are there annual maintenance charges?",
        a: "The applicable maintenance charges, if any, should be confirmed with the sales team. Ask whether charges are annual or periodic, when they commence and which services they cover."
      },
      {
        q: "Who maintains the trees and landscaped areas?",
        a: "The website highlights landscaped plots and tree species, including sandalwood. Please confirm which landscaping services are included, whether farm assistance is available to individual plot owners and whether additional maintenance charges apply."
      },
      {
        q: "Can I sell my plot in the future?",
        a: "A plot may be transferable subject to applicable law, the sale agreement, registration requirements and any valid restrictions. Review the transfer conditions and associated costs before purchasing."
      },
      {
        q: "Can I transfer ownership to a family member?",
        a: "Ownership may be transferred or gifted subject to applicable legal and registration requirements. Stamp duty, registration fees and supporting documents may be required."
      },
      {
        q: "Will my plot appreciate in value over time?",
        a: "Property values depend on market conditions, location, infrastructure, demand and other factors. While Palm Serenity's nature-led concept may appeal to certain buyers, future appreciation is not guaranteed. Buyers should independently evaluate the investment and avoid relying on assured-return claims."
      },
      {
        q: "Is Palm Serenity suitable for long-term ownership?",
        a: "Palm Serenity may appeal to buyers looking for long-term ownership of a farm plot in a nature-oriented setting. Suitability depends on the property's legal status, permitted use, ongoing costs and the buyer's intended use."
      },
      {
        q: "How can I get the Palm Serenity brochure?",
        a: "Visit palmserenity.com and use the brochure enquiry form. You can also contact the sales team directly for project information and available plot details."
      },
      {
        q: "How can I enquire about plot availability?",
        a: "Contact the sales team using the details below to request the latest availability, plot configurations, pricing and booking information. Phone: 9187712547, +91 99010 10077. Email: sales@squaresinc.in. Project Address: Palm Serenity Resort & Plots, Survey No. 233, Mysore Mahadevapura Main Road, next to Vinayaka Central School, Taripura, Karnataka - 571477."
      },
      {
        q: "Can I arrange a guided site visit?",
        a: "Contact the sales team to arrange a visit. You can explore the property's surroundings, view the available plots, understand the amenities and discuss the purchase process with a representative."
      },
      {
        q: "How can I speak to someone about my specific requirements?",
        a: "Call the sales team or submit an enquiry through the official website. Share your preferred plot size, intended use and any questions about pricing or documentation so the team can provide relevant information."
      }
    ],
    cta: { title: "Secure Your Piece of Paradise", body: "Contact us today for exclusive pre-launch pricing and site visits.", button: "Book a Site Visit" },
  },
  {
    slug: "royal-park",
    name: "Royal Park",
    subtitle: "Prestigious Gated Plotted Development in Malasamudra, Gadag",
    tag: "RERA Approved Gated Community",
    listTag: "RERA Approved",
    listMeta: "Gadag • Gated Community",
    listText: "RERA-approved prestigious gated plotted development in Malasamudra, Gadag with 70% open green space, 9m asphalted avenues, and world-class resort amenities.",
    chips: ["70% Open Space", "9m Wide Roads", "RERA Approved"],
    meta: {
      title: "Royal Park Gadag | RERA Approved Gated Plots | Royal Infra",
      description: "RERA-approved gated plotted community in Malasamudra, Gadag: 70% open space, 9m asphalt roads, clubhouse, sports facilities and 24/7 security.",
    },
    hero: images.royalPark,
    facts: [
      { value: "Gadag", label: "Prime Location" },
      { value: "70%", label: "Open Spaces" },
      { value: "9m (30ft)", label: "Asphalt Roads" },
      { value: "RERA", label: "Government Approved" },
    ],
    overview: {
      eyebrow: "Township Overview",
      title: "Elevated Living with 70% Open Space",
      text: "Experience elevated living at Royal Park, a meticulously planned RERA-approved gated township in Malasamudra, Gadag. Designed for families seeking serenity, space, and capital appreciation, Royal Park features 70% dedicated open green spaces, wide 9-meter asphalt avenues, grand entrance architecture, and comprehensive lifestyle amenities.",
      specs: [
        { label: "RERA Registration", value: "PRM/KA/RERA/1251/446/AG/230412/003572" },
        { label: "Location", value: "Malasamudra, Gadag" },
        { label: "Infrastructure", value: "9m Asphalt Roads & Underground Utilities" },
        { label: "Open Space Ratio", value: "70% Greenery & Parks" },
      ],
    },
    whoFor: "Royal Park is designed for families seeking serenity, space, and capital appreciation in Gadag: buyers who want RERA approved plots in a gated community with 70% open green space, wide avenues and lifestyle amenities close to the medical college.",
    highlightsTitle: "Project Highlights",
    highlights: [
      { title: "70% Open Space", text: "Spacious, breathable township layout immersed in green landscapes." },
      { title: "9m Wide Roads", text: "Asphalted wide avenues designed for smooth flow and easy navigation." },
      { title: "Underground Utilities", text: "Concealed underground electricity, water, and sewage network." },
      { title: "RERA Approved", text: "100% legally clear, government approved, and bank-loan ready." },
      { title: "Prime Location", text: "Strategic positioning near Medical College & NH connectivity." },
      { title: "24/7 Gated Security", text: "Secured gated entrance with security staff and perimeter surveillance." },
    ],
    amenitiesTitle: "World-Class Amenities",
    amenities: ["Swimming Pool", "Sports Facilities", "Gymnasium", "Yoga Deck", "Jogging Track", "Walking Paths", "Children's Play Area", "Clubhouse", "Banquet Hall", "Party Lawn", "Guest Rooms", "Landscaped Gardens"],
    gallery: [
      images.royalParkView,
      images.royalParkFamilyPark,
      images.royalParkHero,
      images.royalParkMain,
      images.royalPark,
      images.royalPark6,
      images.royalPark1,
      images.royalPark2,
      images.royalPark3,
      images.royalPark5,
    ],
    location: {
      eyebrow: "Location Advantages",
      title: "Strategic Connectivity",
      figures: [
        { value: "7km", label: "from Gadag Center" },
        { value: "3km", label: "from Medical College" },
        { value: "NH", label: "Excellent Highway Access" },
      ],
    },
    approvals: [
      { label: "RERA Registration", value: "PRM/KA/RERA/1251/446/AG/230412/003572", note: "Registration can be verified on the official Karnataka RERA website." },
    ],
    faqs: [
      { q: "Is the project RERA approved?", a: "Yes, Royal Park is RERA approved under PRM/KA/RERA/1251/446/AG/230412/003572." },
      { q: "What is the open space ratio?", a: "The project boasts 70% open space for a healthy living environment." },
      { q: "Are utilities provided?", a: "Yes, we provide underground electricity and sewerage systems." },
      { q: "Is security available?", a: "We provide 24/7 robust security measures." },
      { q: "How close is it to key institutions?", a: "It is just 3km away from the prominent medical college and 7km from Gadag city center." },
    ],
    cta: { title: "Elevate Your Lifestyle", body: "Connect with us to claim your plot in Gadag's most prestigious community.", button: "Enquire Now" },
  },
  {
    slug: "dollars-colony",
    name: "Dollars Colony",
    subtitle: "Premium Plotted Development at the Scenic Gateway to Nilgiris, Gundlupet",
    tag: "Prime Plotted Community",
    listTag: "Now Open",
    listMeta: "Gundlupet • Premium Plots",
    listText: "Premium residential plotted community strategically positioned at the gateway to the Nilgiris in Gundlupet, Karnataka, offering high capital appreciation potential.",
    chips: ["Gateway to Nilgiris", "Clear Title Plots", "High Growth Zone"],
    meta: {
      title: "Dollars Colony Gundlupet | Residential Plots | Royal Infra",
      description: "Residential plots at Dollars Colony, Gundlupet, the gateway to the Nilgiris on the Mysuru to Ooty highway corridor near Bandipur and Wayanad. Clear titles.",
    },
    hero: images.dollarsColony,
    facts: [
      { value: "Gundlupet", label: "Prime Location" },
      { value: "Residential Plots", label: "Property Type" },
      { value: "Scenic Hills", label: "Environment" },
      { value: "Clear Titles", label: "Documentation" },
    ],
    overview: {
      eyebrow: "Project Overview",
      title: "High-Growth Living at the Gateway to Nilgiris",
      text: "Discover premium residential plots at Dollars Colony, strategically positioned in Gundlupet along the prominent highway junction connecting Mysore to Ooty, Wayanad, and Bandipur. Offering clear titles, wide blacktop roads, internal parks, and breathtaking views of the Nilgiri foothills, Dollars Colony is an outstanding choice for weekend homes and high-return real estate investments.",
      specs: [
        { label: "Location", value: "Gundlupet, Karnataka (NH-766 Junction)" },
        { label: "Property Type", value: "Gated Residential Plotted Development" },
        { label: "Infrastructure", value: "Asphalt Roads, Streetlights & Park" },
        { label: "Investment Potential", value: "High Tourism & Growth Corridor" },
      ],
    },
    whoFor: "Dollars Colony suits buyers looking for plots in Gundlupet for a weekend home or a long-term, high-return investment: clear titles, wide blacktop roads and internal parks, with views of the Nilgiri foothills on the road from Mysore to Ooty, Wayanad and Bandipur.",
    highlightsTitle: "Project Highlights",
    highlights: [
      { title: "High Growth Investment", text: "Situated in a rapidly developing tourism & highway corridor offering strong capital appreciation." },
      { title: "Gated Community", text: "Secure, fully planned plotted development with complete infrastructure and clear legal titles." },
      { title: "Gateway to Nilgiris", text: "Unmatched scenic beauty with instant access connecting Karnataka to Ooty and Wayanad." },
    ],
    amenitiesTitle: "Community Amenities",
    amenities: ["Wide Internal Roads", "Underground Power", "24/7 Security", "Avenue Plantations"],
    gallery: [
      images.dollarsColonyMountain,
      images.dollarsColonyPlots,
      images.dollarsColonyAerial,
      images.dollarsColonyDroneOverview,
      images.dollarsColonyMain,
      images.dollarsColony,
      images.dollarsColonySitePlots1,
      images.dollarsColonySignboard,
    ],
    location: {
      eyebrow: "Location",
      title: "Strategic Position",
      text: "Gundlupet is uniquely positioned as the vital link connecting Karnataka to the scenic Nilgiris, making it an ideal locale for future-focused real estate investments.",
    },
    approvals: [
      { label: "Documentation", value: "Clear Titles", note: "See the on-site project signboard in the gallery.", needsReview: true },
    ],
    faqs: [
      { q: "Where is Dollars Colony located?", a: "It is located in Gundlupet, famously known as the gateway to the Nilgiris." },
      { q: "What type of property is offered?", a: "We offer premium residential plots within a secure community." },
      { q: "Is this a good investment?", a: "Yes, Gundlupet is a high-growth corridor making it an excellent long-term investment." },
      { q: "How can I book a plot?", a: "You can contact our sales team to arrange a site visit and discuss booking details." },
    ],
    cta: { title: "Invest in the Future", body: "Secure your premium plot at Dollars Colony today.", button: "Contact Us" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const plotChecklist = {
  title: "What to check before buying a plot",
  note: "General guidance only, not legal advice. Ask our team for the documents for any plot you are considering.",
  items: [
    { title: "Title documents", text: "Confirm the seller's clear ownership and the chain of title for the land." },
    { title: "Encumbrance certificate", text: "Check that the property is free of loans, mortgages or legal dues." },
    { title: "Approvals", text: "Ask which approvals the layout holds and verify them with the issuing authority." },
    { title: "Registration", text: "Understand the registration process, stamp duty and the documents you will receive." },
  ],
};

export const projectsPage = {
  crumb: "Projects",
  title: "Our Premium Real Estate Projects",
  intro: "Discover curated living spaces and intelligent investments across Karnataka.",
  marquee: ["Explore", "Discover", "Invest", "Build", "Grow"],
  cta: { title: "Ready to Build Your Legacy?", body: "Connect with our experts to find the perfect property that matches your vision." },
  meta: {
    title: "Our Projects | Plotted Communities & Farmland – Royal Infra",
    description: "Explore Royal Infra's developments: Palm Serenity (Mysuru), Royal Park (Gadag) and Dollars Colony (Gundlupet). Premium amenities and clear legal titles.",
  },
};
