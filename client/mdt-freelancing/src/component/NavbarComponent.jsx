import "./NavbarComponent.css";
import { useEffect } from "react";

export default function Navbar() {

    const add_show = ()=>{
        document.body.classList.toggle("show");
    }

  return (
    <nav>
        <div class="menu">
            <div class="list">
                <a href="#Home">Home</a>
                <a href="#Profile">Profile</a>
                <a href="#About">About</a>
                <a href="#Login">Login</a>
            </div>
            <a href="#" id="btn-menu" onClick={add_show}>=</a>
        </div>
    </nav>
  );
}
