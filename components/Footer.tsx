const Footer = () => {
  return (
    <footer className="mt-auto border-t border-[#e5ded8] px-6 py-6 text-sm text-[#6b5b50]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p>© 2026 Kissa Mori. All Rights Reserved.</p>

        <div className="flex gap-5">
          <a href="/privacy" className="hover:text-[#3b261c]">
            Privacy Policy
          </a>

          <a href="/terms" className="hover:text-[#3b261c]">
            Terms of Service
          </a>

          <a href="/contact" className="hover:text-[#3b261c]">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
