import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-12 animate-fade-in">
      <div className="container px-4 md:px-6 animate-slide-up">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-fade-in" style={{animationDelay: "0.2s"}}>
          <div className="animate-slide-right" style={{animationDelay: "0.1s"}}>
            <h3 className="text-lg font-bold mb-4 font-poppins">RideSmarter</h3>
            <p className="text-neutral-400 text-sm">
              Your reliable ride booking service in Frankfurt and across Germany.
            </p>
          </div>
          <div className="animate-slide-right" style={{animationDelay: "0.2s"}}>
            <h4 className="text-sm font-semibold mb-4 font-poppins">Services</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/services/city" className="hover:text-white transition-colors">
                  City Rides
                </Link>
              </li>
              <li>
                <Link href="/services/intercity" className="hover:text-white transition-colors">
                  Intercity Travel
                </Link>
              </li>
              <li>
                <Link href="/services/airport" className="hover:text-white transition-colors">
                  Airport Transfers
                </Link>
              </li>
            </ul>
          </div>
          <div className="animate-slide-right" style={{animationDelay: "0.3s"}}>
            <h4 className="text-sm font-semibold mb-4 font-poppins">Company</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className="animate-slide-right" style={{animationDelay: "0.4s"}}>
            <h4 className="text-sm font-semibold mb-4 font-poppins">Legal</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in" style={{animationDelay: "0.5s"}}>
          <p className="text-xs text-neutral-400 font-montserrat">
            &copy; {new Date().getFullYear()} RideSmarter. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 animate-slide-left">
            <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
              <span className="sr-only">Facebook</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Link>
            <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Link>
            <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
              <span className="sr-only">Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}