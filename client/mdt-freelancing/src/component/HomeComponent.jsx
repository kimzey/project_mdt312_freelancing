import "./HomeComponent.css"
import logo_img from "../assets/logo.png"



export default function Home() {
  return (
    <div className="Home">
      <div className="Firstcontainer">
        <h1 id="text1">
          <br />
          ค้นหางานที่ใช่สำหรับคุณ</h1>
     <br/>  <div id ="logocontainer"> <img src={logo_img} id="logo_webb" alt="logoweb"></img> </div>
      </div>

      <div className="Secondcontainer">
        <p id="text2">
          งานที่แนะนำ
        </p>

        <div className ="squarecontainer"> 
        <p className="square">   </p>
        <p className="square">   </p>
        <p className="square">   </p>
        </div>


      </div>
    </div>
  );
}