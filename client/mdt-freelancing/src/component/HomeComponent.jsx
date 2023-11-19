import "./HomeComponent.css"
import Navbar from "./NavbarComponent"


export default function Home() {
  return (
    <div className="Home">
      <div className="Firstcontainer">
        <h1 className="text1">
          <br />
          ค้นหางานที่ใช่สำหรับคุณ
        </h1>
        <img src=""></img>
      </div>

      <div className="Secondcontainer">
        <p className="text2">
          งานที่แนะนำ
        </p>

        <p className="rectangle"></p>

      </div>
    </div>
  );
}