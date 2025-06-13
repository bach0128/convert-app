function Footer() {
  const contentFooter = import.meta.env.VITE_FOOTER_CONTENT;

  return (
    <footer
      className="py-2 bg-white z-10 border-t border-gray-300 sticky bottom-0"
      style={{ height: "var(--height-footer)" }}
    >
      <p className="text-center text-gray-500 text-xs">{contentFooter}</p>
    </footer>
  );
}

export default Footer;
