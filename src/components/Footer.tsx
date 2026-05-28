import Logo from "./Logo";

export default function Footer() {
  const footerData = [
    {
      title: 'Discover',
      links: [
        { name: 'Incoming events', href: '#' },
        { name: 'Concerts', href: '#' },
        { name: 'Sports', href: '#' },
        { name: 'Theatre & arts', href: '#' },
        { name: 'Festivals', href: '#' },
      ],
    },
    {
      title: 'For business',
      links: [
        { name: 'Become a partner', href: '#' },
        { name: 'Pricing and fees', href: '#' },
        { name: 'Advertise with us', href: '#' },
        { name: 'Corporate packages', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help center', href: '#' },
        { name: 'FAQs', href: '#' },
        { name: 'Refund policy', href: '#' },
        { name: 'Seller guidelines', href: '#' },
        { name: 'Report a problem', href: '#' },
      ],
    }
  ]

  return (
    <footer className="bg-zinc-900 py-2 px-8 text-center text-sm text-white flex-wrap mt-auto">
      <div className="mt-4 flex flex-wrap justify-around gap-16 max-w-fit items-stretch mx-auto">
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
                  <a href={link.href} className="text-sm">
                    {link.name}
                  </a>
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
