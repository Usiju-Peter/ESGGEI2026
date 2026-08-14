export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; src: string; alt: string; width: number; height: number };

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  heroWidth: number;
  heroHeight: number;
  publishedDate: string;
  content: BlogContentBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "from-purpose-to-action",
    category: "Our Story",
    title: "From Purpose to Action: The Story Behind EarthSprings",
    excerpt:
      "EarthSprings Global Grace Empowerment Initiative was created around a simple conviction: practical support, rooted in dignity, can help communities create lasting possibilities.",
    description:
      "Learn how EarthSprings Global Grace Empowerment Initiative connects education, sustainable agriculture, literacy, advocacy, and social support in its work with underserved communities.",
    heroImage: "/images/gallery/outreach-25.webp",
    heroAlt: "EarthSprings team and community leaders at an outreach gathering",
    heroWidth: 1200,
    heroHeight: 900,
    publishedDate: "2026-08-14",
    content: [
      {
        type: "paragraph",
        text:
          "Across rural and low-income communities, many people carry the determination to build a better future while facing barriers that make that work harder: limited access to education, low agricultural productivity, economic uncertainty, scarce resources, and social exclusion. These are not isolated concerns. They meet in everyday life, shaping what children can learn, how families earn, and whose opportunities are too often left behind.",
      },
      {
        type: "paragraph",
        text:
          "EarthSprings Global Grace Empowerment Initiative (ESGGEI) exists to respond to those realities with practical, compassionate, and sustainable interventions. Our work is guided by a belief that support should not be reduced to a single moment of help. It should create room for people and communities to grow in knowledge, confidence, resilience, and self-reliance.",
      },
      { type: "heading", text: "Why we exist" },
      {
        type: "paragraph",
        text:
          "EarthSprings is a non-profit, non-governmental organization focused on vulnerable and marginalized populations. The organization brings together education, agriculture, literacy, advocacy, and social support because the challenges communities face are connected. A child kept out of school, a smallholder farmer working with limited resources, a woman seeking economic independence, and an older person needing social support may require different forms of care, but each deserves a future shaped by dignity and possibility.",
      },
      {
        type: "paragraph",
        text:
          "That is why our mission centres on empowering individuals and communities through education, agriculture, literacy, advocacy, and social support, with particular attention to children, women, widows, and the aged. It is a commitment to work alongside people whose needs are often overlooked, and to keep practical opportunity at the centre of every programme.",
      },
      { type: "heading", text: "What we believe" },
      {
        type: "paragraph",
        text:
          "Our vision is of a society where every child learns, every woman thrives, and every vulnerable life is empowered to reach its full potential. It is not a promise that change comes easily. It is a direction: toward communities where learning is accessible, livelihoods can be strengthened, and people have more agency over the choices in front of them.",
      },
      {
        type: "paragraph",
        text:
          "For EarthSprings, lasting change is rooted in respect. It means seeing people as participants in their own futures, not as problems to be solved. It means pairing compassion with useful tools, relevant knowledge, and long-term thinking. It also means recognising that education, sustainable livelihoods, gender equity, and social welfare are strongest when they reinforce one another.",
      },
      {
        type: "image",
        src: "/images/gallery/outreach-13.webp",
        alt: "EarthSprings outreach team preparing health supplies with community volunteers",
        width: 1200,
        height: 1600,
      },
      { type: "heading", text: "Turning purpose into action" },
      {
        type: "paragraph",
        text:
          "The organisation's programmes put that approach into practice. Educational sponsorships and back-to-school campaigns are designed to help reintegrate out-of-school children into formal education, while adult literacy, scholarships, learning supplies, mentorship, and community learning support address other barriers to participation. Education matters not only as a classroom goal, but as a foundation for wider opportunity.",
      },
      {
        type: "paragraph",
        text:
          "In agriculture, EarthSprings focuses on training women, youth, widows, and smallholder farmers in sustainable practices. The work includes community-based farming and agribusiness, as well as support around tools, seeds, and agricultural marketing. The aim is to strengthen productivity and income while treating sustainable farming as both a livelihood and a community resource.",
      },
      {
        type: "paragraph",
        text:
          "Gender advocacy and girl-child protection are another part of the picture. Through advocacy, awareness around gender-based violence, skills acquisition, and economic empowerment, EarthSprings supports greater self-reliance and dignity for women and girls. Alongside these areas, targeted social support responds to the well-being of children, widows, older people, and others whose circumstances call for care and inclusion.",
      },
      { type: "heading", text: "More than a single project" },
      {
        type: "paragraph",
        text:
          "No single project can carry the full weight of community development. That is why ESGGEI's work is shaped by connected programmes rather than one narrow solution. Education can widen a child's future. Agricultural knowledge can support a household's livelihood. Advocacy can help protect rights and create space for participation. Social support can help people meet immediate pressures while remaining connected to their community.",
      },
      {
        type: "paragraph",
        text:
          "This approach calls for consistency and community involvement. It asks us to think beyond quick fixes and to keep learning from the realities people face. The work is practical by design: support should be useful, accessible, and connected to the lives people are already building.",
      },
      {
        type: "paragraph",
        text:
          "It also makes room for collaboration. EarthSprings invites individuals, organisations, and corporate partners to contribute through shared expertise, resources, advocacy, and support for opportunities that serve children, youth, women, farmers, widows, and other marginalised groups. Partnership is meaningful when it stays connected to the purpose of the work and the people it is intended to serve.",
      },
      {
        type: "image",
        src: "/images/gallery/outreach-28.webp",
        alt: "Community members gathered together during an EarthSprings outreach",
        width: 1200,
        height: 1600,
      },
      { type: "heading", text: "Looking ahead" },
      {
        type: "paragraph",
        text:
          "EarthSprings will continue to pursue its mission with the same focus: helping people access learning, sustainable livelihoods, advocacy, and support that restores dignity. There is still much to learn and much work to do. This first story is an invitation to follow that work more closely, understand the purpose behind it, and see how practical action can be shaped by care for people and their communities.",
      },
    ],
  },
];

export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);

export const formatPublishedDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );

export const getReadingTime = (post: BlogPost) => {
  const wordCount = post.content
    .filter((block): block is Extract<BlogContentBlock, { type: "paragraph" }> => block.type === "paragraph")
    .reduce((count, block) => count + block.text.trim().split(/\s+/).length, 0);

  return Math.max(1, Math.ceil(wordCount / 220));
};
