import { Metadata } from "next";
import Link from "next/link";
import { Cookie, Shield, BarChart3, Settings, Target } from "lucide-react";
import { COMPANY_INFO, APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookie Policy for ${APP_NAME}. Learn how we use cookies and similar technologies.`,
};

export default function CookiePolicyPage() {
  const lastUpdated = "January 15, 2025";

  return (
    <main className="pt-20 pb-16">
      {/* Header */}
      <section className="py-12 lg:py-16 border-b border-border bg-gradient-to-b from-gold-300/5 to-transparent">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                <Cookie className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">Cookie Policy</h1>
                <p className="text-muted-foreground text-sm mt-1">Last updated: {lastUpdated}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="glass-card p-6 lg:p-8 mb-8">
              <p className="text-lg text-foreground/80 leading-relaxed">
                This Cookie Policy explains how {APP_NAME} uses cookies and similar tracking technologies when you visit our website.
              </p>
            </div>

            {/* Cookie Types Overview */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              <CookieTypeCard icon={Shield} title="Essential" description="Required for basic functionality" color="green" />
              <CookieTypeCard icon={BarChart3} title="Analytics" description="Help us improve our site" color="blue" />
              <CookieTypeCard icon={Settings} title="Functional" description="Remember your preferences" color="purple" />
              <CookieTypeCard icon={Target} title="Marketing" description="Personalized advertising" color="orange" />
            </div>

            {/* Sections */}
            <div className="space-y-10">
              <Section title="1. What Are Cookies?">
                <p>
                  Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                </p>
              </Section>

              <Section title="2. Types of Cookies We Use">
                <Subsection title="2.1 Essential Cookies">
                  <p>
                    These cookies are necessary for the website to function properly. They enable core functionality such as security, account authentication, and session management. You cannot opt out of these cookies.
                  </p>
                  <CookieTable cookies={[
                    { name: "session_id", purpose: "User authentication", duration: "Session" },
                    { name: "csrf_token", purpose: "Security protection", duration: "Session" },
                    { name: "theme", purpose: "Theme preference", duration: "1 year" },
                  ]} />
                </Subsection>

                <Subsection title="2.2 Analytics Cookies">
                  <p>
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                  </p>
                  <CookieTable cookies={[
                    { name: "_ga", purpose: "Google Analytics - User identification", duration: "2 years" },
                    { name: "_gid", purpose: "Google Analytics - Session identification", duration: "24 hours" },
                    { name: "_gat", purpose: "Google Analytics - Rate limiting", duration: "1 minute" },
                  ]} />
                </Subsection>

                <Subsection title="2.3 Functional Cookies">
                  <p>
                    These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
                  </p>
                  <CookieTable cookies={[
                    { name: "language", purpose: "Language preference", duration: "1 year" },
                    { name: "currency", purpose: "Currency preference", duration: "1 year" },
                    { name: "recent_views", purpose: "Recently viewed challenges", duration: "30 days" },
                  ]} />
                </Subsection>

                <Subsection title="2.4 Marketing Cookies">
                  <p>
                    These cookies are used to track visitors across websites to display relevant advertisements. They are set by our advertising partners.
                  </p>
                  <CookieTable cookies={[
                    { name: "_fbp", purpose: "Facebook Pixel", duration: "3 months" },
                    { name: "_gcl_au", purpose: "Google Ads conversion tracking", duration: "3 months" },
                  ]} />
                </Subsection>
              </Section>

              <Section title="3. Third-Party Cookies">
                <p>In addition to our own cookies, we may also use various third-party cookies for the following purposes:</p>
                <ul>
                  <li><strong>Payment Processing:</strong> Stripe and other payment providers use cookies for fraud detection and secure transactions.</li>
                  <li><strong>Customer Support:</strong> Our live chat widget may set cookies to maintain support sessions.</li>
                  <li><strong>Social Media:</strong> If you share content on social media, those platforms may set cookies.</li>
                </ul>
              </Section>

              <Section title="4. Managing Cookies">
                <Subsection title="4.1 Browser Settings">
                  <p>
                    Most browsers allow you to control cookies through their settings. You can typically find these in the &quot;Options&quot; or &quot;Preferences&quot; menu. Here are links to instructions for common browsers:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mt-4">
                    <BrowserLink name="Google Chrome" href="https://support.google.com/chrome/answer/95647" />
                    <BrowserLink name="Mozilla Firefox" href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" />
                    <BrowserLink name="Safari" href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" />
                    <BrowserLink name="Microsoft Edge" href="https://support.microsoft.com/en-us/help/4027947/microsoft-edge-delete-cookies" />
                  </div>
                </Subsection>

                <Subsection title="4.2 Opt-Out Tools">
                  <p>You can opt out of certain third-party cookies using these tools:</p>
                  <div className="grid sm:grid-cols-2 gap-3 mt-4">
                    <BrowserLink name="Google Analytics Opt-Out" href="https://tools.google.com/dlpage/gaoptout" />
                    <BrowserLink name="Facebook Ad Preferences" href="https://www.facebook.com/settings/?tab=ads" />
                    <BrowserLink name="Your Online Choices (EU)" href="https://www.youronlinechoices.com" />
                  </div>
                </Subsection>
              </Section>

              <Section title="5. Impact of Disabling Cookies">
                <p>Please note that if you disable or refuse cookies, some parts of our website may become inaccessible or not function properly. For example:</p>
                <ul>
                  <li>You may not be able to log into your account</li>
                  <li>Your preferences may not be saved</li>
                  <li>Some features may not work as expected</li>
                </ul>
              </Section>

              <Section title="6. Updates to This Policy">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. We will post any changes on this page and update the &quot;Last updated&quot; date.
                </p>
              </Section>

              <Section title="7. Contact Us">
                <p>If you have questions about our use of cookies, please contact us:</p>
                <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="font-semibold text-foreground">{COMPANY_INFO.name}</p>
                  <p className="text-muted-foreground">Email: {COMPANY_INFO.support_email}</p>
                </div>
              </Section>
            </div>

            {/* Footer Note */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                For more information about how we handle your data, please see our{" "}
                <Link href="/privacy" className="text-gold-500 hover:text-gold-400 underline underline-offset-2">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl lg:text-2xl font-bold text-foreground border-l-4 border-gold-500 pl-4">
        {title}
      </h2>
      <div className="space-y-4 text-foreground/70 leading-relaxed pl-5 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul>li]:text-foreground/70">
        {children}
      </div>
    </div>
  );
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3 mt-6">
      <h3 className="text-lg font-semibold text-foreground/90">{title}</h3>
      <div className="space-y-3 text-foreground/70 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function CookieTypeCard({ icon: Icon, title, description, color }: { icon: React.ElementType; title: string; description: string; color: string }) {
  const colorClasses: Record<string, string> = {
    green: "bg-green-500/10 text-green-500 border-green-500/20",
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    orange: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  };

  return (
    <div className={`p-4 rounded-xl border ${colorClasses[color]}`}>
      <Icon className="w-6 h-6 mb-3" />
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function CookieTable({ cookies }: { cookies: { name: string; purpose: string; duration: string }[] }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-muted/50">
            <th className="text-left p-3 font-semibold text-foreground border-b border-border">Cookie</th>
            <th className="text-left p-3 font-semibold text-foreground border-b border-border">Purpose</th>
            <th className="text-left p-3 font-semibold text-foreground border-b border-border">Duration</th>
          </tr>
        </thead>
        <tbody>
          {cookies.map((cookie, index) => (
            <tr key={cookie.name} className={index % 2 === 0 ? "bg-transparent" : "bg-muted/20"}>
              <td className="p-3 text-foreground/70 font-mono text-xs">{cookie.name}</td>
              <td className="p-3 text-foreground/70">{cookie.purpose}</td>
              <td className="p-3 text-foreground/70">{cookie.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BrowserLink({ name, href }: { name: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 hover:border-gold-500/30 transition-colors text-sm"
    >
      <span className="text-foreground">{name}</span>
      <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}
