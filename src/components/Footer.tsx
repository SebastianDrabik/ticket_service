import { Link } from "@tanstack/react-router";
import Logo from "./Logo";

export default function Footer() {
  const footerData: { title: string; links: { name: string; destination: string  }[] }[] = [
    {
      title: 'Discover',
      links: [
        { name: 'Incoming events', destination: '#' },
        { name: 'Concerts', destination: '#' },
        { name: 'Sports', destination: '#' },
        { name: 'Theatre & arts', destination: '#' },
        { name: 'Festivals', destination: '#' },
      ],
    },
    {
      title: 'For business',
      links: [
        { name: 'Become a partner', destination: '/business/create' },
        { name: 'Pricing and fees', destination: '#' },
        { name: 'Advertise with us', destination: '#' },
        { name: 'Corporate packages', destination: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help center', destination: '#' },
        { name: 'FAQs', destination: '#' },
        { name: 'Refund policy', destination: '#' },
        { name: 'Seller guidelines', destination: '#' },
        { name: 'Report a problem', destination: '#' },
      ],
    }
  ]

  return (
    <footer className="bg-zinc-900 py-2 px-8 text-center text-sm text-white flex-wrap mt-auto">
      <div className="mt-4 flex flex-wrap justify-around gap-16 items-stretch mx-auto">
        <div className="flex flex-col items-start justify-start h-full mr-15">
          <Logo />
          <p className="text-sm text-left mt-2 wrap-normal w-60 text-muted-foreground">The easiest way to buy and sell tickets for concerts, sports, theatre, and more. Secure. Instant. No hidden fees.</p>
        </div>
        {footerData.map((section) => (
          <div key={section.title} className="flex flex-col">
            <h3 className="mb-2 text-muted-foreground font-semibold uppercase text-center">{section.title}</h3>
            <ul className="text-start">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link to={link.destination} className="text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-muted-foreground mt-8">&copy; 2026 Sebastian Drabik. All rights reserved.</p>
    </footer>
  )
}
