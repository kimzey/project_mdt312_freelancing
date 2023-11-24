import "./AboutComponent.css";
import logo_img from "../assets/logo.png";
import Navbar from "./NavbarComponent";

export default function About() {
  return (
    <>
      <Navbar></Navbar>
      <div className="Aboutcontainer">
        <div className="Detailsabout">
          <img src={logo_img} id="logo"></img>
          <h1 id="head"> MDT-Freelance </h1>
          <p id="text1">
            ที่นี่ เราไม่แค่ให้บริการอิสระ
            แต่เป็นพันธมิตรที่ทำให้ความฝันและโอกาสของคุณเป็นจริง ด้วยทีมงาน
            Freelancer ที่มีความคุ้นเคยกับความหลากหลายของโปรเจ็ค ทุกๆ
            ที่คุณมุ่งหวัง เราจะก้าวข้ามเส้นขอบ
            เพื่อเสมอมองเป็นรูปภาพที่ไม่เหมือนใคร.
            เราเชื่อว่าความเป็นอิสระคือพลังที่ทำให้ไอเดียก้าวหน้า
            และเราพร้อมที่จะเป็นส่วนหนึ่งในการเปลี่ยนแปลงวิวัฒนาการของคุณ!
            คำโปรยนี้สามารถปรับแต่งให้เข้ากับเอกลักษณ์และคุณสมบัติที่ทำให้บริษัท
            Freelance ของคุณโดดเด่น.
          </p>
        </div>
      </div>
    </>
  );
}
