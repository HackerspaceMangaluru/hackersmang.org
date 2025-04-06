import "@/assets/fonts.css"
import Speakers from "../../components/eventpage/Speakers";
import Agendas from "../../components/eventpage/Agendas";
import { Metadata } from "next";
import PerformanceParticles from "@/components/magicui/performance-particles";
import Header from "@/components/hackersmang/Header";
import Intro from "@/components/eventpage/Intro";
import Venue from "@/components/eventpage/Venue";
import Register from "@/components/eventpage/Register";
import { EVENT_DETAIL, SPEAKERS } from "./constants";
import { Footer } from "@/components/hackersmang/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://hackersmang.org'),
  title: "AI TechVerse by Hackerspace Mangaluru",
  description: "AI TECHVERSE is hosted by Hackerspace Mangaluru, a community-driven open-source group based in Mangaluru, India. It's a vibrant community of tech enthusiasts that hosts tech talks, workshops, and events aimed at fostering innovation and knowledge-sharing.",
  generator: 'Hackers Mang',
  applicationName: 'Hackers Mang',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Hackers Mang', 'Open Source', 'Cloud Computing', 'DevOps', 'Testing', 'Big Data', 'Search Engines', 'RDBMS', 'NoSQL', 'NLP', 'Machine Learning', 'Artificial Intelligence', 'Deep Learning', 'Automation', 'Python', 'PHP', 'Node.js', 'Angular', 'React', 'Vue.js', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Docker', 'Kubernetes', 'SaltStack', 'Ansible', 'Linux', 'MySQL', 'PostgreSQL', 'MongoDB', 'Sphinx', 'Elasticsearch', 'Data Science', 'TensorFlow', 'PyTorch', 'Blockchain', 'Cybersecurity', 'IoT', 'Edge Computing', 'Quantum Computing', '5G', 'AR/VR', 'Robotics', 'Microservices', 'Serverless', 'GraphQL', 'Jenkins', 'Terraform', 'AWS', 'Azure', 'Google Cloud', 'CI/CD', 'Agile', 'Scrum', 'Kanban', 'JIRA', 'Git', 'GitHub', 'GitLab', 'Bitbucket', 'CI/CD', 'SaaS', 'PaaS', 'IaaS', 'Firebase', 'Heroku', 'API', 'REST', 'GraphQL', 'WebAssembly', 'Progressive Web Apps', 'Single Page Applications', 'Server-Side Rendering', 'Jamstack', 'Headless CMS', 'Contentful', 'Strapi', 'Sanity', 'Hugo', 'Jekyll', 'Gatsby', 'Next.js', 'Nuxt.js', 'Django', 'Flask', 'FastAPI', 'Spring Boot', 'Laravel', 'Ruby on Rails'
  ],
  authors: [{ name: 'Hackerspace' }, { name: 'Mangaluru', url: 'https://hackersmang.org' }],
  creator: 'Mashfooq Hussain',
  publisher: 'Hackerspace Mangaluru',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'AI TECHVERSE by Hackerspace Mangaluru',
    description: 'AI TECHVERSE is hosted by Hackerspace Mangaluru, a community-driven open-source group based in Mangaluru, India. It\'s a vibrant community of tech enthusiasts that hosts tech talks, workshops, and events aimed at fostering innovation and knowledge-sharing.',
    url: 'https://hackersmang.org/ai-techverse',
    siteName: 'Hackerspace Mangaluru',
    images: [
      {
        url: 'https://hackersmang.org/ai-techverse/cards/hero-card.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://hackersmang.org/ai-techverse/cards/hero-card.png',
        width: 1800,
        height: 1600,
        alt: 'AI TECHVERSE',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI TECHVERSE by Hackerspace Mangaluru',
    description: 'AI TECHVERSE is hosted by Hackerspace Mangaluru, a community-driven open-source group based in Mangaluru, India.',
    images: 'https://hackersmang.org/ai-techverse/cards/hero-card.png'
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  bookmarks: ['https://hackersmang.org/ai-techverse'],
  category: 'technology',
};

function page() {
  // Extract the registration link from the first track for backward compatibility
  const registrationLink = EVENT_DETAIL.tracks?.[0]?.registrationLink || null;

  return (
    <main className="relative bg-grainy outfit-extra-light">
      <PerformanceParticles />
      <div className="relative z-10">
        <Header />
        <Intro title={EVENT_DETAIL.title} subtitle={EVENT_DETAIL.subtitle} />
        <Venue happeningOn={EVENT_DETAIL.happeningOn} locationName={EVENT_DETAIL.locationName} locationUrl={EVENT_DETAIL.locationUrl} />
        
        <Agendas speakers={SPEAKERS} />
        <Speakers speakers={SPEAKERS} />

        <Register 
          registrationLink={registrationLink} 
          registrationStartOn={EVENT_DETAIL.registrationStartOn} 
          registrationEndOn={EVENT_DETAIL.registrationEndOn} 
        />
        <Footer />
      </div>
    </main>
  );
}

export default page