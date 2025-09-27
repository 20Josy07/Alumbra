import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy & Security',
};

export default function PrivacyPage() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <header className="text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Privacy & Security
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your trust is our top priority. Here's how we handle your data.
          </p>
        </header>

        <Card className="mt-12">
          <CardContent className="prose prose-lg max-w-none p-8 dark:prose-invert prose-headings:font-headline">
            <h2>Our Commitment to Your Privacy</h2>
            <p>
              Alumbra is designed with privacy as a fundamental principle. We
              understand the sensitive nature of the conversations you analyze, and
              we are committed to protecting your data and your anonymity.
            </p>

            <h3>Data You Provide</h3>
            <p>
              <strong>Conversation Text & Context:</strong> The conversation text
              and any context you provide are sent to our secure server for AI
              analysis. We do not store this information after the analysis is
              complete and the results are returned to you. Each analysis is a
              stateless transaction.
            </p>

            <h3>Data We Collect</h3>
            <p>
              <strong>Usage Analytics:</strong> We may collect anonymous usage
              data to help us improve our service. This includes information like
              feature usage frequency and performance metrics. This data is
              aggregated and cannot be used to identify you or the content of your
              analyses.
            </p>

            <h3>How We Use Your Data</h3>
            <ul>
              <li>
                <strong>To Provide the Service:</strong> Your conversation text is
                used solely to generate the AI-powered analysis you request.
              </li>
              <li>
                <strong>To Improve the Service:</strong> Anonymous, aggregated
                data helps us understand how our service is used, identify areas
                for improvement, and ensure reliability.
              </li>
            </ul>

            <h3>Data Security</h3>
            <p>
              All communication between your browser and our servers is encrypted
              using industry-standard TLS (Transport Layer Security). We employ
              best practices in cloud security to protect our infrastructure.
            </p>

            <h2>Your Control</h2>
            <p>
              You have complete control over the data you submit. Since we do not
              store your conversations, there is no data for you to request or
              delete. The optional context you provide is stored only in your
              browser's local storage, and you can clear it at any time by
              clearing your browser data.
            </p>

            <h3>Changes to This Policy</h3>
            <p>
              We may update this Privacy Policy from time to time. We will notify
              you of any significant changes by posting the new policy on this
              page.
            </p>

            <h3>Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact
              us at{' '}
              <a href="mailto:privacy@alumbra.example.com">
                privacy@alumbra.example.com
              </a>
              .
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
