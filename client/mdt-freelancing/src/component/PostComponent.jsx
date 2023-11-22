import "./PostComponent.css"
import { useParams ,useNavigate } from "react-router-dom";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import Navbar from "./NavbarComponent";
export default function PostComponent() {
    const navigate = useNavigate();
    const param = useParams()

    const onsubmmitx = () =>{

    }
  return (<>
        <Navbar></Navbar>
        <div className="post">


            <div className="post_container">

                <div className="box" id="title">
                    <h1>topic : {JSON.stringify(param.tag)}</h1>
                </div>

                <div id="write_box" className="box">
                    <div className="title_box">
                        <img src={`http://localhost:5050/img_user/${"avatar.png"}`} id="profile_img" ></img>
                        <h1>Name</h1>
                    </div>
                    
                    <form id="write" >
                        <ReactQuill them="snow"  
                            placeholder="เขียนรายละเอียดบทความ"
                            style={{border: '1px solid #6666'}}/>
                            <div className="btn_write_box">
                                <input type="file" id="post_img" name="post_img" accept="image/*" className="btn btn_img"  />
                                <input type="submit" value="submit" className="btn btn_submit"></input>
                            </div>
                    </form>

                </div>

                <div id="post_box" className="box" >
                    <div className="title_box">
                        <img src={`http://localhost:5050/img_user/${"avatar.png"}`} id="profile_img" ></img>
                        <h1>Name</h1>
                    </div>
                    <div className="content">
                        <img src={`http://localhost:5050/img_user/${"avatar.png"}`} id="contnet_img" ></img>
                        <p >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec magna vitae magna laoreet fermentum. Nam vel scelerisque diam, vitae commodo neque. Curabitur id efficitur justo. Donec sed sapien ornare, tincidunt risus hendrerit, euismod urna. Sed porttitor pellentesque tincidunt. Duis sit amet iaculis nibh. Nulla vel mauris eros. Sed hendrerit ligula a mauris volutpat iaculis. Curabitur leo lorem, maximus eu tortor a, fermentum congue libero. Nullam felis augue, finibus et est ut, porttitor vulputate risus. Fusce dignissim nunc in tincidunt tristique. Vestibulum tortor elit, porttitor eget imperdiet a, efficitur nec tortor. Morbi ullamcorper ante sed nunc hendrerit sagittis. Vestibulum in commodo risus. Quisque non lorem dui.</p>
                    </div>
                </div>

            </div>

        </div>
  </>)
}