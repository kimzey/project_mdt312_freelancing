import "./PostCompornent.css"
import { useParams ,useNavigate } from "react-router-dom";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';

export default function PostCompornent() {
    const navigate = useNavigate();
    const param = useParams()
  return (<>
        <div className="post">


            <div className="post_container">

                <div className="box" id="title">
                    <h1>{JSON.stringify(param)}</h1>
                </div>

                <div id="write_box" className="box">
                    <div className="title_box">
                        <img src={`http://localhost:5050/img_user/${"avatar.png"}`} id="profile_img" ></img>
                        <h1>Name</h1>
                    </div>
                    <from id="write">
                        <ReactQuill them="snow"  
                            placeholder="เขียนรายละเอียดบทความ"
                            style={{border: '1px solid #6666'}}/>
                            <div className="btn_write_box">
                                <input type="file" id="post_img" name="post_img" accept="image/*" className="btn btn_img"  />
                                <input type="submit" value="submit" className="btn btn_submit"></input>
                            </div>
                    </from>

                </div>

                <div id="post_box" className="box" >
                    <div className="title_box">
                        <img src={`http://localhost:5050/img_user/${"avatar.png"}`} id="profile_img" ></img>
                        <h1>Name</h1>
                    </div>
                    <div className="content">
                        <img></img>
                        <p>loremaskasdkl;asdkl;adskl;asdkl;asdl;kadskl;adskl;asdkl;dsa;lkas;ldkl;askl;</p>
                    </div>
                </div>

            </div>

        </div>
  </>)
}