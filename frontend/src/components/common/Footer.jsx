function Footer() {
  return (
    <div className="container-fluid border-top mt-3">
      <footer className="container">
        <footer className="row py-5 my-3">
          <div className="col-md-2 col-sm-12">
            <div className="navbar-brand ">
              Browse<span>Bay</span>
            </div>
            <p className="text-muted">Copyright © 2023, All rights reserved.</p>
          </div>

          <div className="col col-md-2 col-sm-12"></div>

          <div className=" col-md-2 col-sm-12">
            <h5>Help</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-muted">Track Your Order</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-muted">Features</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-muted">Pricing</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-muted">FAQs</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-muted">About</a>
              </li>
            </ul>
          </div>

          <div className="col-md-2 col-sm-12">
            <h5>Sitemap</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-muted">Home</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-muted">Categories</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-muted">Cart</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-muted">Orders</a>
              </li>
            </ul>
          </div>

          <div className="col-md-2 col-sm-12">
            <h5>Follow Us</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-muted">Facebook</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-muted">Instagram</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-muted">Twitter</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-muted">Pinterest</a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-muted">Youtube</a>
              </li>
            </ul>
          </div>
        </footer>
      </footer>
    </div>
  );
}

export default Footer;
