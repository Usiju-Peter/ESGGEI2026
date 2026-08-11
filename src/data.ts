import { 
  BookOpen, 
  Leaf, 
  Users, 
  Heart, 
  Globe, 
  Activity, 
  GraduationCap,
  Briefcase,
  Gift,
  Building,
  ShieldAlert,
  Calendar,
  HandHeart
} from "lucide-react";

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Team", href: "/team" },
];

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/outreach-01.webp", alt: "EarthSprings integrated agriculture and medical outreach banner", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-02.webp", alt: "EarthSprings volunteers registering community members", width: 1200, height: 2133 },
  { src: "/images/gallery/outreach-03.webp", alt: "Community members waiting to register at the outreach", width: 1200, height: 900 },
  { src: "/images/gallery/outreach-04.webp", alt: "Medical team providing health screening at the outreach", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-05.webp", alt: "Health worker recording information during a community screening", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-06.webp", alt: "Volunteers preparing medical supplies for community care", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-07.webp", alt: "EarthSprings volunteer speaking with a community member", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-08.webp", alt: "Outreach registration and consultation under a community canopy", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-09.webp", alt: "Health worker performing a finger-prick test", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-10.webp", alt: "Volunteers completing outreach registration forms", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-11.webp", alt: "Health worker checking a community member's blood pressure", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-12.webp", alt: "Health worker checking a patient's blood pressure", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-13.webp", alt: "Outreach team preparing medicines and health supplies", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-14.webp", alt: "Community members gathered for outreach registration", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-15.webp", alt: "Outreach volunteers distributing health supplies", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-16.webp", alt: "Health worker taking a community member's blood pressure", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-17.webp", alt: "Volunteer assisting a child during the outreach", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-18.webp", alt: "Community members seated together at the outreach", width: 1200, height: 900 },
  { src: "/images/gallery/outreach-19.webp", alt: "Health worker administering care for children", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-20.webp", alt: "Volunteer providing medicine to a child", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-21.webp", alt: "Community leader speaking at the EarthSprings outreach", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-22.webp", alt: "EarthSprings representative speaking to the community", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-23.webp", alt: "Community representative addressing outreach participants", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-24.webp", alt: "Community members gathered beneath the outreach canopy", width: 1200, height: 900 },
  { src: "/images/gallery/outreach-25.webp", alt: "EarthSprings team and community leaders at the outreach", width: 1200, height: 900 },
  { src: "/images/gallery/outreach-26.webp", alt: "EarthSprings team with community leaders beside an outreach celebration cake", width: 1200, height: 900 },
  { src: "/images/gallery/outreach-27.webp", alt: "EarthSprings representative with an outreach celebration cake", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-28.webp", alt: "Community group photo at the outreach", width: 1200, height: 1600 },
  { src: "/images/gallery/outreach-29.webp", alt: "EarthSprings team and community members seated together", width: 1200, height: 900 },
];

export const projectsData = [
  {
    id: "education",
    title: "Educational Sponsorships and Back-to-School Campaigns",
    description: "Reintegrating out-of-school children back into formal education with scholarships and learning support.",
    icon: BookOpen,
    shortDescription: "Reintegrating out-of-school children back into formal education.",
    href: "/projects#education",
    keyActivities: [
      "Reintegrating out-of-school children back into formal education",
      "Adult literacy programs in rural and low-income areas",
      "Scholarships, educational supplies, and mentorship",
      "Community libraries and learning support"
    ],
    supports: "Out-of-school children, adult learners, rural communities.",
    expectedImpact: "Increased literacy rates and access to quality education.",
    image: "https://i.postimg.cc/SsKV6WTb/Dubourthoumieu.jpg"
  },
  {
    id: "agriculture",
    title: "Women and Youth Agricultural Training",
    description: "Training in sustainable farming practices to improve smallholder productivity and income.",
    icon: Leaf,
    shortDescription: "Training and support in sustainable agricultural practices.",
    href: "/projects#agriculture",
    keyActivities: [
      "Training women, youth, and widows in sustainable farming practices",
      "Promoting community-based farming and agribusiness",
      "Supporting access to tools, seeds, and agricultural marketing",
      "Helping smallholder farmers improve productivity and income"
    ],
    supports: "Women, youth, smallholder farmers, and widows.",
    expectedImpact: "Improved crop yields, sustainable agribusiness, and economic empowerment.",
    image: "https://i.postimg.cc/mgBF0TQ0/Millions-of-women-around-the-world-work-growing.jpg"
  },
  {
    id: "women-empowerment",
    title: "Gender Advocacy and Girl Child Protection",
    description: "Promoting girl child education and combating gender-based violence.",
    icon: Users,
    shortDescription: "Promoting girl child education and gender equity.",
    href: "/projects#women-empowerment",
    keyActivities: [
      "Promoting girl child education and advocacy",
      "Combating gender-based violence through awareness and support",
      "Offering skills acquisition and economic empowerment for women",
      "Supporting self-reliance and dignity"
    ],
    supports: "Women, girls, and communities.",
    expectedImpact: "Reduced gender inequality and enhanced economic independence for women.",
    image: "https://i.postimg.cc/8CrD46j4/623326404723130922.jpg"
  }
];

export const teamData = [
  {
    id: "pearl",
    name: "Pearl Chukwuka",
    role: "Founder and Managing Director/CEO, ESGGEI",
    shortBio: "A results-driven educator, administrator, and social entrepreneur with over 20 years of experience delivering sustainable impact across education, agribusiness, and nonprofit leadership in Nigeria.",
    fullBio: `Pearl Chukwuka is a results-driven educator, administrator, and social entrepreneur with over 20 years of experience delivering sustainable impact across education, agribusiness, and nonprofit leadership in Nigeria.
    
She currently serves as National Secretary of a prominent literacy-focused non-governmental organization, where she coordinates national operations, forges strategic partnerships, and leads the design and rollout of outreach programs that expand literacy and educational access to thousands of underserved children and adults across Nigeria.

As Founder and Managing Director/CEO of EarthSprings Global Grace Empowerment Initiative, Pearl provides visionary leadership for a social enterprise dedicated to transforming the lives of smallholder farmers. Drawing on her hands-on agribusiness expertise, she drives initiatives that improve agricultural productivity, introduce sustainable practices, and restore economic dignity to rural communities facing low yields and limited resources.

Her entrepreneurial track record includes successfully founding and managing Earth Springs Farm, where she built and led teams, implemented productivity-enhancing strategies, and demonstrated scalable models for sustainable agriculture.

Pearl began her career teaching at Nigerian Air Force Primary and Secondary Schools, where she inspired students through engaging instruction, mentorship, and holistic development programs. She holds a Master’s degree in Educational Planning and Administration, complemented by qualifications in Education and Sociology.

Deeply committed to the belief that quality education and sustainable livelihoods are powerful catalysts for national development, Pearl continues to bridge grassroots action with strategic leadership to create lasting, measurable transformation in Nigeria.`,
    image: "https://i.postimg.cc/xdG7Npbx/IMG-20260612-WA0097.jpg",
  },
  {
    id: "kelvin",
    name: "Iduemre Kesiena Kelvin",
    role: "Agriculture and Agronomy Lead / Agronomist",
    shortBio: "An experienced agronomist, facilitator, and greenhouse specialist with hands-on expertise in sustainable crop production, farm management, agribusiness training, and modern agriculture.",
    fullBio: `Iduemre Kesiena Kelvin is an experienced agronomist, facilitator, and greenhouse specialist with over five years of hands-on expertise in sustainable crop production and farm management. With a B.Sc. degree in Plant Science and Biotechnology and published research focused on soil remediation, he brings a strong scientific and data-driven approach to modern agriculture, particularly in commercial crop production and floriculture.

He has a proven track record in designing and delivering impactful agribusiness training programs tailored to diverse audiences, including military officers, paramilitary personnel, and civilians. His work effectively bridges the gap between technical plant science and practical, income-generating agricultural ventures.

Kelvin’s professional background spans the full spectrum of greenhouse and open field operations from seedling propagation and transplanting to integrated pest management and harvesting systems.

He also leverages digital tools and data management practices to improve farm efficiency and decision-making.

At the Nigerian Armed Forces Resettlement Centre, Oshodi, Lagos, he has successfully led daily farm operations, overseeing activities from nursery development to large-scale harvest logistics, demonstrating strong leadership, organizational, and technical capabilities in dynamic agricultural environments.`,
    image: "https://i.postimg.cc/bNM47thb/IMG-20260612-WA0099.jpg",
  },
  {
    id: "samuel",
    name: "Samuel Chukwuka",
    role: "ESGGEI Leadership Team",
    shortBio: "Committed to advancing ESGGEI’s mission through service, community engagement, and sustainable development.",
    fullBio: "Committed to advancing ESGGEI’s mission through service, community engagement, and sustainable development. Works closely with field operatives and partners to ensure project successful delivery and impact continuity.",
    image: "https://i.postimg.cc/90QvhP0n/IMG-20260612-WA0098.jpg",
  }
];

export const impactData = [
  { value: "1,000+", label: "Lives Reached" },
  { value: "25+", label: "Communities Supported" },
  { value: "50+", label: "Outreach Activities" },
  { value: "7", label: "Core Program Areas" },
];

export const partnerOptionsData = [
  {
    title: "Impact Contributor",
    description: "An ESGGEI Impact Contributor is a philanthropic individual or corporate body who commits monthly to support our vision of empowering every child, woman, and vulnerable life.",
    icon: HandHeart
  },
  {
    title: "CSR Partnership",
    description: "EarthSprings partners with corporations to create opportunities for a better future and contribute to sustainable development for children, youth, women, widows, farmers, and marginalized communities.",
    icon: Building
  },
  {
    title: "Internship Opportunities",
    description: "ESGGEI provides a platform where organizations can support youth employability and entrepreneurship through mentoring, soft and technical skills training, and first work experiences.",
    icon: Briefcase
  },
  {
    title: "Emergency Support",
    description: "Partner with ESGGEI to provide critical aid and support to marginalized children and families facing conflict, emergencies, and difficult living conditions in Nigeria.",
    icon: ShieldAlert
  },
  {
    title: "Product Partnership",
    description: "Corporates can donate products or commit a percentage of sales or profits from select items to support ESGGEI’s mission.",
    icon: Gift
  },
  {
    title: "Event Partnership",
    description: "Organizations and individuals can name ESGGEI as their preferred NGO partner for corporate or private events to showcase meaningful social impact.",
    icon: Calendar
  }
];
