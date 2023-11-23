import "./NotFoundPage.css";
import Navbar from "./NavbarComponent";

export default function NotFound() {
  return (
    <>
      <Navbar></Navbar>
      <div className="container-NotFound">
      <h1 className="title">NotFound (404 Page NotFound)</h1>
      {/* <img src={notfound} alt="NotFound"/> */}
    </div>
    </>
  );
}