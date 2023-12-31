const Footer = () => {
  return (
    <footer className='footer text-secondary p-10 bg-white'>
      <div>
        <span className='footer-title text-black'>Services</span>
        <a className='link link-hover'>Branding</a>
        <a className='link link-hover'>Design</a>
        <a className='link link-hover'>Marketing</a>
        <a className='link link-hover'>Advertisement</a>
      </div>
      <div>
        <span className='footer-title text-black'>Company</span>
        <a className='link link-hover'>About us</a>
        <a className='link link-hover'>Contact</a>
        <a className='link link-hover'>Jobs</a>
        <a className='link link-hover'>Press kit</a>
      </div>
      <div>
        <span className='footer-title text-black'>Legal</span>
        <a className='link link-hover'>Terms of use</a>
        <a className='link link-hover'>Privacy policy</a>
        <a className='link link-hover'>Cookie policy</a>
      </div>
    </footer>
  )
}

export default Footer
