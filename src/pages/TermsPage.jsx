
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';

const TermsPage = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="prose prose-green max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p>
                Welcome to Mushroom SafeGuard. These terms and conditions govern your use of our website and services. 
                By accessing or using our services, you agree to be bound by these terms.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">2. Mushroom Identification Disclaimer</h2>
              <p className="mb-4">
                <strong>IMPORTANT SAFETY NOTICE:</strong> While our AI technology strives for accuracy, never rely solely on this app for mushroom consumption decisions. 
                Always consult with professional mycologists or field guides to confirm any identification. Many mushrooms have 
                poisonous look-alikes, and consumption of misidentified mushrooms can be fatal.
              </p>
              <p>
                Our mushroom identification service is provided for informational and educational purposes only. 
                We do not guarantee the accuracy of identifications, and you agree to use these identifications at your own risk.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
              <p className="mb-4">
                When you create an account with us, you must provide accurate, complete, and up-to-date information. 
                You are responsible for safeguarding your password and for all activities that occur under your account.
              </p>
              <p>
                We reserve the right to disable any user account if, in our opinion, you have violated any provisions of these terms.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">4. User Content</h2>
              <p className="mb-4">
                Our service allows you to upload, submit, store, and share content, including mushroom images and feedback. 
                You retain all ownership rights to your content, but you grant us a license to use, reproduce, modify, and display 
                such content in connection with our services.
              </p>
              <p>
                You represent and warrant that you own or have the necessary rights to your content and that it does not 
                violate the rights of any third party.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">5. Prohibited Activities</h2>
              <p className="mb-4">
                You agree not to engage in any of the following activities:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Using our services for any illegal purpose.</li>
                <li>Attempting to bypass or compromise any security measures.</li>
                <li>Uploading false, misleading, or deliberately dangerous content.</li>
                <li>Impersonating others or providing false information.</li>
                <li>Using our services to distribute unsolicited promotional content.</li>
                <li>Interfering with the proper functioning of our services.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, 
                or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">7. Changes to Terms</h2>
              <p>
                We may revise these terms from time to time. The most current version will always be on this page. 
                If the revision, in our sole discretion, is material, we will notify you via email or through our services.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
              <p>
                If you have any questions about these terms, please contact us through 
                our <a href="/contact" className="text-mushroom-primary hover:underline">Contact Page</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TermsPage;
